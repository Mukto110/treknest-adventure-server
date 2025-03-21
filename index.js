require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;
const app = express();

// Middleware
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("✅ Successfully connected to MongoDB!");

    const touristSpotCollection = client
      .db("treknest")
      .collection("tourist_spots");

    // Get all tourist spots
    app.get("/api/tourist-spots", async (req, res) => {
      try {
        const touristSpots = await touristSpotCollection.find().toArray();
        res.status(200).json(touristSpots);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch tourist spots" });
      }
    });

    // Get a single tourist spot by ID
    app.get("/api/tourist-spots/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const spot = await touristSpotCollection.findOne({
          _id: new ObjectId(id),
        });
        if (!spot) {
          return res.status(404).json({ message: "Tourist spot not found" });
        }
        res.status(200).json(spot);
      } catch (error) {
        console.error("Error fetching tourist spot by ID:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    // Insert a new tourist spot
    app.post("/api/tourist-spots", async (req, res) => {
      const spotData = req.body;
      const result = await touristSpotCollection.insertOne(spotData);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from TrekNest server");
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
