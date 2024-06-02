import * as express from 'express';
const router = express.Router();

import{ DisplayMovieList } from '../Controllers/movie';

/* List of Routes (endpoints) */
/* GET Movie List. */
router.get('/', function(req, res, next) { DisplayMovieList(req, res, next);});

export default router;
