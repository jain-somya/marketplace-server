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

async function createOrder(req, res, next) {
  try {
    if (req.user.user_type !== "buyer") {
      return res
        .status(401)
        .send("Unauthorised user! Only a buyer can create order");
    }
    const reqData = {};
    reqData.buyerId = req.user.id;
    reqData.sellerId = req.params.seller_id;
    reqData.orders = req.body;
    reqData.itemsIds = reqData.orders
      .map((order) => {
        return order.item_id;
      })
      .join();
      console.log(reqData)
    const itemsOfSeller = await userQueries.checkSellerItems(reqData.itemsIds, reqData.sellerId);
    if (!itemsOfSeller) {
      return res
        .status(400)
        .json("Check that items belong to seller specified");
    }
    const response = await userQueries.createFinalOrder(reqData);
    return res.status(200).json(response.message);
  } catch (err) {
    console.log(err);
    return next();
  }
}

export default { getAllSellers, getSellerCatalogue, createOrder };
