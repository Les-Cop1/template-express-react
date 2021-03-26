const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config()

const indexRouter = require('./routes/index');

const app = express();

if (process.env.ENVIRONEMENT === 'dev') {
    let whitelist = ['http://localhost:3000']
    const  corsOptions = {
        origin: function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }

    app.use(cors(corsOptions))
} else {
    app.use(cors())
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

app.get("*", (req, res) => {
    return res.sendFile(path.join(__dirname, "/client/build/index.html"))
})

module.exports = app;
