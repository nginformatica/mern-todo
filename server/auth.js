import passport from 'passport';
import { Strategy } from 'passport-local';
import UserModel from './model/user';

export function initialize() {
    passport.use(new Strategy({
        usernameField: 'email', passwordField: 'password'
    }, (email, password, done) => {
        UserModel.findOne({ email, password }).exec()
            .then(user => {
                return done(null, user);
            }, () => {
                return done(null, false, 'Invalid email or password!');
            });
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        UserModel.findOne({ _id: id }).exec()
            .then(user => {
                done(null, user);
            });
    });
}
