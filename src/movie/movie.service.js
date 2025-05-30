// Purpose of service layer is to handle business logic
// Function can reuse for another function 

const { findMovies, findMovieById, insertMovie, deleteMovie, editMovie } = require('./movie.repository')

const getQuery = "SELECT movies.id, movies.title, movies.video_url, GROUP_CONCAT(DISTINCT genres.genre) AS genre, movies.duration, movies.description, GROUP_CONCAT(DISTINCT filmmakers.filmmaker) AS filmmaker, GROUP_CONCAT(DISTINCT casters.caster) AS caster, movies.episode_number, movies.release_date, movies.min_age, movies.image_url FROM movies LEFT JOIN genres on genres.movie_id = movies.id LEFT JOIN filmmakers ON filmmakers.movie_id = movies.id LEFT JOIN casters ON casters.movie_id = movies.id"

const getAllMovies = async () => {
    const [movie] = await findMovies();

    if (movie.length === 0) throw Error("Movie not added yet")

    return movie;
}

const getMovieById = async (movieId) => {
    const [movie] = await findMovieById(movieId)

    if (movie.length === 0) throw Error("Movie not found")

    return movie;
}

const createMovie = async (newMovie) => {
    const { title, video_url, image_url, duration, description, episode_number, release_date, min_age, genre, filmmaker, caster } = newMovie;

    if (!title || !video_url || !image_url || !duration || !description || episode_number === null || !release_date || min_age === null || genre.length === 0 || filmmaker.length === 0 || caster.length === 0) {
        throw Error("Some field are missing")
    }

    const movie = await insertMovie(newMovie)

    newMovie.id = movie.insertId
    return newMovie
}

const deleteMovieById = async (movieId) => {
    await getMovieById(movieId)

    deleteMovie(movieId)
}

const editMovieById = async (newMovie, movieId) => {
    await editMovie(newMovie, movieId)

    newMovie.id = movieId;
    return newMovie
}

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    deleteMovieById,
    editMovieById
}