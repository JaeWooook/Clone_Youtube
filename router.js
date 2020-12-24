import express from "express";

export const userRouter = express.Router(); // 이것을 내보내는것이다.

userRouter.get("/", (req, res) => res.send("user index"));
userRouter.get("/edit", (req, res) => res.send("user edit"));
userRouter.get("/password", (req, res) => res.send("user password"));
