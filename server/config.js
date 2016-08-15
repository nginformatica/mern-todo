
const ServerConfig = {
    port: process.env.PORT || 8000,
    mongoUri: process.env.MONGO_DB || 'mongodb://localhost:27017/todo-app',
    sessionSecret: process.env.SECRET || 'top secret'
};

export default ServerConfig;
