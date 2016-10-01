import express from 'express';
import { getRoutes as getTaskRoutes } from './routes/task';
import { getRoutes as getUserRoutes } from './routes/user';
import { getRoutes as getAuthRoutes } from './routes/auth';

export function getRoutes() {
    const router = new express.Router();

    router.use('/tasks/', tasksApi.getTaskRoutes());
    router.use('/users/', usersApi.getUserRoutes());
    router.use('/auth/', authApi.getAuthRoutes());

    return router;
}

