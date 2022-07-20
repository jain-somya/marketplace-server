import userQueries from "../models/userQuery.js";

async function createCatalogue(req, res, next) {
  try {
    const reqData = {};
    console.log('user',req.user)
    reqData.catalogue = req.body;
    if (req.user.user_type !== "seller") {
      return res
        .status(401)
        .send("Unauthorised user! Only a seller can add items to catalogue.");
    }
    reqData.sellerId = req.user.sellerId;
    const response = await userQueries.createCatalogue(reqData);
    // catalogue:[{item name, price}, {item name, price}]
    return res.status(200).json(response.message);
  } catch (err) {
    console.log(err);
    return next();
  }
}

async function getOrderList(req, res, next) {
  try {
    res.json(await userQueries.getOrderList(req.user.sellerId));
  } catch (err) {
    console.log(err);
    return next();
  }
}
export default { createCatalogue, getOrderList };
