import express from 'express';
import * as tasksApi from './task-routes';
import * as usersApi from './user-routes';
import * as authApi from './auth-routes';

export function getRoutes() {
    const router = new express.Router();

    router.use('/tasks/', tasksApi.getRoutes());
    router.use('/users/', usersApi.getRoutes());
    router.use('/auth/', authApi.getRoutes());

    return router;
}

