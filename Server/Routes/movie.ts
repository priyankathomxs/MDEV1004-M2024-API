import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

import passport from "passport";

import {
  DisplayMovieList,
  DisplayMovieById,
  AddMovie,
  UpdateMovie,
  DeleteMovie,
} from "../Controllers/movie";

/* Movie Endpoints */

/* GET Movie List - fallback incase /list is not used */

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  DisplayMovieList(req, res, next);
});

/* GET Movie List */
router.get("/list", (req: Request, res: Response, next: NextFunction) => { DisplayMovieList(req, res, next);});

/* GET Movie By Id */
router.get("/find/:id", (req, res, next) => { DisplayMovieById(req, res, next);});

/* Add a new movie */
router.post("/add",/* passport.authenticate("jwt", { session: false }), */(req, res, next) => { AddMovie(req, res, next);});

/* update a  movie */
router.put(
  "/update/:id",/*passport.authenticate("jwt", { session: false }), */(req, res, next) => { UpdateMovie(req, res, next);});

/* delete a  movie */
router.delete("/delete/:id",/*passport.authenticate("jwt", { session: false }), */(req, res, next) => { DeleteMovie(req, res, next);});


export default router;
