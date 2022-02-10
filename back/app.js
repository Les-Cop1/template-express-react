const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require("cors");
const databaseConnection = require("./database");
const getWhitelist = require("./utils/getWhitelist")

dotenv.config({ path: `${__dirname}/../.env` })

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

const buildPath = path.resolve(__dirname, '../front/build');
const indexHtml = path.join(buildPath, 'index.html');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(buildPath));

app.use('/api', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.get("*", (req, res) => res.sendFile(indexHtml))

databaseConnection()
    .then(() => {
        console.log("[Starting] - Connected to database")
    })
    .catch(()=> {
        console.log("[Starting] - Could not connect to database")
    })

module.exports = app;
