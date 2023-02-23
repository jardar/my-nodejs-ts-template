// const express = require('express')
// const Router =  express.Router
import { Router } from "express";
import {
  createTodo,
  getToDos,
  updateToDo,
  deleteToDo,
} from "../controllers/todos";
const router = Router();

router.post("/", createTodo);
router.get("/", getToDos);

router.patch("/:id", updateToDo);

router.delete("/:id", deleteToDo);

export default router;
