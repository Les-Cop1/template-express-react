const mongoose = require('mongoose');

const databaseConnection = async () => {
    const {
        MONGO_USER,
        MONGO_PASSWORD,
        MONGO_DATABASE
    } = process.env

    try {
        await mongoose.connect(`mongodb+srv://${MONGO_USER}:${encodeURI(MONGO_PASSWORD)}@${MONGO_DATABASE}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = databaseConnection;
