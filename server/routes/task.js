import express from 'express';
import { authenticatedMiddleware } from '../auth';
import {
    findAll,
    findById,
    findBySummary,
    save,
    update,
    temove
} as tasks from '../control/task';

export function getRoutes() {
    const router = new express.Router();

    router.use(authenticatedMiddleware);

    router.get('/', (req, res) => {
        findAll(req.user._id)
            .then(tasks => res.status(200).send(tasks))
            .catch(err => res.status(400).send(err));
    });

    router.get('/:id', (req, res) => {
        findById(req.user._id, req.params.id)
            .then(task => res.status(200).send(task))
            .catch(() => res.status(404).send());
    });

    router.get('/find/:summary', (req, res) => {
        findBySummary(req.user._id, req.params.summary)
            .then(tasks => res.status(200).send(tasks))
            .catch(() => res.status(404).send());
    });

    router.post('/', (req, res) => {
        save(req.user._id, req.body)
            .then(task => res.status(201).send(task))
            .catch(err => res.status(400).send(err));
    });

    router.put('/', (req, res) => {
        update(req.user._id, req.body)
            .then(task => res.status(200).send(task))
            .catch(err => res.status(400).send(err));
    });

    router.delete('/:id', (req, res) => {
        remove(req.user._id, req.params.id)
            .then(() => res.status(200).send())
            .catch(err => res.status(400).send(err));
    });

    return router;
}
