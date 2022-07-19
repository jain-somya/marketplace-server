import query from "./db.js";

async function getUsers(page = 1) {
  const rows = await query(
    `SELECT * FROM users`
  );
  const data = rows;
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function createUser(userData) {
  const queryString = `INSERT INTO users 
  (username, password, user_type) VALUES ('${userData.username}', '${
    userData.password
  }', '${userData.user_type ? userData.user_type : "buyer"}')`;
  console.log(queryString);
  const result = await query(queryString);

  let message = "Error in creating user";

  if (result.affectedRows) {
    message = "User created successfully";
  }

  return { message };
}

export default { createUser, getUsers };
