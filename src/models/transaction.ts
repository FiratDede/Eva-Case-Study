import { DataTypes, Optional, ModelDefined, Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from "sequelize";
import { sequelize } from "../helpers/db";
import Share from "./share";
import Portfolio from "./portfolio";

class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>> {
  declare id: CreationOptional<number>;
  declare type: string;
  declare quantity: number;
  declare price: number;
  declare shareId:  ForeignKey<Share['id']>;
  declare portfolioId:  ForeignKey<Portfolio['id']>;

}
Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM('BUY', 'SELL'),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
  sequelize,
  tableName: "Transactions"
})

export default Transaction