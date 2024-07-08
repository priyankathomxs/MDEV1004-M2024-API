import { Request, Response, NextFunction } from "express";
import Movie from "../Models/movie";
import { SanitizedArray } from "../Util";

/**
 * This is function displays a movie list
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayMovieList(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  Movie.find({})
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

/**
 * This is function displays a movie by id
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayMovieById(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // endpoint should be /api/:id
  let id = req.params.id;

  // ensure that the id is valid
  if (id.length != 24) {
    res.status(400).json({
      success: false,
      msg: "A valid Id is requried to retrieve a movie",
      data: null,
      token: null,
    });
  } else {
    Movie.findById({ _id: id })
      .then((data) => {
        if (data) {
          res.status(200).json({
            success: true,
            msg: "One Movie Retrieved and Displayed",
            data: data,
            token: null,
          });
        } else {
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

/**
 * Function add a new movie to the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function AddMovie(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let genres = req.body.genres
    ? SanitizedArray(req.body.genres as string)
    : SanitizedArray("");
  let directors = req.body.directors
    ? SanitizedArray(req.body.directors as string)
    : SanitizedArray("");
  let actors = req.body.actors
    ? SanitizedArray(req.body.actors as string)
    : SanitizedArray("");
  let writers = req.body.writers
    ? SanitizedArray(req.body.writers as string)
    : SanitizedArray("");

  let movie = new Movie({
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

  Movie.create(movie)
    .then(() => {
      res
        .status(200)
        .json({ success: true, msg: "Movie Added", data: movie, token: null });
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * THis function uodated a movie in the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function UpdateMovie(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // endpoint /api/update/:id
  let id = req.params.id;

  // ensure that the id is valid
  if (id.length != 24) {
    res.status(400).json({
      success: false,
      msg: "A valid Id is requried to update a movie",
      data: "",
    });
  } else {
    let genres = req.body.genres
      ? SanitizedArray(req.body.genres as string)
      : SanitizedArray("");
    let directors = req.body.directors
      ? SanitizedArray(req.body.directors as string)
      : SanitizedArray("");
    let actors = req.body.actors
      ? SanitizedArray(req.body.actors as string)
      : SanitizedArray("");
    let writers = req.body.writers
      ? SanitizedArray(req.body.writers as string)
      : SanitizedArray("");

    let movieToUpdate = new Movie({
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

    Movie.updateOne({ _id: id }, movieToUpdate).then(() => {
      res.status(200).json({
        success: true,
        msg: "Movie updated",
        data: movieToUpdate,
        token: null,
      });
    });
  }
}

/**
 * This function deletes a movie from the database
 * @param req
 * @param res
 * @param next
 */
export function DeleteMovie(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // endpoint /api/update/:id
  let id = req.params.id;

  // ensure that the id is valid
  if (id.length != 24) {
    res.status(400).json({
      success: false,
      msg: "A valid Id is requried to update a movie",
      data: null,
      token: null,
    });
  } else {
    Movie.deleteOne({ _id: id })
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
