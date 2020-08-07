const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(
        process.env.MONGO_CONNECTION_STRING,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        },
        err => {
            if (err) {
                console.error(
                    'MongoDB Error:',
                    'Could not connect to database, stopping'
                );
                return process.exit(1);
            }
            return true;
        }
    );
};