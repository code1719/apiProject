const express = require("express");
const router = express.Router();

const StudentController = require("../controllers/index");

router.get("/", StudentController.getAllStudents);
router.post("/", StudentController.createStudent);
router.get("/:id", StudentController.getSingleStudent);
router.put("/:id", StudentController.updateStudent);
router.delete("/:id", StudentController.deleteStudent);

// router.get("/students", StudentController.getAllStudents);
// router.get("/:id", StudentController.getSingleStudent);
// router.post("/students", StudentController.createStudent);

// // update & delete

// router.put("/:id", StudentController.updateStudent);
// router.delete("/students/:id"), StudentController.deleteStudent


module.exports = router;
