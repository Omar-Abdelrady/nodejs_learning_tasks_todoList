import { Router } from "express";
import { Route } from "../types/routes.type";
import TodosController from "../controllers/todosController.controller";
import {
  TodoCreateValidationRules,
  TodoUpdateValidationRules,
} from "../requests/validations/todo.validation";
import { checkValidations } from "../middlewares/validation.middleware";

class TodoRoute implements Route {
  public path = "/api/v1/todos";
  public router = Router();
  public todoController = new TodosController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(this.path, this.todoController.getTodos);
    this.router.post(
      `${this.path}/create`,
      TodoCreateValidationRules,
      checkValidations,
      this.todoController.createTodo
    );
    this.router.put(
      `${this.path}/:id`,
      TodoUpdateValidationRules,
      checkValidations,
      this.todoController.updateTodo
    );
    this.router.delete(`${this.path}/:id`, this.todoController.deleteTodo);
  }
}

export default TodoRoute;
