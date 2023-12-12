const myController = require("../controllers");
const routes = require("express").Router();

routes.get("/", myController.awesomeFunction);

routes.get("/ttech", myController.tooeleTech);

routes.get("/other", myController.otherRoute);

routes.get("/Students", myController.getAllStudents);

module.exports = routes;
