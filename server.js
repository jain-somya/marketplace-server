import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import passport from "passport";
// import crypto from 'crypto'
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import session from "express-session";
import routes from "./src/routes/routes.js";
const app = express();
const port = 3000;
app.use(express.json());
app.use(cookieParser('secret'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
  }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/api", routes);

/* Error handler middleware */

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
