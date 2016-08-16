import mongodb from 'mongoose';

export default mongodb.model('Task', new mongodb.Schema({
    summary: {
        type: String,
        required: [true, 'Summary is required!']
    },
    description: String,
    isDone: {
        type: Boolean,
        default: false
    },
    due: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongodb.Schema.Types.ObjectId,
        ref: 'User'
    }
}));
