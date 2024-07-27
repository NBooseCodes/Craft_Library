
-- CS 361, Summer 2024

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- 
-- TABLE CREATION BELOW
-- 

-- Creates table that contains list of user data
CREATE OR REPLACE TABLE `UserInfo` (
    `userID` int(11) AUTO_INCREMENT,
    `firstName` varchar(50) NOT NULL,
    `lastName` varchar(50) NOT NULL,
    `username` varchar(50) NOT NULL,
    `password` varchar(100) NOT NULL,
    UNIQUE (`username`),
    UNIQUE (`password`),
    PRIMARY KEY (`userID`)
);

-- Creates Alcohols table that stores information different types of alcohol.
CREATE OR REPLACE TABLE `Yarn` (
    `yarnID` int(11) AUTO_INCREMENT,
	`yarnBrand` varchar(255) NOT NULL,
    `yarnFiber` varchar(255),
    `yarnWeight` int(11) NOT NULL,
    `yarnColorFamily` varchar(255) NOT NULL,
    `yarnColorName` varchar(255),
    `inventory` int(11),
    PRIMARY KEY (`yarnID`)
);

INSERT INTO `UserInfo` (`firstName`, `lastName`, `username`, `password`)
VALUES ('Nicole', 'McCune', 'NMccune', 'password'), ('Jane', 'Doe', 'JDoe78', 'abc123');

INSERT INTO `Yarn` (`yarnBrand`, `yarnWeight`, `yarnFiber`, `yarnWeight`, `yarnColor`, `inventory`)
VALUES ('Lion Brand', 'Wool', 'Worsted', 'Red', 'Cranberry'), 
('Red Heart Super Saver', 'Acrylic', 'Worsted', 'Yellow', 'Bright Yellow'),
('Red Heart Super Saver', 'Acrylic', 'Worsted', 'Purple', 'Medium Purple'),
("Aunt Lydia's", 'Cotton', 'Lace', 'Orange', 'Pumpkin');