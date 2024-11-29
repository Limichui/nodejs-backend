import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
    process.env.DB_DATABASE, //db name
    process.env.DB_USER , //username
    process.env.DB_PASSWORD, //password
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT, // or 'mysql' or 'sqlite'
        logging: console.log,

        dialectOptions: { //Activar solo para producción, para local comentar
            ssl: {
                require:true,
                rejecUnauthorized: false,
            }
        }
    }
);

export default sequelize

