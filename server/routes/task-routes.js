import express from 'express';
import * as tasks from '../task-controller';

export function getRoutes() {
    const router = new express.Router();

    router.get('/', (req, res) => {
        tasks.findAll(res);
    });

    router.get('/:id', (req, res) => {
        tasks.findById(req.params.id, res);
    });

    router.get('/find/:summary', (req, res) => {
        tasks.findBySummary(req.params.summary, res);
    });

    router.post('/', (req, res) => {
        tasks.save(req.body, res);
    });

    router.put('/', (req, res) => {
        tasks.update(req.body, res);
    });

    router.delete('/:id', (req, res) => {
        tasks.remove(req.params.id, res);
    });

    return router;
}
