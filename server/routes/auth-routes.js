import express from 'express';
import passport from 'passport';

export function getRoutes() {
    const router = new express.Router();

    router.post('/', passport.authenticate('local', {
        successRedirect: '/app'
    }));

    router.get('/logout', (req, res) => {
        req.logout();
        res.status(200).send({
            message: 'You logged out!'
        });
    });

    router.get('/whoami', (req, res) => {
        res.status(200).send(req.user);
    });

    return router;
}

