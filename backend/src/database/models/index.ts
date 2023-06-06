import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";

import * as configJson from "../config/config.json";
import Todo from "./todo.model";
const config: any = configJson[env as keyof typeof configJson];
const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export const initModals = async (sequelizeInstance: Sequelize) => {
  try {
    console.info("Initializing models...");
    await Todo.initModel(sequelizeInstance);
  } catch (err: any) {
    console.error(err.message);
  }
};

export { Sequelize, sequelize };
