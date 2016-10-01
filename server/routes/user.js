import express from 'express';
import { create } from '../control/user';

export function getRoutes() {
    const router = new express.Router();

    router.post('/', (req, res) => {
        create(req.body)
            .then(user => res.status(201).send(user))
            .catch(err => res.status(401).send(err));
    });

    return router;
}
