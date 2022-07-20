import { check } from "express-validator";

let validateRegister = [
  check("email", "Invalid email").isEmail().trim(),
  check(
    "password",
    "Invalid password. Must be at least 6 characters long"
  ).isLength({ min: 6 }),
  // check(
  //   "passwordConfirmation",
  //   "Password confirmation does not match password"
  // ).custom((value, { req }) => {
  //   return value === req.body.password;
  // }),
];
export default validateRegister
