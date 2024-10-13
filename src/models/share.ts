import { DataTypes, Optional, ModelDefined, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../helpers/db";

class Share extends Model<InferAttributes<Share>, InferCreationAttributes<Share>> {
    declare id: CreationOptional<number>;
    declare symbol: string;
    declare price: number;
}

Share.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        symbol: {
            type: DataTypes.STRING(3),
            allowNull: false,
            unique: true,
            validate: {
                isUppercase: true,
                len: [3, 3]
            }
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'Shares'
    })


export default Share