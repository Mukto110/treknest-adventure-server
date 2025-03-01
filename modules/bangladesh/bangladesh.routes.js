import express from "express";
import { addTouristSpot, getAllTouristSpots } from "./bangladesh.controller.js";

const router = express.Router();

router.get("/", getAllTouristSpots);
router.post("/", addTouristSpot);

export const bangladeshRoute = router;
