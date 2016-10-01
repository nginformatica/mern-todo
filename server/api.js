import express from 'express';
import * as tasksApi from './routes/task';
import * as usersApi from './routes/user';
import * as authApi from './routes/auth';

export function getRoutes() {
    const router = new express.Router();
    router.use('/tasks/', tasksApi.getRoutes());
    router.use('/users/', usersApi.getRoutes());
    router.use('/auth/', authApi.getRoutes());

    return router;
}

