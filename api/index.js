import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

dotenv.config();

// Connect to MongoDB
const connect = async () => {
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
} catch (error) {
    throw new Error("Error connecting to MongoDB");
}
};

app.get('/', (req, res) =>{
    res.send('Hello World')
})

//middleware

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((error, req, res, next) => {
 const errorStatus = error.status || 500; 
    const errorMessage = error.message || "Something went wrong";
    return res.status(errorStatus).json({ 
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: error.stack,
     });
});

app.listen(8800, () => {
    connect();
  console.log("Backend server is running!");
});