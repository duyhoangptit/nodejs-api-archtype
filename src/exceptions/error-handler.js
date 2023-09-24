const {createLogger, transports} = require('winston')
const BaseError = require('./error.response')
const {exit} = require('../utils/exits.util')

const LogErrors = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({filename: 'app_error.log'})
    ]
})

class ErrorLogger {
    constructor() {
    }

    async logError(err) {
        LogErrors.log({
            private: true,
            level: 'error',
            message: `${new Date()}-${JSON.stringify(err)}`
        })
    }

    isTrustError(err) {
        if (err instanceof BaseError) {
            return err.isOperational
        }
        return false;
    }
}

const ErrorHandler = async (err, req, res, next) => {
    const errorLogger = new ErrorLogger()

    process.on('SIGINT', () => {
        console.log('Ctrl + C:: Service stop!!!')
        exit()
    });

    // CTRL+C
        process.on('SIGQUIT', () => {
            console.log('Keyboard quit:: Service stop!!!')
            exit()
        });
    // Keyboard quit
        process.on('SIGTERM', () => {
            console.log('Kill command:: Service stop!!!')
            exit()
        });
    // `kill` command

    process.on('uncaughtException', (reason, promise) => {
        console.log(reason, 'UNHANDLED');
        throw reason; // need to take care
    })

    process.on('', (err) => {
        errorLogger.logError(err);
        if(errorLogger.isTrustError(err)){
            //process exist // need restart
            exit()
        }
    })

    if (err) {
        await errorLogger.logError(err)
        if (errorLogger.isTrustError(err)) {
            if (err.errorStack) {
                const errorDescription = err.errorStack;
                return res.status(err.statusCode).json({'message': errorDescription})
            }
            return res.status(err.statusCode).json({'message': err.message })
        } else {
            // process exit
            exit()
            // terriablly wrong with flow need restart
        }
        return res.status(err.statusCode).json({'message': err.message})
    }

    next()
}


module.exports = ErrorHandler
