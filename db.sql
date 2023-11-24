CREATE database budget_app;

use budget_app;

CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) DEFAULT NULL,
  `middleName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `passwordHash` varchar(32) NOT NULL,
  `registeredAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastLogin` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1000059 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `budget_category` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `userId` bigint NOT NULL,
    `limit` bigint NOT NULL,
     PRIMARY KEY `budget_category_id` (`id`),
     UNIQUE KEY `uq_username` (`name`, `userId`),
     CONSTRAINT `budget_category1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
)

CREATE TABLE `budget_spending` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `amount` int NOT NULL,
  `userId` bigint NOT NULL,
  `categoryId` bigint NOT NULL,
  `month` varchar(50) NOT NULL,
  `year` varchar(50) NOT NULL,
  `createdAT` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `budget_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `budget_limit_1` FOREIGN KEY (`categoryId`) REFERENCES `budget_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000059 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
