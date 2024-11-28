import app from './app.js';
import sequelize  from './database/database.js';
import 'dotenv/config';
import logger from './logs/logger.js';


async function main() {
    await sequelize.sync({ force: false });
    const port = process.env.PORT;
    app.listen(port);
    console.log('listening on port', port);
    logger.info(`Server started on port ${port}`);
    /*
    logger.error(`Server started on port ${port}`);
    logger.warn(`Server started on port ${port}`);
    logger.fatal(`Server stopped on port ${port}`);
    */
}

main();