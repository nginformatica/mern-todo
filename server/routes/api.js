import express from 'express';
import taskRoutes from './task-routes';
import userRoutes from './user-routes';

const router = new express.Router();

router.use('/tasks/', taskRoutes);
router.use('/users/', userRoutes);

export default router;
