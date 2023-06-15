import { DataTypes, Model, Sequelize } from "sequelize";
class Todo extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initModel(sequelize: Sequelize): void {
    Todo.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            notNull: true,
            len: [1, 50],
          },
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Todo",
        tableName: "todoList",
      }
    );
  }
}

export default Todo;
