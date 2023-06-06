import { FindOptions } from "sequelize";
import { TodoType } from "../types/todo.type";
import Todo from "../database/models/todo.model";
class TodosService {
  public async findAll(query: FindOptions): Promise<TodoType[]> {
    try {
      const todos: TodoType[] = await Todo.findAll(query);
      return todos;
    } catch (err: any) {
      throw new Error(err.message); // Throw an instance of Error instead of a string
    }
  }

  public async findAndCountAll(query: FindOptions): Promise<TodoType[]> {
    try {
      const todos: any = await Todo.findAndCountAll(query);
      return todos;
    } catch (err: any) {
      throw new Error(err.message); // Throw an instance of Error instead of a string
    }
  }

  public async find(query: FindOptions): Promise<TodoType> {
    try {
      const todo: Todo | null = await Todo.findOne(query);
      if (todo) return todo;
      else throw new Error("Todo not found");
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  public async create(todo: TodoType[]): Promise<TodoType[]> {
    try {
      const newTodo: TodoType[] = await Todo.bulkCreate(todo);
      return newTodo;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async update(query: FindOptions): Promise<TodoType> {
    try {
      const todo: Todo | null = await Todo.findOne(query);
      if (todo) {
        await todo.update({
          ...query,
        });
        return todo;
      } else throw new Error("Todo not found");
    } catch (err: any) {
      console.log(err.message);
      throw new Error(err.message);
    }
  }

  public async delete(query: FindOptions): Promise<any> {
    try {
      await Todo.destroy(query);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
export default TodosService;
