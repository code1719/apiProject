const myController = require("../controllers");
const routes = require("express").Router();

routes.get("/", myController.awesomeFunction);

routes.get("/ttech", myController.tooeleTech);

routes.get("/other", myController.otherRoute);

routes.get("/students", myController.getAllStudents);
routes.post("/students/:id", myController.updateStudent)+
routes.delete("/students/:id", myController.deleteStudent);

routes.delete("/students/:id", myController.deleteStudent);

routes.use("/students", require("./students"));

module.exports = routes;
