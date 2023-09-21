const mongoose = require("mongoose");
const {DB_URL} = require('../../config')
const MAX_POLL_SIZE = 50;
const TIME_OUT_CONNECT = 3000;

mongoose.set('strictQuery', true);

const countConnect = () => {
    const numOfConnect = mongoose.connections.length;
    console.log(`Number of connections: ${numOfConnect}`);
}

module.exports = () => {
    if (1 === 1) {
        mongoose.set('debug', true);
        mongoose.set('debug', {color: true});
    }

    mongoose.connect(DB_URL, {
        serverSelectionTimeoutMS: TIME_OUT_CONNECT,
        maxPoolSize: MAX_POLL_SIZE
    })
        .then(
            _ => {
                try {
                    countConnect();
                } catch (e) {
                    console.log(e);
                }
                _ => console.log(`Connected mongodb success `);
            }
        ).catch(
        err => console.log(`Error connect!`)
    );

    mongoose.connection.on('connected', () => {
        console.log('Mongodb connected to db success');

        // insert sql ...
    });
    mongoose.connection.on('error', err => {
        console.error('Mongodb connected to db error' + err);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('Mongodb disconnected db success');
    });
}
