import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import userQueries from "../models/userQuery.js";

async function register(req, res, next) {
  try {
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.mapped());
    }
    let salt = bcrypt.genSaltSync(10)
    const reqData = req.body;
    reqData.password = bcrypt.hashSync(reqData.password, salt)
    const response = await userQueries.register(reqData);
    return res.status(200).json(response.message);
  } catch (err) {
    console.log(err);
    return next();
  }
}

async function login(req, res, next) {
  try {
    console.log('here')
    const reqData = req.body;
    const response = await userQueries.login(reqData);
    return res.status(response.httpStatus).json(response.body);
  } catch (err) {
    return next(new errors.OperationalError(`Error`));
  }
}

export default { login, register };
