const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const app = express();
const router = express.Router();

app.use(cors());

// Example endpoint to serve JSON data from projects.json
router.get("/projects", (req, res) => {
  const data = fs.readFileSync("projects.json");
  res.json(JSON.parse(data));
});

// Root test route
router.get("/", (req, res) => {
  res.json({ message: "Hello from Netlify Backend!" });
});

app.use("/.netlify/functions/api", router);

module.exports = app;
module.exports.handler = serverless(app);
