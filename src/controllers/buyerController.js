import userQueries from "../models/userQuery.js";
async function getAllSellers(req, res, next) {
  try {
    res.json(await userQueries.getSellers(req.query.page));
  } catch (err) {
    console.log(err);
    return next();
  }
}

async function getSellerCatalogue(req, res, next) {
  try {
    console.log("user", req.user);
    res.json(await userQueries.getSellerCatalogue(req.params.seller_id));
  } catch (err) {
    console.log(err);
    return next();
  }
}

export default { getAllSellers, getSellerCatalogue };
