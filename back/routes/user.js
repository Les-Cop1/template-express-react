const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const verifyJWT = require('../utils/verifyToken')
const User = require("../database/models/User")
const handleMongoDBErrors = require("../utils/handleMongoDBErrors")
const jwt = require("jsonwebtoken");

// User info
router.get("/:_id", verifyJWT, async (req, res) => {
    let response ={
        success: true
    }

    const {_id} = req.params

    // Verification des authorisation
    let authorized = req.user._id === _id
    if (!authorized && req.user.auth) {
        return res.send({...response, success: false, error: "Unauthorized"})
    }

    try {
        const tmp = await User.findOne({_id})

        const {
            password, // eslint-disable-line no-unused-vars
            ...user
        } = tmp._doc

        response = {...response, user}
    } catch (error) {
        response = {...response, success: false, error: handleMongoDBErrors(error)}
    }

    res.send(response)
})

// Create user
router.post("/", async (req, res) => {
    let response ={
        success: true
    }

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    //Validation des données
    const validation = req.body.username !== undefined && user.password !== undefined
    if (!validation) {
        return res.send({...response, success: false, error: "Some data is missing"})
    }

    //Hash du mot de passe
    if (response.success) {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
    }

    //Insertion dans la base de donnée
    try {
        const tmp = await user.save();

        const {
            password // eslint-disable-line no-unused-vars
            , ...tmpUser
        } = tmp._doc

        response = {...response, user: tmpUser}
    } catch (error) {
        response = {...response, success: false, error: handleMongoDBErrors(error)}
    }


    return res.send(response)
})

// Update user
router.put("/", verifyJWT, async (req, res) => {
    let response ={
        success: true
    }

    let hashPassword
    let newUser = {}

    // Verification des authorisation
    let authorized = req.user._id === req.body._id
    if (!authorized && req.user.auth) {
        return res.send({...response, success: false, error: "Unauthorized"})
    }

    //Validation des données
    const validation = req.body._id !== undefined
    if (!validation) {
        return res.send({...response, success: false, error: "Some data is missing"})
    }

    req.body.username ? newUser.username = req.body.username : null
    //Hash du mot de passe
    if (req.body.password && req.body.confirmation) {
        if (req.body.password === req.body.confirmation) {
            const salt = await bcrypt.genSalt(10)
            hashPassword = await bcrypt.hash(req.body.password, salt)
            newUser = {...newUser, password: hashPassword}
        } else {
            return res.send({...response, success: false, error: "Wrong password"})
        }
    } else if (req.body.password && !req.body.confirmation) {
        return res.send({...response, success: false, error: "Password confirmation is missing"})
    }

    //Insertion dans la base de donnée
    try {

        const tmp = await User.findByIdAndUpdate(req.body._id, {$set: newUser},{new: true})

        const {
            password, // eslint-disable-line no-unused-vars
            ...tmpUser
        } = tmp._doc

        response = {...response, user: tmpUser}
    } catch (error) {
        response = {...response, error: handleMongoDBErrors(error)}
    }

    if (response.success && authorized) {
        const {
            password, // eslint-disable-line no-unused-vars
            ...tokenContent
        } = response.user

        const token = jwt.sign(tokenContent, process.env.JWT_SECRET)
        res.cookie('auth-token', token, {
            maxAge: 30*24*3600,
            httpOnly: true
        });
    }

    res.send(response)
})

// Delete user
router.delete("/", verifyJWT, async  (req, res) => {
    let response ={
        success: true
    }

    let authorized = req.user._id === req.body._id
    if (!authorized && req.user.auth) {
        return res.send({...response, success: false, error: "Unauthorized"})
    }

    try {
        const tmp = await User.findByIdAndDelete(req.body._id)

        const {
            password, // eslint-disable-line no-unused-vars
            ...user
        } = tmp._doc

        response = {...response, user}
    } catch (error) {
        response = {...response, success: false, error: handleMongoDBErrors(error)}
    }

    res.send(response)
})

module.exports = router;
