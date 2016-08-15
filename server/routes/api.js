import express from 'express';
import * as taskRoutes from './task-routes';
import * as userRoutes from './user-routes';

export function getRoutes() {
    const router = new express.Router();

    router.use('/tasks/', taskRoutes.getRoutes());
    router.use('/users/', userRoutes.getRoutes());

    return router;
}

