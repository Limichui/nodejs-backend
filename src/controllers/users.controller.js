import { User } from '../models/users.js'
import { Task } from '../models/tasks.js'

async function getUsers(req, res) {
    return res.send('Get Users')
}

export default {
    getUsers,
}