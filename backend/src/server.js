import express from "express"; // const express = require("express"); the same
import notesRoutes from "../src/Routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json()); //this middleware will parse JSON bodies(req.body)
app.use(rateLimiter);

// app.use((req, res, next) => {
//   console.log(`req methode is: ${req.method} & req URL is: ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});

//req when you want to read data coming from the client(react app/frontend)
//res when you want to send something back to the client
