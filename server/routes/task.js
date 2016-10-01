import express from 'express';
import { authenticatedMiddleware } from '../auth';
import * as tasks from '../control/task';

export function getRoutes() {
    const router = new express.Router();

    router.use(authenticatedMiddleware);

    router.get('/', (req, res) => {
        tasks.findAll(req.user._id)
            .then(tasks => res.status(200).send(tasks))
            .catch(err => res.status(400).send(err));
    });

    router.get('/:id', (req, res) => {
        tasks.findById(req.user._id, req.params.id)
            .then(task => res.status(200).send(task))
            .catch(() => res.status(404).send());
    });

    router.get('/find/:summary', (req, res) => {
        tasks.findBySummary(req.user._id, req.params.summary)
            .then(tasks => res.status(200).send(tasks))
            .catch(() => res.status(404).send());
    });

    router.post('/', (req, res) => {
        tasks.save(req.user._id, req.body)
            .then(task => res.status(201).send(task))
            .catch(err => res.status(400).send(err));
    });

    router.put('/', (req, res) => {
        tasks.update(req.user._id, req.body)
            .then(task => res.status(200).send(task))
            .catch(err => res.status(400).send(err));
    });

    router.delete('/:id', (req, res) => {
        tasks.remove(req.user._id, req.params.id)
            .then(() => res.status(200).send())
            .catch(err => res.status(400).send(err));
    });

    return router;
}
