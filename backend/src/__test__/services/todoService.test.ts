import { beforeAll, describe, expect, it } from "@jest/globals";
import { TodosService } from "../../services";
import App from "../../app";
import { FindOptions } from "sequelize";
import { TodoType } from "../../types/todo.type";

const todoService = new TodosService();
describe("Test the all methods of todoService", () => {
  beforeAll(async () => {
    await new App([]);
  });

  describe("findAll method", () => {
    it("should return an array", async () => {
      const todos = await todoService.findAll({});
      expect(todos).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            description: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ])
      );
    });
  });
  describe("findAndCountAll method", () => {
    it("should return an object", async () => {
      const todos = await todoService.findAndCountAll({});
      expect(todos).toEqual(
        expect.objectContaining({
          count: expect.any(Number),
          rows: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              title: expect.any(String),
              description: expect.any(String),
              createdAt: expect.any(Date),
              updatedAt: expect.any(Date),
            }),
          ]),
        })
      );
    });
    it("should return an object with limit", async () => {
      const todos = await todoService.findAndCountAll({ limit: 2 });
      expect(todos).toEqual(
        expect.objectContaining({
          count: expect.any(Number),
          rows: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              title: expect.any(String),
              description: expect.any(String),
              createdAt: expect.any(Date),
              updatedAt: expect.any(Date),
            }),
          ]),
        })
      );
    });
    it("should return an object with offset", async () => {
      const todos = await todoService.findAndCountAll({ offset: 2 });
      expect(todos).toEqual(
        expect.objectContaining({
          count: expect.any(Number),
          rows: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              title: expect.any(String),
              description: expect.any(String),
              createdAt: expect.any(Date),
              updatedAt: expect.any(Date),
            }),
          ]),
        })
      );
    });
    it("should return an object with limit and offset", async () => {
      const todos = await todoService.findAndCountAll({ limit: 2, offset: 2 });
      expect(todos).toEqual(
        expect.objectContaining({
          count: expect.any(Number),
          rows: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              title: expect.any(String),
              description: expect.any(String),
              createdAt: expect.any(Date),
              updatedAt: expect.any(Date),
            }),
          ]),
        })
      );
    });
  });
  describe("find method", () => {
    it("should return an object", async () => {
      const query: FindOptions = { where: { id: 5 } };
      const todo = await todoService.find(query);
      expect(todo).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          description: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        })
      );
    });
    it("should return null", async () => {
      const query: FindOptions = { where: { id: 0 } };
      const todo = await todoService.find(query);
      expect(todo).toBeNull();
    });
  });
  describe("create method", () => {
    // multiple creation
    it("should return an array of objects with the same properties", async () => {
      const todos: TodoType[] = [
        {
          title: "first todo title test",
          description: "first todo description test",
        },
        {
          title: "second todo title test",
          description: "second todo description test",
        },
      ];
      const todo: TodoType[] = await todoService.create(todos);
      expect(todo).toEqual([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.stringMatching(todos[0].title),
          description: expect.stringMatching(todos[0].description),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.stringMatching(todos[1].title),
          description: expect.stringMatching(todos[1].description),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ]);
    });
    // single creation
    it("should return an object with the same properties", async () => {
      const todos: TodoType[] = [
        {
          title: "first todo title test",
          description: "first todo description test",
        },
      ];
      const todo: TodoType[] = await todoService.create(todos);
      expect(todo).toEqual([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.stringMatching(todos[0].title),
          description: expect.stringMatching(todos[0].description),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ]);
    });
    // empty array
    it("should return an empty array", async () => {
      const todos: TodoType[] = [];
      const todo: TodoType[] = await todoService.create(todos);
      expect(todo).toEqual([]);
    });
  });
  describe("update method", () => {
    it("should return an object with the same properties", async () => {
      const updatedTodo: TodoType = {
        title: "updated title",
        description: "updated description",
      };
      const query: FindOptions = { ...updatedTodo, where: { id: 4 } };
      const todo = await todoService.update(query);
      expect(todo).toEqual(
        expect.objectContaining({
          id: expect.closeTo(4),
          title: expect.stringMatching("updated title"),
          description: expect.stringMatching("updated description"),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        })
      );
    });
  });
  describe("delete method", () => {
    it("should return an object with the same properties", async () => {
      // firstly  we have to create a todo to delete it!
      const todos: TodoType[] = [
        {
          title: "first todo title test",
          description: "first todo description test",
        },
      ];
      const newTodo: TodoType[] = await todoService.create(todos);
      const query: FindOptions = { where: { id: newTodo[0].id } };
      const todo = await todoService.delete(query);
      expect(todo).toEqual(1);
    });
  });
});
