import { DataTypes } from "sequelize"
import sequelize from "../database/database.js"
import { Status } from "../constants/index.js"
import { Task } from "../models/tasks.js"
import logger from "../logs/logger.js"
import { encryptText } from "../common/bcrypt.js"

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

        validate: {
            notNull:{
                msg: 'Username cannot be null',
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
            notNull:{
                msg: 'Password cannot be null',
            },
        },
    },
     status: {
        type: DataTypes.STRING,
        defaultValue: Status.ACTIVE,

        validate: {
            isIn: {
                args: [[Status.ACTIVE, Status.INACTIVE]],
                msg: 'Status must be either active or inactive',
            }
        }
     }
});

/* Una forma de relacionar tablas */
User.hasMany(Task)
Task.belongsTo(User)


/*Otra forma de relacionar tablas 
User.hasMany(Task, {
    foreignKey: 'user_id',
    sourceKey: 'id'
})

Task.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id'
})
    */

User.beforeCreate(async (user) => {
    try {
        user.password = await encryptText(user.password);

    } catch (error){
        logger.error(error.message);
        throw new Error('Error al crear la contraseña');
    }
});

User.beforeUpdate(async (user) => {
    try {
        user.password = await encryptText(user.password);

    } catch (error){
        logger.error(error.message);
        throw new Error('Error al comparar la contraseña');
    }
});