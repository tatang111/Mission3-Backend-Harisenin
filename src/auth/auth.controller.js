require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const db = require('../db/index')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid')

router.post("/register", async (req, res) => {
    const { fullname, username, email, password } = req.body

    if (!fullname || !username || !email || !password) {
        return res.status(400).send({ message: "Some field are missing" })
    }

    try {
        const [prevUser] = await db.query("SELECT * FROM user WHERE email = ?", [email])

        if (prevUser.length > 0) return res.status(400).send({ message: "The email is already used" })

        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationToken = uuidv4();

        await db.query("INSERT INTO user (fullname, username, email, password, verification_token) VALUES (?, ?, ?, ?, ?)", [fullname, username, email, hashedPassword, verificationToken])

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        const verificationLink = `http://localhost:3000/verifikasi-email?token=${verificationToken}`
        try {
            await transporter.sendMail({
                from: `"Movie App" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: "Verify your email",
                html: `<p>Click this link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }

        res.status(201).send({ message: "Please check your email to verify account" })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const [dataUser] = await db.query("SELECT * FROM user WHERE email = ?", [email])

        if (dataUser.length === 0) {
            return res.status(401).send({ message: "Email or Password are wrong" })
        }
        if (dataUser[0].verification_token !== null) return res.status(400).send({ message: "Please verify your email" })

        const isMatch = await bcrypt.compare(password, dataUser[0].password)
        if (!isMatch) {
            return res.status(401).send({ message: "Email or Password are wrong" })
        }

        const user = { name: dataUser[0].username, id: dataUser[0].id, email: dataUser[0].email }
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" })

        res.status(200).send({ message: "Success", accessToken })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

router.get("/verifikasi-email", async (req, res) => {
    const token = req.query.token
    if (token === null) return res.status(400).send({ message: "Missing token" })
    try {
        const [user] = await db.query("SELECT * FROM user WHERE verification_token = ?", [token])

        if (user.length === 0) return res.status(400).send({ message: "Invalid verification token" })

        await db.query("UPDATE user SET verification_token = null WHERE id = ?", [user[0].id])

        res.status(200).send({ message: "Email verified successfully" })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

module.exports = router