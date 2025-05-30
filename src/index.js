const express = require('express')
const app = express();
const cors = require('cors')
const env = require("dotenv")
env.config();

const port = process.env.PORT
app.use(express.json())
app.use(cors())

const movieController = require('./movie/movie.controller');
app.use("/movies", movieController)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})