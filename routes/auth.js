const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyJWT = require('../utils/verifyToken')
const User = require('../database/models/User')
const handleMongoDBErrors = require("../utils/handleMongoDBErrors")

// LoggedIn
router.get("/", verifyJWT, (req, res) => {
    let response ={
        success: true,
    }

    const useSecureAuth = process.env.NODE_ENV !== "development"

    if (req.cookies['auth-token']) {
        res.cookie('auth-token', req.cookies['auth-token'], {
            maxAge: 31*24*3600*1000, // 1 mois
            httpOnly: useSecureAuth,
            secure: useSecureAuth
        })
    }

    return res.send({...response, user: req.user})
})

// Login
router.post("/",async (req, res) => {
    let response ={
        success: true,
    }

    const useSecureAuth = process.env.NODE_ENV !== "development"

    //Validation des données
    const validation = req.body.username !== undefined && req.body.password !== undefined
    if (!validation) {
        return res.send({...response, success: false, error: "Some data is missing"})
    }

    try {
        const user = await User.findOne({username: req.body.username})

        // Si l'utilisateur n'existe pas
        if (user === null) {
            return res.send({...response, success: false, error: "Username or password incorrect"})
        }

        const validPass = await bcrypt.compare(req.body.password, user.password)
        if (!validPass) {
            return res.send({...response, success: false, error: "Username or password incorrect"})
        }

        // Création du token
        const {
            password, // eslint-disable-line no-unused-vars
            ...tokenContent
        } = user._doc

        const token = jwt.sign(tokenContent, process.env.JWT_SECRET)
        res.cookie('auth-token', token, {
            maxAge: 31*24*3600*1000,  // 1 mois
            httpOnly: useSecureAuth,
            secure: useSecureAuth
        });

        response = {...response, user: tokenContent}

    } catch (error) {
        response = {...response, success: false, error: handleMongoDBErrors(error), err: error}
    }

    return res.send(response)
})

// Logout
router.delete("/", verifyJWT, (req, res) => {
    let response ={
        success: true,
    }

    res.cookie('auth-token', '', {
        maxAge: -100
    });

    return res.send(response)
})


module.exports = router;
