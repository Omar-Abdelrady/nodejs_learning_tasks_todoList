import { NextFunction, Request, Response } from "express";
import { TodosService } from "../services";
import { TodoType } from "../types/todo.type";
import { FindOptions } from "sequelize";
import { sendSuccess } from "../helpers/handleResponse.helper";
import { getPagingData } from "../helpers/helpersFunctions.helper";
class TodosController {
  public todoService = new TodosService();
  public getTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit: number = parseInt(req.query.limit as string) || 10;
      const offset: number = parseInt(req.query.offset as string) || 0;
      const page: number = parseInt(req.query.page as string) || 1;
      const pageStart: number = (page - 1) * limit;
      const result: TodoType[] = await this.todoService.findAndCountAll({
        limit,
        offset,
      });
      sendSuccess(res, getPagingData(result, page, limit));
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
      sendSuccess(res, result);
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
      const result: TodoType = await this.todoService.delete({
        where: { id: req.params.id },
      });
      sendSuccess(res, result);
    } catch (err: any) {
      next(err);
    }
  };
}

export default TodosController;
