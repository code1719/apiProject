const mongodb = require("../db/connect");
const objectId = require("mongoose").objectId;

const awesomeFunction = (req, res) => {
  res.send("Hello World!");
};

const tooeleTech = (req, res) => {
  res.send("Tooele Tech is Awesome!");
};

const otherRoute = (req, res) => {
  res.send("This is my additional route");
};

const getAllStudents = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("students").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { awesomeFunction, tooeleTech, otherRoute, getAllStudents };