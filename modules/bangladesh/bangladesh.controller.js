import bangladeshCollection from "./bangladesh.model.js";

const addTouristSpot = async (req, res) => {
  try {
    console.log(req.body);
    const result = await bangladeshCollection.insertOne(req.body);
    res.status(201).json({
      success: true,
      message: "Tourist spot added",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding tourist spot",
      error: error,
    });
  }
};

const getAllTouristSpots = async (req, res) => {
  try {
    const result = await bangladeshCollection.find().toArray();
    res.status(200).json({
      success: true,
      message: "Found all tourist spot data",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch spots",
      error: error,
    });
  }
};

export { addTouristSpot, getAllTouristSpots };
