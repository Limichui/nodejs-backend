import { Router } from 'express';
import tasksController from '../controllers/tasks.controller.js';
import { authenticateToken } from '../middlewares/authenticate.middleware.js'; 


const router = Router();

router
    .route('/')
    .get(authenticateToken, tasksController.getTasks)
    .post(authenticateToken, tasksController.createTask);


router
    .route('/:id')
    .get(authenticateToken, tasksController.getTask)
    .put(authenticateToken, tasksController.updateTask)
    .patch(authenticateToken, tasksController.taskDoneTrueFalse)
    .delete(authenticateToken, tasksController.deleteTask);
export default router; 
