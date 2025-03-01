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

export { addTouristSpot };
