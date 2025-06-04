// Layer for handle request and response
// usually handle body validation as well

const express = require('express');
const { getAllMovies, getMovieById, createMovie, deleteMovieById, editMovieById } = require('./movie.service');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

const formatMovieData = (movie) => ({
    id: movie.id,
    title: movie.title,
    video_url: movie.video_url,
    genre: movie.genre ? movie.genre.split(",") : [],
    image_url: movie.image_url,
    duration: movie.duration,
    description: movie.description,
    episode_number: movie.episode_number,
    release_date: movie.release_date,
    min_age: movie.min_age,
    filmmaker: movie.filmmaker ? movie.filmmaker.split(",") : [],
    caster: movie.caster ? movie.caster.split(",") : [],
})

router.get("/", async (req, res) => {
    const queryParams = req.query
    try {
        const movie = await getAllMovies(queryParams);

        res.status(200).send(movie.map(formatMovieData))
    } catch (error) {
        res.status(500).send({ message: "Failed to get movie", error: error.message })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const movie = await getMovieById(parseInt(req.params.id));

        res.send(formatMovieData(movie[0]))
    } catch (error) {
        res.status(500).send({ message: "Failed to get movie", error: error.message })
    }
})

router.post("/", authenticateToken, async (req, res) => {
    try {
        const movie = await createMovie(req.body);

        res.status(201).send({ data: movie, message: "Movie data created successfully" })
    } catch (error) {
        res.status(500).send({ message: "Failed to create movie data", error: error.message })
    }
})

router.put("/:id", authenticateToken, async (req, res) => {
    const { title, video_url, image_url, duration, description, episode_number, release_date, min_age, genre, filmmaker, caster } = req.body;
    try {
        await getMovieById(parseInt(req.params.id))
        if (!title || !video_url || !image_url || !duration || !description || !episode_number || !release_date || !min_age || genre.length === 0 || filmmaker.length === 0 || caster.length === 0) {
            res.status(400).send({ message: "Some field are missing" })
        }
        const movie = await editMovieById(req.body, parseInt(req.params.id))

        res.status(200).send({ data: movie, message: "Updated movie data successfully" })
    } catch (error) {
        res.status(500).send({ message: "Failed to update data", error: error.message })
    }
})

router.patch("/:id", authenticateToken, async (req, res) => {
    try {
        await getMovieById(parseInt(req.params.id))
        const movie = await editMovieById(req.body, parseInt(req.params.id))

        res.status(200).send({ data: movie, message: "Updated movie data successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "Failed to update data", error: error.message })
    }
})

router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        await deleteMovieById(parseInt(req.params.id))

        res.status(200).send({ message: "Movie deleted successfuly" })
    } catch (error) {
        res.status(500).send({ message: "Failed to deleted movie", error: error.message })
    }
})

module.exports = router