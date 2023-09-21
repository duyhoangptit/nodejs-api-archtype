const express = require('express')
const {PORT} = require('./config')
const {Database} = require('./database')
const expressApp = require('./app')

const config = require('./config')
console.log("config:: ", config)

const startServer = async () => {
    const app = express();

    // connection database
    await Database.getInstance()

    // setting express app
    await expressApp(app);

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
    .on('close', () => {
        // close channel rabbit mq to here
    })
}

startServer().then(() => {
    console.log("done")
})
