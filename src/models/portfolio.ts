import { DataTypes, Optional, ModelDefined, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../helpers/db";


class Portfolio extends Model<InferAttributes<Portfolio>, InferCreationAttributes<Portfolio>> {
    declare id: CreationOptional<number>;
    declare username: string;
}

Portfolio.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize,
        tableName: 'Portfolios'
    })

export default Portfolio