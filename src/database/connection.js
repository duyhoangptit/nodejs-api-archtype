'use strict'

const mongooseConnect = require('../config/db/mongodb')

const DB_TYPE = {
    MONGODB: 'mongodb',
    POSTGRESQL: 'postgresql'
}

class Database {
    constructor() {
        this.connect();
    }

    // connect
    connect(type = 'mongodb') {
        if (type === DB_TYPE.MONGODB) {
            mongooseConnect()
        }
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

module.exports = Database;
