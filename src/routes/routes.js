import express from "express";
import passport from "passport";
import validateRegister from "../middlewares/authValidate.js";
import registrationController from "../controllers/registrationController.js";
import loginController from "../controllers/loginController.js";
import buyerController from "../controllers/buyerController.js";
import sellerController from '../controllers/sellerController.js'
import initPassportLocal from "../controllers/passportController.js";
const router = express.Router();



initPassportLocal();

// auth api routes

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

//buyer api routes
router.get('/buyer/list-of-sellers', loginController.checkLoggedIn ,buyerController.getAllSellers);
router.get('/buyer/seller-catalog/:seller_id', loginController.checkLoggedIn ,buyerController.getSellerCatalogue);
router.post('/buyer/create-order/:seller_id', loginController.checkLoggedIn , buyerController.createOrder);

 //seller api routes
router.get('/seller/orders', loginController.checkLoggedIn, sellerController.getOrderList);
router.post('/seller/create-catalog', loginController.checkLoggedIn, sellerController.createCatalogue);

export default router;
