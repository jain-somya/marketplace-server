import express from "express";
import userQueries from "../services/userQuery.js";
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    res.json(await userQueries.getUsers(req.query.page));
  } catch (err) {
    console.error(`Error while getting data`, err.message);
    next(err);
  }
});
router.post("/", async function (req, res, next) {
  try {
    res.json(await userQueries.createUser(req.body));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

export default router;
