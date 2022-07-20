import express from "express";
import passport from "passport";
import validateRegister from "../middlewares/authValidate.js";
import registrationController from "../controllers/registrationController.js";
import loginController from "../controllers/loginController.js";
import buyerController from "../controllers/buyerController.js";
import sellerController from '../controllers/sellerController.js'
import initPassportLocal from "../controllers/passportController.js";
const router = express.Router();

// auth api routes

initPassportLocal();

// required fields : email, password, firstName , {userType (if seller), shopName}

router.post(
  "/auth/register",
  validateRegister,
  registrationController.register
);
router.post(
  "/auth/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  })
);

// //buyer api routes

router.get('/buyer/list-of-sellers', loginController.checkLoggedIn ,buyerController.getAllSellers);
router.get('/buyer/seller-catalog/:seller_id', loginController.checkLoggedIn ,buyerController.getSellerCatalogue);
// router.post('/buyer/create-order/:seller_id', validator.checkLoginParams, invOnboardingModule.loginByPasswordReqFilter);

// //seller api routes
// router.get('/seller/orders', verifyToken, invOnboardingModule.verifyOtpReqFilter);
router.post('/seller/create-catalog', loginController.checkLoggedIn, sellerController.createCatalogue);

// router.get("/", async function (req, res, next) {
//   try {
//     res.json(await userQueries.getUsers(req.query.page));
//   } catch (err) {
//     console.error(`Error while getting data`, err.message);
//     next(err);
//   }
// });
// router.post("/", async function (req, res, next) {
//   try {
//     res.json(await userQueries.createUser(req.body));
//   } catch (err) {
//     console.error(`Error while creating user`, err.message);
//     next(err);
//   }
// });

// // get all sellers

// router.get("/sellers", async function (req, res, next) {
//   try {
//     res.json(await userQueries.getSellers(req.query.page));
//   } catch (err) {
//     console.error(`Error while getting data`, err.message);
//     next(err);
//   }
// });

export default router;
