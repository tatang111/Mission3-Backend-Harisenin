// Purpose of service layer is to handle business logic
// Function can reuse for another function 

const { findMovies, findMovieById, insertMovie, deleteMovie, editMovie } = require('./movie.repository')

const getAllMovies = async (queryParams) => {
    const [movie] = await findMovies(queryParams);

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