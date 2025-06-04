const express = require('express')
const app = express();
const cors = require('cors')
const env = require("dotenv")
const path = require("path")
env.config();

const port = process.env.PORT
app.use("/upload", express.static(path.join(__dirname, '../upload')))
app.use(express.json())
app.use(cors())

const movieController = require('./movie/movie.controller');
const registerController = require('./auth/auth.controller')
const uploadController = require('./upload-image/uploadImg')
app.use("/movies", movieController)
app.use("/auth", registerController)
app.use("/api/upload", uploadController)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})