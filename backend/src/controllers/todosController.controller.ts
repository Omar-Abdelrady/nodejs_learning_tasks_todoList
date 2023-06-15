import { NextFunction, Request, Response } from "express";
import { TodosService } from "../services";
import { TodoType } from "../types/todo.type";
import { FindOptions } from "sequelize";
import { sendSuccess } from "../helpers/handleResponse.helper";
class TodosController {
  public todoService = new TodosService();
  public getTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: TodoType[] = await this.todoService.findAll({});
      return sendSuccess(res, result);
    } catch (err: any) {
      next(err);
    }
  };

  //   create todo request
  public createTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { todos } = req.body;
      const result: TodoType[] = await this.todoService.create(todos);
      sendSuccess(res, result, 201);
    } catch (err: any) {
      next(err);
    }
  };
  public updateTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { updatedTodo } = req.body;
      const query: FindOptions = {
        ...updatedTodo,
        where: {
          id: req.params.id,
        },
      };
      const result: TodoType = await this.todoService.update(query);
      sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  };
  //   delete todo request
  public deleteTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result: number = await this.todoService.delete({
        where: { id: req.params.id },
      });
      console.log(result);
      if (result === 1) sendSuccess(res, "todo deleted successfully");
      else throw new Error("Todo not found");
    } catch (err: any) {
      next(err);
    }
  };
}

export default TodosController;
