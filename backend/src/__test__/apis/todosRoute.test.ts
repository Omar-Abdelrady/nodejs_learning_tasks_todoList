import { beforeAll, describe, expect, it } from "@jest/globals";
import App from "../../app";
import { TodoRoutes } from "../../routes";
import request from "supertest";

describe("test apis for todo", () => {
  let app: any;
  const todoRoute = new TodoRoutes();
  beforeAll(async () => {
    app = await new App([todoRoute]);
  });

  // get all todos in the database by api
  it("get all todos", async () => {
    const response = await request(app.getServer()).get(`${todoRoute.path}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          id: expect.any(Number),
        }),
      ]),
    });
  });
  // create a new todo by api
  it("create a new todo", async () => {
    const response = await request(app.getServer())
      .post(`${todoRoute.path}/create`)
      .send({
        todos: [{ title: "test todo", description: "test todo description" }],
      });
    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
      success: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          title: "test todo",
          description: "test todo description",
          id: expect.any(Number),
        }),
      ]),
    });
  });

  // update a todo by api
  it("update a todo", async () => {
    const response = await request(app.getServer())
      .put(`${todoRoute.path}/3`)
      .send({
        updatedTodo: {
          title: "test todo",
          description: "test todo description",
        },
      });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining({
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        title: "test todo",
        description: "test todo description",
        id: expect.any(Number),
      }),
    });
  });
  // delete a todo by api
  it("delete a todo", async () => {
    // firstly we need to create a todo so that we can delete it
    const responseToCreateTodo = await request(app.getServer())
      .post(`${todoRoute.path}/create`)
      .send({
        todos: [{ title: "test todo", description: "test todo description" }],
      });
    const response = await request(app.getServer()).delete(
      `${todoRoute.path + "/" + responseToCreateTodo.body.data[0].id}`
    );
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      success: true,
      data: "todo deleted successfully",
    });
  });
});
