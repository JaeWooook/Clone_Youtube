// import "core-js";
// const express = require("express");
import express from "express";
const app = express();

const PORT = 4000;
//This change call back function
const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
};
const handleHome = (req, res) => {
  res.send("Hello from Home");
};

const handleProfile = (req, res) => {
  res.send("You are on my profile");
};

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
