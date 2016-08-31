import mongodb from 'mongoose';

export default mongodb.model('User', new mongodb.Schema({
    name: {
        type: String,
        required: [true, 'User name is required!']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'E-mail is required!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [4, 'Password is too short!']
    },
    created: Date
}));
