import { beforeAll, describe, expect, it, jest } from "@jest/globals";
import TodosController from "../../controllers/todosController.controller";
import App from "../../app";
import { mockNext, mockRequest, mockResponse } from "../util/interceptor";
const todosController = new TodosController();
describe("test todosController ", () => {
  beforeAll(async () => {
    await new App([]);
  });
  describe("test getTodos method in todosController", () => {
    it("should return a list of todos", async () => {
      const res = mockResponse();
      const req = mockRequest();
      const next = mockNext();
      await todosController.getTodos(req, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expect.arrayContaining([
          expect.objectContaining({
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            title: expect.any(String),
            description: expect.any(String),
            id: expect.any(Number),
          }),
        ]),
      });
    });
  });
  describe("test createTodo method in todosController", () => {
    it("should return a todo will create", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const title: string = "test title from test cases";
      const description: string = "test description";
      req.body.todos = [
        {
          title,
          description,
        },
      ];
      const next = mockNext();
      await todosController.createTodo(req, res, next);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.stringContaining(title),
            description: expect.stringContaining(description),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      });
    });
    it("should return a todo will create with No description", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const title: string = "test title from test cases";
      const description: string = "No description";
      req.body.todos = [
        {
          title,
        },
      ];
      const next = mockNext() as any;
      await todosController.createTodo(req, res, next);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.stringContaining(title),
            description: expect.stringContaining(description),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ]),
      });
    });
  });
  describe("test updateTodo method in todosController", () => {
    it("should return a todo will update", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const title: string = "editable title ";
      const description: string = "editable description";
      req.body.updatedTodo = {
        title,
        description,
      };
      req.params.id = 4;
      const next = mockNext();
      await todosController.updateTodo(req, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expect.objectContaining({
          id: expect.closeTo(4),
          title: expect.stringContaining(title),
          description: expect.stringContaining(description),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      });
    });
  });
  describe("test deleteTodo method in todosController", () => {
    it("should return a true", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext();

      // firstly I need to create a todo to delete it
      const title: string = "I will delete this todo";
      const description: string = "I will delete this todo";
      req.body.todos = [
        {
          title,
          description,
        },
      ];
      await todosController.createTodo(req, res, next);
      req.params.id = res.json.mock.lastCall[0].data[0].dataValues.id;
      await todosController.deleteTodo(req, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expect.stringMatching("todo deleted successfully"),
      });
    });

    it("should return a validation message", async () => {
      const req = mockRequest();
      const res = mockResponse();
      req.params.id = 100000000;
      const next = mockNext();
      await todosController.deleteTodo(req, res, next);
      expect(next).toHaveBeenCalledWith(new Error("Todo not found"));
    });
  });
});
