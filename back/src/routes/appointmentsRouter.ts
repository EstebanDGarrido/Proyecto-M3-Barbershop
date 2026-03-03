import { Router } from "express";
import { cancel, getAllAppointments, getAppointmentById, schedule } from "../controllers/appointmentsController";
import validateAppointment from "../middlewares/validateAppointmentMiddleware";

const appointmentsRouter: Router = Router();

appointmentsRouter.get("/", getAllAppointments);
appointmentsRouter.get("/:turnId", getAppointmentById);
appointmentsRouter.post("/schedule",
    validateAppointment, schedule);
appointmentsRouter.put("/cancel/:turnId", cancel);

export default appointmentsRouter;