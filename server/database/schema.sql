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
  `address` VARCHAR(100) NULL DEFAULT NULL,
  `size` INT NULL,
  `price` INT NULL,
  `category` ENUM('apartment', 'house', 'office', 'studio', 'penthouse') NULL DEFAULT NULL,
  `title` VARCHAR(100) NULL DEFAULT NULL,
  `favourite` BOOLEAN NULL,
  `description` TEXT NULL DEFAULT NULL,
  `images` JSON NULL DEFAULT NULL,
  `operation` ENUM('rent', 'sale') NOT NULL DEFAULT 'rent',
  `date_of_creation` DATE NULL DEFAULT NULL,
  `rooms` INT NULL,
  `bathrooms` INT NULL,
  `visits` JSON NULL DEFAULT NULL,
  `amenities` JSON NULL DEFAULT NULL,
  `contact_info` VARCHAR(45) NULL DEFAULT NULL,
  `status` ENUM('pending', 'approved', 'declined') NULL DEFAULT 'pending',
  `notification` VARCHAR(45) NULL DEFAULT NULL,
  `iduser` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idhouses`),
  INDEX `fk_user` (`iduser` ASC) VISIBLE,
  CONSTRAINT `fk_user`
    FOREIGN KEY (`iduser`)
    REFERENCES `user` (`iduser`)
)
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


-- Insert data into `houses` table
INSERT INTO `houses` 
(`address`, `size`, `category`, `title`, `favourite`,
 `description`, `images`, `operation`,
  `date_of_creation`, `rooms`, `bathrooms`,
   `visits`, `amenities`, `contact_info`, `status`, `iduser`)
VALUES
  ('123 Maple St', 150, 'house', 'Cozy Family Home',
   true, 'A beautiful home perfect for families.', '["https://example.com/image1.jpg", "https://example.com/image2.jpg"]', 
   'sale', '2024-07-09', 3, 2, 
   '{"dates": ["2024-07-01", "2024-07-05"]}',
    '{"parking": true, "ac": true, "furnished": false, "pool": false, "microwave": true, "near_subway": false, "beach_view": false, "alarm": true, "garden": true}', 
    'contact@example.com', 'pending', 1),
  ('456 Oak Ave', 200, 'house', 'Modern Family Home', false,
   'A spacious modern home with great amenities.', '["https://example.com/image3.jpg", "https://example.com/image4.jpg"]', 
   'rent', '2024-07-09', 4, 3, '{"dates": ["2024-06-30", "2024-07-03", "2024-07-07"]}',
    '{"parking": true, "ac": true, "furnished": true, "pool": false, "microwave": true,
     "near_subway": true, "beach_view": false, "alarm": false, "garden": true}', 
     'contact@example.com', 'approved', 2);
