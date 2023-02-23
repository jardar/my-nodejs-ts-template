// import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express";
import { Todo } from "../models/todo";
const TODOS: Todo[] = [];

// export const createTodo = (req: Request,res: Response,next:NextFunction)=>{})
export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({
    message: "Created the todo.",
    data: newTodo,
  });
};

export const getToDos: RequestHandler = (req, res, next) => {
  res.json({
    message: "ok",
    data: TODOS,
  });
};

export const updateToDo: RequestHandler<{ id: string }> = (req, res, next) => {
  const toDoId = req.params.id.trim();

  const updateText = (req.body as { text: string }).text;
  const foundIdx = TODOS.findIndex((item) => item.id === toDoId);
  if (foundIdx < 0) {
    throw new Error("找不到代辦事項");
  }

  TODOS[foundIdx] = new Todo(TODOS[foundIdx].id, updateText);

  res.json({
    message: "已更新",
    data: TODOS[foundIdx],
  });
};

export const deleteToDo: RequestHandler<{ id: string }> = (req, res, next) => {
  const toDoId = req.params.id.trim();

  const foundIdx = TODOS.findIndex((item) => item.id === toDoId);
  if (foundIdx < 0) {
    throw new Error("找不到代辦事項");
  }

  const deleted = TODOS.splice(foundIdx, 1);

  res.json({
    message: "已刪除",
    data: deleted,
  });
};
