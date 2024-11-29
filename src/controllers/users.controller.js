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
}

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

async function getUserTasks(req, res) {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ['username'],
            include: [
                {
                    model: Task,
                    attributes: ['name', 'done'],
                },
            ],
        });
        if (!user){
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(user);
    } catch (error){
        logger.error('Error getUserTasks: ' + error);
        res.status(500).json({ message: 'Server error' });
    }
}

export default {
    getUsers,
    createUser,
    getUser,
    updateUser,
    activateInactivate,
    deleteUser,
    getUserTasks,
}