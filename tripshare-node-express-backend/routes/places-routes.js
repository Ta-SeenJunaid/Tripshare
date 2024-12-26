const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("GET Request Working");
  res.json({ message: "Hello World!!!!!!!!!" });
});

module.exports = router;
