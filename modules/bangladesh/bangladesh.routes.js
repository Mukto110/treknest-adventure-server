import express from "express";
import { addTouristSpot } from "./bangladesh.controller.js";

const router = express.Router();

router.post("/", addTouristSpot);

export const bangladeshRoute = router;
