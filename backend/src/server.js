import express from "express"; // const express = require("express"); the same
import notesRoutes from "../src/Routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json()); //this middleware will parse JSON bodies(req.body)
app.use(rateLimiter);

// app.use((req, res, next) => {
//   console.log(`req methode is: ${req.method} & req URL is: ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/", "dist", "index.html"));
  }); //If someone asks for any page we don’t know about, send them this file
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});

//req when you want to read data coming from the client(react app/frontend)
//res when you want to send something back to the client
