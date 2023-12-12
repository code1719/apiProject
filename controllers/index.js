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

// Get single student
const getSingleStudent = async (req, res) => {
  try {
    const userId = new objectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("students")
      .find({_id: userId});
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//create student
const createStudent = async (req, res) => {
  try {
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      currentCollege: req.body.currentCollege,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("students")
      .insertOne(student);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "The person that created this must have fudged up some code. Please try again"
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all students
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
