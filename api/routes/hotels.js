import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import { countByType, countbyCity, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create update delete get

router.post("/", verifyAdmin, createHotel);

router.put("/:id",verifyAdmin, updateHotel);

router.delete("/:id",verifyAdmin, deleteHotel);

router.get("/find/:id", getHotel);

router.get("/", getHotels);
router.get("/countbyCity", countbyCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);
    
export default router;