import mysql from "mysql2/promise";
import config from "../../config.js";

const connection = await mysql.createConnection(config.db);


// users table
connection.execute(
  "\
CREATE TABLE `" +
    config.db.database +
    "`.`" +
    "users" +
    "` ( \
    `id` BIGINT  NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(100) NOT NULL, \
    `password` VARCHAR(60) NOT NULL, \
    `user_type` ENUM(\'buyer\',\'seller\') NOT NULL DEFAULT \'buyer\', \
    `first_name` VARCHAR(100) NOT NULL, \
    `last_name` VARCHAR(100) DEFAULT NULL, \
    PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
)"
);

// sellers
connection.execute(
  "\
CREATE TABLE  `" +
    config.db.database +
    "`.`" +
    "sellers" +
    "` ( \
    `id` bigint NOT NULL AUTO_INCREMENT, \
    `user_id` bigint NOT NULL, \
    `shop_name` varchar(100) NOT NULL, \
    PRIMARY KEY (`id`), \
    KEY `sellers_FK` (`user_id`), \
    CONSTRAINT `sellers_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) \
)"
);

//items
connection.execute(
  "\
CREATE TABLE  `" +
    config.db.database +
    "`.`" +
    "items" +
    "` ( \
    `id` bigint NOT NULL AUTO_INCREMENT, \
    `name` varchar(100) NOT NULL, \
    `price` decimal(10,0) NOT NULL DEFAULT \'0\', \
    `seller_id` bigint DEFAULT NULL, \
    PRIMARY KEY (`id`), \
    KEY `items_FK` (`seller_id`), \
    CONSTRAINT `items_FK` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`id`) \
)"
);

//orders
connection.execute(
  "\
CREATE TABLE  `" +
    config.db.database +
    "`.`" +
    "orders" +
    "` ( \
    `id` bigint NOT NULL AUTO_INCREMENT, \
    `buyer_id` bigint NOT NULL, \
    `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \
    `seller_id` bigint NOT NULL, \
    PRIMARY KEY (`id`), \
    KEY `orders_FK` (`seller_id`), \
    CONSTRAINT `orders_FK` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`id`) \
    )"
);

//order_details
connection.execute(
  "\
CREATE TABLE `" +
    config.db.database +
    "`.`" +
    "order_details" +
    "` ( \
    `order_id` bigint NOT NULL, \
    `item_id` bigint NOT NULL, \
    `quantity` bigint NOT NULL \
)"
);
console.log("Success: Database Created!");

connection.end();
