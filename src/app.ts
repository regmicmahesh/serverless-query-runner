import express from "express";
import cookieSession from "cookie-session";

import authRouter from "./routes/auth";
import passport from "./auth";
import { isLoggedIn } from "./middlewares/isLoggedIn";
import { runQuery } from "./db/query";
import { Message } from "./utils";
import { QueryResult } from "pg";

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

app.all("/", isLoggedIn("/auth/login"), async (req, res) => {
  const { query } = req.body;

  if (query) {
    let message: Message | undefined;
    let result: QueryResult | undefined;
    try {
      result = await runQuery(query);
      if (result.rows.length === 0) {
        message = new Message(
          "success",
          "Query Successful. No outputs returned"
        );
      }
    } catch (e: any) {
      message = new Message("danger", e.message);
    } finally {
      return res.render("pages/index", { result, query, message });
    }
  }

  res.render("pages/index", { query });
});

export default app;
