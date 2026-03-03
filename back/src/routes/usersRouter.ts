import { Router } from "express";
import { getAllUsers, getUserById, login, register } from "../controllers/usersController";
import validateUser from "../middlewares/validateUserMiddleware";
import validateCredential from "../middlewares/validateCredentialsMiddleware";

const usersRouter: Router = Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("/register", validateUser, register);
usersRouter.post("/login", validateCredential, login);

export default usersRouter;