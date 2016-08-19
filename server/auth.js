import passport from 'passport';
import { Strategy } from 'passport-local';
import UserModel from './model/user';

export function initialize() {
    passport.use(new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, done) => {
        UserModel.findOne({ email, password })
            .select('name email created').exec()
            .then(user => {
                return done(null, user);
            }, () => {
                return done({ 
                    message: 'Invalid email or password!'
                });
            });
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        UserModel.findOne({ _id: id })
            .select('name email created').exec()
            .then(user => {
                done(null, user);
            });
    });
}

export function authenticatedMiddleware(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
}
