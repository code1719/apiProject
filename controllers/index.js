const mongodb = require("../db/connect");
// const ObjectId = require("mongoose").objectId;
const { ObjectId } = require("mongodb");

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
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("students")
      .findOne({ _id: userId });

    if (!result) {
      res.status(404).json({ message: "student not found" });
      return;
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }

  //   result.toArray().then((lists) => {
  //     res.setHeader("Content-Type", "application/json");
  //     res.status(500).json(lists[0]);
  //   });
  // } catch (error) {
  //   res.status(500).json(error);
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
          response.error ||
            "The person that created this must have fudged up some code. Please try again"
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

// Update One Student
const updateStudent = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
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
      .replaceOne({ _id: userId }, student);
    if (response.acknowledged) {
      res.status(204).json(response);
      console.log(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some Squirrels Broke while updatiung the student"
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("students")
      .deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.acknowledged) {
      res.status(200).send(response);
      console.log(response);
    } else {
      res
        .status(500)
        .json(
          response.error ||
            "Some squirrel quit its job and lost the initiative to delete the student"
        );
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(response);
  }
};

module.exports = {
  awesomeFunction,
  tooeleTech,
  otherRoute,
  getAllStudents,
  createStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
