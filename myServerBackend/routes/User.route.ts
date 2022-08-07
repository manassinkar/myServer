import { Router } from "express";
import userController from "../controller/User.controller";

const userRouter = Router();

userRouter.get("/getUserByEmail", userController.getUserByEmail);
userRouter.get("/getUserById", userController.getUserById);
userRouter.get("/getAllUsers", userController.getAllUsers);

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

export default userRouter;