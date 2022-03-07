import express from "express";
import cookieSession from "cookie-session";

import authRouter from "./routes/auth";
import passport from "./auth";
import { isLoggedIn } from "./middlewares/isLoggedIn";

const app = express();

app.set("trust proxy", 1);

app.use("/public", express.static("public"));

app.use(
  cookieSession({
    name: "github-auth-session",
    keys: ["SECRETKEY", "SECRETKEYTWO"],
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.set("view engine", "ejs");

app.use("/auth", authRouter);

app.all("/", isLoggedIn("/auth/login"), (req, res) => {
  console.log(req.body);
  res.render("pages/index", { user: req.user });
});

export default app;
