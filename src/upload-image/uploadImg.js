const express = require('express');
const router = express.Router()
const upload = require('./uploadService')

router.post("/", upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send({message: "No file uploaded"});

        res.status(200).send({
            message: "Upload Success",
            filename: req.file.filename,
            path: `/upload/${req.file.filename}`
        })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

module.exports = router