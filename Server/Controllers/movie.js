"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMovie = exports.UpdateMovie = exports.AddMovie = exports.DisplayMovieById = exports.DisplayMovieList = void 0;
const movie_1 = __importDefault(require("../Models/movie"));
const Util_1 = require("../Util");
function DisplayMovieList(req, res, next) {
    movie_1.default.find({})
        .then(function (data) {
        res.status(200).json({
            success: true,
            msg: "Movie List Retrieved and Displayed",
            data: data,
            token: null,
        });
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.DisplayMovieList = DisplayMovieList;
function DisplayMovieById(req, res, next) {
    let id = req.params.id;
    if (id.length != 24) {
        res.status(400).json({
            success: false,
            msg: "A valid Id is requried to retrieve a movie",
            data: null,
            token: null,
        });
    }
    else {
        movie_1.default.findById({ _id: id })
            .then((data) => {
            if (data) {
                res.status(200).json({
                    success: true,
                    msg: "One Movie Retrieved and Displayed",
                    data: data,
                    token: null,
                });
            }
            else {
                res.status(404).json({
                    success: false,
                    msg: "Movie not found",
                    data: null,
                    token: null,
                });
            }
        })
            .catch((err) => {
            console.log(err);
        });
    }
}
exports.DisplayMovieById = DisplayMovieById;
function AddMovie(req, res, next) {
    let genres = req.body.genres
        ? (0, Util_1.SanitizedArray)(req.body.genres)
        : (0, Util_1.SanitizedArray)("");
    let directors = req.body.directors
        ? (0, Util_1.SanitizedArray)(req.body.directors)
        : (0, Util_1.SanitizedArray)("");
    let actors = req.body.actors
        ? (0, Util_1.SanitizedArray)(req.body.actors)
        : (0, Util_1.SanitizedArray)("");
    let writers = req.body.writers
        ? (0, Util_1.SanitizedArray)(req.body.writers)
        : (0, Util_1.SanitizedArray)("");
    let movie = new movie_1.default({
        movieId: req.body.movieId,
        title: req.body.title,
        studio: req.body.studio,
        genres: genres,
        directors: directors,
        writers: writers,
        actors: actors,
        length: req.body.length,
        year: req.body.year,
        shortDescription: req.body.shortDescription,
        mpaRating: req.body.mpaRating,
        criticsRating: req.body.criticsRating,
    });
    movie_1.default.create(movie)
        .then(() => {
        res
            .status(200)
            .json({ success: true, msg: "Movie Added", data: movie, token: null });
    })
        .catch((err) => {
        console.log(err);
    });
}
exports.AddMovie = AddMovie;
function UpdateMovie(req, res, next) {
    let id = req.params.id;
    if (id.length != 24) {
        res.status(400).json({
            success: false,
            msg: "A valid Id is requried to update a movie",
            data: "",
        });
    }
    else {
        let genres = req.body.genres
            ? (0, Util_1.SanitizedArray)(req.body.genres)
            : (0, Util_1.SanitizedArray)("");
        let directors = req.body.directors
            ? (0, Util_1.SanitizedArray)(req.body.directors)
            : (0, Util_1.SanitizedArray)("");
        let actors = req.body.actors
            ? (0, Util_1.SanitizedArray)(req.body.actors)
            : (0, Util_1.SanitizedArray)("");
        let writers = req.body.writers
            ? (0, Util_1.SanitizedArray)(req.body.writers)
            : (0, Util_1.SanitizedArray)("");
        let movieToUpdate = new movie_1.default({
            _id: id,
            movieId: req.body.movieId,
            title: req.body.title,
            studio: req.body.studio,
            genres: genres,
            directors: directors,
            writers: writers,
            actors: actors,
            length: req.body.length,
            year: req.body.year,
            shortDescription: req.body.shortDescription,
            mpaRating: req.body.mpaRating,
            criticsRating: req.body.criticsRating,
        });
        movie_1.default.updateOne({ _id: id }, movieToUpdate).then(() => {
            res.status(200).json({
                success: true,
                msg: "Movie updated",
                data: movieToUpdate,
                token: null,
            });
        });
    }
}
exports.UpdateMovie = UpdateMovie;
function DeleteMovie(req, res, next) {
    let id = req.params.id;
    if (id.length != 24) {
        res.status(400).json({
            success: false,
            msg: "A valid Id is requried to update a movie",
            data: null,
            token: null,
        });
    }
    else {
        movie_1.default.deleteOne({ _id: id })
            .then(() => {
            res
                .status(200)
                .json({ success: true, msg: "Movie Deleted", data: id, token: null });
        })
            .catch((err) => {
            console.log(err);
        });
    }
}
exports.DeleteMovie = DeleteMovie;
//# sourceMappingURL=movie.js.map