import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("pages/login");
  }
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email", "read:user"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/github" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

export default router;
