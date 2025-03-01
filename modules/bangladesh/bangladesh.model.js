import { client } from "../../config/db.js";

const bangladeshCollection = client
  .db("treknest_adventure")
  .collection("bangladesh_tourist_spots");

export default bangladeshCollection;
