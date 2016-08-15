import express from 'express';
import passport from 'passport';

export function getRoutes() {
    const router = new express.Router();

    router.post('/', passport.authenticate('local', {
        failureRedirect: '/'
    }), (req, res) => {
        res.status(200).send('You logged in!');
    });

    router.get('/logout', (req, res) => {
        req.logout();
        res.status(200).send('You logged out!');
    });

    router.get('/whoami', (req, res) => {
        res.status(200).send(req.user);
    });

    return router;
}

