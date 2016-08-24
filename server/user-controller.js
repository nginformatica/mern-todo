import UserModel from './model/user';

export function create(user, response) {
    user.created = Date.now();
    new UserModel(user).save()
        .then(() => {
            response.status(201).send();
        }, error => {
            response.status(400).send(error.toString());
        });
}
