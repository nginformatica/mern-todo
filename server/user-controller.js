import UserModel from './model/user';

export function create(user, response) {
    user.created = Date.now();
    new UserModel(user).save()
        .then(() => {
            response.status(200).send('User created!');
        }, error => {
            response.status(400).send(error.toString());
        });
}

export function attemptLogin(loginInformation, response) {
    response.status(200).send();
}
