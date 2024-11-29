import { Router } from 'express';
import tasksController from '../controllers/tasks.controller.js';
import { authenticateToken } from '../middlewares/authenticate.middleware.js'; 


const router = Router();

router
    .route('/')
    .get(authenticateToken, tasksController.getTasks)
    .post(authenticateToken, tasksController.createTask);

/*
router
    .route('/:id')
    .get(authenticateToken, usersController.getUser)
    .put(authenticateToken, usersController.updateUser)
    .patch(authenticateToken, usersController.activateInactivate)
    .delete(authenticateToken, usersController.deleteUser);
*/
export default router; 
