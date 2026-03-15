import express from "express";
import {
  approveFaculty,
  makeHOD,
  transferSuperAdmin
} from "../controllers/faculty/facultyController.js";

const facultyRouter = express.Router();

facultyRouter.post("/approve", approveFaculty);
facultyRouter.post("/make-hod", makeHOD);
facultyRouter.post("/transfer-super-admin", transferSuperAdmin);

export default facultyRouter;