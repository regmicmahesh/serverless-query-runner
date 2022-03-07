import { RequestHandler } from "express";

export const isLoggedIn = (redirect_uri?: string): RequestHandler => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    if (redirect_uri) {
      res.redirect(redirect_uri);
    } else {
      res.status(401).send("Unauthorized");
    }
  };
};
