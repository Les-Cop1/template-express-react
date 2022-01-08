const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require("cors");
const databaseConnection = require("./database");
const getWhitelist = require("./utils/getWhitelist")

dotenv.config()

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

const app = express();

if (process.env.NODE_ENV === 'development') {
    const whitelist = getWhitelist()

    let corsOptions = {
        origin: function (origin, callback) {
            if (!origin || whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        credentials: true
    }

    app.use(cors(corsOptions))
} else {
    app.use(cors({credentials: true}))
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front/build')));

app.use('/api', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.get("*", (req, res) => {
    return res.sendFile(path.join(__dirname, "/front/build/index.html"))
})

databaseConnection()
    .then(() => {
        console.log("[Starting] - Connected to database")
    })
    .catch(()=> {
        console.log("[Starting] - Could not connect to database")
    })

module.exports = app;
