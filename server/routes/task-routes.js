import express from 'express';
import { authenticatedMiddleware } from '../auth';
import * as tasks from '../task-controller';

export function getRoutes() {
    const router = new express.Router();

    router.use(authenticatedMiddleware);

    router.get('/', (req, res) => {
        tasks.findAll(req, res);
    });

    router.get('/:id', (req, res) => {
        tasks.findById(req, res);
    });

    router.get('/find/:summary', (req, res) => {
        tasks.findBySummary(req, res);
    });

    router.post('/', (req, res) => {
        tasks.save(req, res);
    });

    router.put('/', (req, res) => {
        tasks.update(req, res);
    });

    router.delete('/:id', (req, res) => {
        tasks.remove(req, res);
    });

    return router;
}
