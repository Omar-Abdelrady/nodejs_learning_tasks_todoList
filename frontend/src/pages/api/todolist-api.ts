import API from "@/pages/api/API";
import axios from "axios";
import { ResponseType } from "../../types/response.type";
class TodolistApi extends API {
  public async getTodolist(): Promise<any> {
    try {
      const resp: ResponseType = await axios.get(`${this.apiUrl}/api/v1/todos`);
      return resp.data;
    } catch (err) {
      console.error("[Auth API] Error: ", err);
      new Error("Internal server error");
    }
  }
}

export default TodolistApi;
