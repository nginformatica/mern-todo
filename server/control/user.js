import UserModel from '../model/user';

export function create(user) {
    return new UserModel(user).save();
}
