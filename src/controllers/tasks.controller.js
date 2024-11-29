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
        //console.log('userId', userId);
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

async function getTask(req, res) {
    try {
        const task = await Task.findByPk(req.params.id, {
            attributes: ['name', 'done']
        });
        if (!task){
            return res.status(404).json({ message: 'Task not found' })
        }
        res.json(task);
    } catch (error){
        logger.error('Error getTask: ' + error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function updateTask(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
        if (!name)
            return res
                .status(400)
                .json({ message: 'Name are required' });
        
                const task = await Task.update(
                    {
                        name,
                    },
                    {
                        where: {
                            id
                        }
                    }
                );
        res.json(task);
    } catch (error){
        logger.error('Error updateTask: ' + error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function taskDoneTrueFalse(req, res) {
    const { id } = req.params;
    const { done } = req.body;
    try {
        if (!done){
            return res.status(400).json({ message: 'The value of done are required' });
        } 
        
        if (done != 'true' && done != 'false' ){
            return res.status(400).json({ message: 'The done value is must be true or false' });
        } 

        const task = await Task.findByPk(id);
        if (!task){
            return res.status(404).json({ message: 'Task not found' });
        }
        console.log('Valores Done:', done, task.done);
        if (task.done === (done === 'true')){
            return res
                .status(400)
                .json({ message: 'The value of done is the same as the curret one' });
        }
        
        task.done = done;
        await task.save();
        res.json(task);

    } catch (error){
        logger.error('Error taskDoneTrueFalse: ' + error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function deleteTask(req, res) {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        if(!task){
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.destroy();
        res.json({ message: 'Task deleted successfully' });
    } catch (error){
        logger.error('Error getTask: ' + error);
        res.status(500).json({ message: 'Server error' });
    }
}

export default {
    getTasks,
    createTask,
    getTask,
    updateTask,
    taskDoneTrueFalse,
    deleteTask,
}