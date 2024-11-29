import { User } from '../models/users.js'
import { Task } from '../models/tasks.js'
import logger from '../logs/logger.js'
import jwt from 'jsonwebtoken';
import 'dotenv/config';

async function getTasks(req, res) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.sendStatus(401);
        const secret = jwt.verify(token, process.env.JWT_SECRET); 
        const userId = secret.userId;
        console.log('userId', userId);
        const tasks = await Task.findAll({
            attributes: ['id', 'name', 'done'],
            order: [['id', 'DESC']],
            where: {
                userId,
            }
        });
        res.json(tasks);
    } catch (error){
        logger.error('Error getTasks: ' + error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function createTask(req, res) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.sendStatus(401);
        const secret = jwt.verify(token, process.env.JWT_SECRET); 
        const userId = secret.userId;

        const { name } = req.body;
        const task = await  Task.create({ 
            name,
            userId,
        });
        res.json(task);
    } catch (error){
        logger.error('Error createTask: ' + error);
        res.status(500).json({ message: 'Server error' });
    }
}
/*
async function getUser(req, res) {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['username', 'status']
        });
        if (!user){
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(user);
    } catch (error){
        logger.error('Error getUser: ' + error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function updateUser(req, res) {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        if (!username || !password)
            return res
                .status(400)
                .json({ message: 'Username or password are required' });
        
                const user = await User.update(
                    {
                        username,
                        password,
                    },
                    {
                        where: {
                            id
                        }
                    }
                );
        res.json(user);
    } catch (error){
        logger.error('Error updateUser: ' + error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function activateInactivate(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    try {
        if (!status){
            return res.status(400).json({ message: 'Status are required' });
        } 
        
        const user = await User.findByPk(id);
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.status === status){
            return res
                .status(400)
                .json({ message: 'Status is the same as the curret one' });
        }
        
        user.status = status;
        await user.save();
        res.json(user);

    } catch (error){
        logger.error('Error activeInactive: ' + error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error){
        logger.error('Error getUser: ' + error);
        res.status(500).json({ message: 'Server error' });
    }
}
*/
export default {
    getTasks,
    createTask,
   /* getUser,
    updateUser,
    activateInactivate,
    deleteUser,
    */
}