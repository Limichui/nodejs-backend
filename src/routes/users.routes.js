import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import { authenticateToken } from '../middlewares/authenticate.middleware.js'; 


const router = Router();

router.route('/').get(usersController.getUsers).post(usersController.createUser);

router
    .route('/:id')
    .get(authenticateToken, usersController.getUser)
    .put(authenticateToken, usersController.updateUser)
    .patch(authenticateToken, usersController.activateInactivate)
    .delete(authenticateToken, usersController.deleteUser);

router.route('/:id/tasks').get(authenticateToken, usersController.getUserTasks);

export default router; 
