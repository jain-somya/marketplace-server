How to use the project locally:

- Clone the respository
- cd into the repository and install dependencies by : npm i
- Create a local mysql database (add this database name in the config file in next step)
- Add Database configs to config.js file
- Create tables by running the command : node ./src/scripts/createDatabase.js
- To start the project, use this command : npm start

Now your project is ready to use the following apis:

APIs

- Auth APIs

- [x] POST /api/auth/register : Register a user (accept username, password, type of user - buyer/seller)
      Register Buyer :
      {"email":"buyer3@abc.com","password":"122233","firstName":"test2"}

  Register Seller format:
  {"email":"seller3@abc.com","password":"122233","firstName":"test2", "userType":"seller" , "shopName": "General Store2"}

- [x] POST /api/auth/login : Let a previously registered user log in (e.g. retrieve authentication token)
      Login data format:
      {"email":"seller2@gmail.com", "password":"122233"}

- APIs for buyers

- [x] GET /api/buyer/list-of-sellers : Get a list of all sellers
- [x] GET /api/buyer/seller-catalog/:seller_id : Get the catalog of a seller by seller_id
- [x] POST /api/buyer/create-order/:seller_id : Send a list of items to create an order for seller with id = seller_id
      Create order data format:
      [{"item_id":1, "quantity":2}, {"item_id":2,"quantity":4}]

- APIs for sellers

- [x] POST /api/seller/create-catalog : Send a list of items to create a catalog for a seller
      Catalog Format: 
      [{"item_name":"item10", "price" : 20},
      {"item_name":"item11", "price" : 22},
      {"item_name":"item12", "price" : 23}]
- [x] GET /api/seller/orders : Retrieve the list of orders received by a seller
