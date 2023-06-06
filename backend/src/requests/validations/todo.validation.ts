import { body, ValidationChain } from "express-validator";
export const TodoCreateValidationRules: ValidationChain[] = [
  body("todos").isArray().withMessage("todos must be an array"),
  body("todos.*.title").notEmpty().withMessage("Each todo must have a title"),
  body("todos.*.description")
    .notEmpty()
    .withMessage("Each todo must have a description"),
];

export const TodoUpdateValidationRules: ValidationChain[] = [
  body("updatedTodo").isObject().withMessage("todos must be an object"),
  body("updatedTodo.title").notEmpty().withMessage("title is required"),
  body("updatedTodo.description")
    .notEmpty()
    .withMessage("description is required"),
];
