import { Request, Response, NextFunction } from "express";
import passport from "passport";
import mongoose from "mongoose";
import User from "../Models/user";
import { GenerateToken } from "../Util";

/**
 * Process registration function
 * @param req
 * @param res
 * @param next
 */
export function ProcessRegistration(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // instantiate a new user object
  let newUser = new User({
    username: req.body.username,
    emailAddress: req.body.emailAddress,
    displayName: req.body.firstName + " " + req.body.lastName,
  });

  User.register(newUser, req.body.password, (err) => {
    if (err instanceof mongoose.Error.ValidationError) {
      console.error("All Fields are required");
      return res.status(400).json({
        success: false,
        msg: "ERROR: User not registered. All fields are requried",
      });
    }

    if (err) {
      console.error("ERROR: Inserting New User");
      if (err.name == "UserExistsError") {
        console.error("ERROR: user already exists");
      }
      return res.status(400).json({
        success: false,
        msg: "ERROR: User not registered",
        data: null,
        token: null,
      });
    }

    return res.json({
      success: true,
      msg: "User Registered successfully",
      data: newUser,
      token: null,
    });
  });
}

/**
 * Process login function
 * @param req
 * @param res
 * @param next
 */
export function ProcessLogin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    //are there any server errors
    if (err) {
      console.error(err);
      return res
        .status(400)
        .json({
          success: false,
          msg: "ERROR: Server Error",
          data: null,
          token: null,
        });
    }

    //are there login errors
    if (!user) {
      console.error("Login Error: User Credentials Error or User not found");
      return res.status(400).json({
        success: false,
        msg: "ERROR: Login Error",
        data: null,
        token: null,
      });
    }

    req.login(user, (err) => {
      // are there database errors
      if (err) {
        console.error(err);
        return res.status(400).json({
          success: false,
          msg: "ERROR: Database Error",
          data: null,
          token: null,
        });
      }

      const authToken = GenerateToken(user);

      return res.json({
        success: true,
        msg: "User Logged in successfully",
        data: user,
        token: authToken,
      });
    });
    return;
  })(req, res, next);
}

/**
 * Process logout function
 * @param req
 * @param res
 * @param next
 */
export function ProcessLogout(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  req.logout(() => {
    console.log("User Logged out successfully");
    return res.json({
      success: true,
      msg: "User Logged out successfully",
      data: null,
      token: null,
    });
  });
}
