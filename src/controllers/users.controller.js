import { User } from '../models/users.js'
import { Task } from '../models/tasks.js'
import logger from '../logs/logger.js'
import { Status } from '../constants/index.js';

async function getUsers(req, res) {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'password', 'status'],
            order: [['id', 'DESC']],
            where: {
                status: Status.ACTIVE,
            }
        });
        res.json(users);
    } catch (error){
        logger.error('Error getUsers: ' + error);
        res.status(500).json({ message: 'Server error' });
    }
    //return res.send('Get Users')
}

async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.create({ username, password });
        res.json(user);
    } catch (error){
        logger.error('Error getUsers: ' + error);
        res.status(500).json({ message: 'Server error' });
    }
    //return res.send('Get Users')
}

export default {
    getUsers,
    createUser,
}