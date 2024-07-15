-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema realestate
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema realestate
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `realestate` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `realestate` ;

-- -----------------------------------------------------
-- Table `realestate`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `realestate`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `phone_number` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`iduser`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `realestate`.`houses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `realestate`.`houses` (
  `idhouses` INT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(45) NULL DEFAULT NULL,
  `price` VARCHAR(45) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `contact_info` VARCHAR(45) NULL DEFAULT NULL,
  `status` ENUM('pending', 'approved', 'declined') NULL DEFAULT 'pending',
  `notification` VARCHAR(45) NULL DEFAULT NULL,
  `location`  VARCHAR(100) NULL DEFAULT 'Ariana',
  `subLocation`  VARCHAR(100) NULL DEFAULT 'Ariana Essoughra',
  `condition`  VARCHAR(100) NULL DEFAULT 'New',
   `map` JSON NULL DEFAULT NULL,
  `iduser` INT NULL DEFAULT NULL,
  `images` JSON NULL DEFAULT NULL,
  `operation` ENUM('rent', 'sale') NOT NULL DEFAULT 'rent',
  PRIMARY KEY (`idhouses`),
  INDEX `fk_user` (`iduser` ASC) VISIBLE,
  CONSTRAINT `fk_user`
    FOREIGN KEY (`iduser`)
    REFERENCES `realestate`.`user` (`iduser`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



-- Insert data into `user` table
INSERT INTO user (iduser, username, password, email, phone_number)
VALUES (1, 'john_doe', 'password123', 'john@example.com', 111-222-3333 );

INSERT INTO user (iduser, username, password, email, phone_number)
VALUES (2, 'jane_smith', 'securepass', 'jane@example.com', 34 454 214);

INSERT INTO user (iduser, username, password, email, phone_number)
VALUES (3, 'alice_jones', 'alicepassword', 'alice@example.com', 67 321 684);

INSERT INTO user (iduser, username, password, email, phone_number)
VALUES (4, 'john_doe', 'password123', 'john@example.com', '123-456-7890');

INSERT INTO user (iduser, username, password, email, phone_number)
VALUES (5, 'jane_smith', 'securepass', 'jane@example.com', '098-765-4321');

INSERT INTO user (iduser, username, password, email, phone_number)
VALUES (6, 'alice_jones', 'alicepassword', 'alice@example.com', '555-123-4567');


-- Insert data into `houses` table

INSERT INTO houses (address, price, description, contact_info, status, notification, category, iduser, images)
VALUES (
  '123 Maple St',
  '250000',
  '3 bed, 2 bath house',
  'contact@example.com',
  'pending',
  'N/A',
  'Residential',
  1,
  '["https://newhomes-nz.s3.ap-southeast-2.amazonaws.com/public/files/79b230a5e9eaffa35014d9972e17edcb.jpeg", "https://th.bing.com/th/id/OIP.Mwnxp62F4kjTUrv7nKcdtAHaEL?w=600&h=338&rs=1&pid=ImgDetMain"]'
);

INSERT INTO houses (address, price, description, contact_info, status, notification, category, iduser, images)
VALUES (
  '456 Oak Ave',
  '300000',
  '4 bed, 3 bath house',
  'contact2@example.com',
  'approved',
  'N/A',
  'Residential',
  5,
  '["https://th.bing.com/th/id/OIP.WEeTNsgeuPwdrw5lbyT9yQHaE8?w=600&h=400&rs=1&pid=ImgDetMain", "https://th.bing.com/th/id/OIP.WEeTNsgeuPwdrw5lbyT9yQHaE8?w=600&h=400&rs=1&pid=ImgDetMain"]'
);

INSERT INTO houses (address, price, description, contact_info, status, notification, category, iduser, images)
VALUES (
  '789 Pine Rd',
  '200000',
  '2 bed, 1 bath house',
  'contact3@example.com',
  'declined',
  'N/A',
  'house',
  1,
  '["https://example.com/image5.jpg", "https://example.com/image6.jpg"]'
);

INSERT INTO houses (address, price, description, contact_info, status, notification, category, iduser, images)
VALUES ('101 Birch Blvd','350000','5 bed, 4 bath house','contact4@example.com','approved','N/A','house',6,
  '["https://th.bing.com/th/id/OIP.qOhLUJ0bLLTCEk0aOI5IPwHaFj?rs=1&pid=ImgDetMain", "https://www.homestratosphere.com/wp-content/uploads/2015/08/27-home-exteriors-870x869.jpg"]'
);

