// Communication with database
// ORM or raw query are allowed

const db = require('../db/index')

const getQuery = "SELECT movies.id, movies.title, movies.video_url, GROUP_CONCAT(DISTINCT genres.genre) AS genre, movies.duration, movies.description, GROUP_CONCAT(DISTINCT filmmakers.filmmaker) AS filmmaker, GROUP_CONCAT(DISTINCT casters.caster) AS caster, movies.episode_number, movies.release_date, movies.min_age, movies.image_url FROM movies LEFT JOIN genres on genres.movie_id = movies.id LEFT JOIN filmmakers ON filmmakers.movie_id = movies.id LEFT JOIN casters ON casters.movie_id = movies.id"

const findMovies = async (queryParams) => {
    const genreList = queryParams.genre && queryParams.genre.split(",")
    const genreParams = queryParams.genre ? `HAVING ${genreList.map(g => `FIND_IN_SET(LOWER('${g}'), LOWER(genre))`).join(" OR ")}` : ""
    // HAVING FIND_IN_SET(LOWER('aksi'), genre) OR FIND_IN_SET(LOWER('petualang'), genre)

    const minAgeParams = queryParams.min_age && ` min_age = ${queryParams.min_age}`;

    const orderParams = queryParams.order === "desc" ? 'DESC' : 'ASC';
    const sortParams = queryParams.sortBy ? `ORDER BY ${queryParams.sortBy} ${orderParams}` : ""

    const searchParams = queryParams.search ? ` LOWER(movies.title) LIKE '%${queryParams.search}%'` : ""
    let whereClause = '';
    if (minAgeParams && searchParams) {
        whereClause = `WHERE ${searchParams} AND ${minAgeParams}`
    } else if (minAgeParams) {
        whereClause = `WHERE ${minAgeParams}`
    } else if (searchParams) {
        whereClause = `WHERE ${searchParams}`
    }

    const movies = await db.query(`${getQuery} ${whereClause} GROUP BY movies.id ${genreParams} ${sortParams}`);

    return movies
}

const findMovieById = async (movieId) => {
    const movie = await db.query(`${getQuery} WHERE movies.id = ? GROUP BY movies.id`, [movieId])

    return movie
}

const insertMovie = async (newMovie) => {
    const { title, video_url, image_url, duration, description, episode_number, release_date, min_age, genre, filmmaker, caster } = newMovie;

    const [movie] = await db.query("INSERT INTO movies (title, video_url, image_url, duration, description, episode_number, release_date, min_age) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [title, video_url, image_url, duration, description, episode_number, release_date, min_age])
    const movieId = movie.insertId;

    if (genre.length > 0) {
        await db.query("INSERT INTO genres (movie_id, genre) VALUES ?", [genre.map(g => [movieId, g])])
    }

    if (filmmaker.length > 0) {
        await db.query("INSERT INTO filmmakers (movie_id, filmmaker) VALUES ?", [filmmaker.map(f => [movieId, f])])
    }

    if (caster.length > 0) {
        await db.query("INSERT INTO casters (movie_id, caster) VALUES ?", [caster.map(c => [movieId, c])])
    }
    return movie;
}

const deleteMovie = async (movieId) => {
    await db.query("DELETE FROM genres WHERE movie_id = ?", [movieId])
    await db.query("DELETE FROM filmmakers WHERE movie_id = ?", [movieId])
    await db.query("DELETE FROM casters WHERE movie_id = ?", [movieId])

    await db.query("DELETE FROM movies WHERE id = ?", [movieId])
}

const editMovie = async (newMovie, movieId) => {
    const { title, video_url, image_url, duration, description, episode_number, release_date, min_age, genre, filmmaker, caster } = newMovie;

    const query = [];
    const values = [];

    if (title) { query.push("title = ?"); values.push(title) }
    if (video_url) { query.push("video_url = ?"); values.push(video_url) }
    if (image_url) { query.push("image_url = ?"); values.push(image_url) }
    if (duration) { query.push("duration = ?"); values.push(duration) }
    if (description) { query.push("description = ?"); values.push(description) }
    if (typeof episode_number === "number") { query.push("episode_number = ?"); values.push(episode_number) }
    if (release_date) { query.push("release_date = ?"); values.push(release_date) }
    if (typeof min_age === "number") { query.push("min_age = ?"); values.push(min_age) }

    if (query.length > 0) {
        values.push(movieId);
        await db.query(`UPDATE movies SET ${query.join(", ")} WHERE id = ?`, values)
    }

    if (Array.isArray(genre)) {
        await db.query("DELETE FROM genres WHERE movie_id = ?", [movieId]);
        if (genre.length > 0) {
            await db.query("INSERT INTO genres (movie_id, genre) VALUES ?", [genre.map(g => [movieId, g])])
        }
    }

    if (Array.isArray(filmmaker)) {
        await db.query("DELETE FROM filmmakers WHERE movie_id = ?", [movieId]);
        if (filmmaker.length > 0) {
            await db.query("INSERT INTO filmmakers (movie_id, filmmaker) VALUES ?", [filmmaker.map(f => [movieId, f])])
        }
    }

    if (Array.isArray(caster)) {
        await db.query("DELETE FROM casters WHERE movie_id = ?", [movieId]);
        if (caster.length > 0) {
            await db.query("INSERT INTO casters (movie_id, caster) VALUES ?", [caster.map(c => [movieId, c])])
        }
    }
}

module.exports = {
    findMovies,
    findMovieById,
    insertMovie,
    deleteMovie,
    editMovie
}