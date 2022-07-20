import query from "./db.js";
import bcrypt from "bcryptjs";

async function register(userData) {
  const queryString = `INSERT INTO users 
  (username, password, user_type, first_name) VALUES ('${userData.email}', '${
    userData.password
  }', '${userData.userType ? userData.userType : "buyer"}', '${
    userData.firstName
  }')`;
  console.log(queryString);
  const result = await query(queryString);
  console.log(result);
  let message = "Error in creating user";

  if (result.affectedRows) {
    message = "User created successfully";
  }
  if (userData.userType === "seller") {
    let sellerData = userData;
    sellerData.userId = result.insertId;
    createSeller(sellerData);
  }
  return { message };
}
async function createSeller(sellerData) {
  const queryString = `INSERT INTO sellers 
  (user_id,shop_name ) VALUES ('${sellerData.userId}', '${sellerData.shopName}')`;
  console.log(queryString);
  const result = await query(queryString);
}

async function createCatalogue(sellerData) {
  const catalogueString = sellerData.catalogue
    .map(function (item) {
      return "'" + item.item_name + "','" + item.price + "','" + sellerData.sellerId +"'";
    })
    .join("),(");
  let valueString = "(" + catalogueString + ")";

  const queryString = `INSERT INTO items (name, price, seller_id ) VALUES ${valueString}`;
  console.log(queryString);
  const result = await query(queryString);
  let message = "Error creating catalogue";
  if (result.affectedRows) {
    message = "Catalogue created successfully";
  }
  return { message };
}

async function findUserByEmail(email) {
  const queryString = `SELECT * FROM  users WHERE username= '${email}'`;
  const [user] = await query(queryString);
  return user;
}
async function comparePassword(user, password) {
  let isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  return isMatch;
}

async function findUserById(id) {
  const queryString = `SELECT u.id as id, s.id as sellerId , username, user_type, shop_name FROM  users u LEFT JOIN sellers s  ON s.user_id  = u.id WHERE u.id= '${id}'`;
  const [user] = await query(queryString);
  return user;
}

async function getSellers(page = 1) {
  const rows = await query(`SELECT * FROM sellers`);
  const data = rows;
  return {
    data,
  };
}
async function getSellerCatalogue(sellerId) {
  const rows = await query(`SELECT * FROM items where seller_id='${sellerId}'`);
  const data = rows;
  return {
    data,
  };
}

export default {
  register,
  comparePassword,
  findUserByEmail,
  findUserById,
  getSellers,
  getSellerCatalogue,
  createCatalogue,
};
