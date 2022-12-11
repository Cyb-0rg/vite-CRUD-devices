-- create the integrated database by simply executing this code on MySQL database

-- initailze database/SCHEMA
CREATE SCHEMA `devices` ;

-- add the table
CREATE TABLE `devices`.`devices_table` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `xcor` VARCHAR(45) NULL,
  `ycor` VARCHAR(45) NULL,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
  -- add instances
INSERT INTO `devices`.`devices_table` (`id`, `name`, `xcor`, `ycor`, `type`) VALUES ('7', 'device1', '1234', '23456', '4:3');
INSERT INTO `devices`.`devices_table` (`id`, `name`, `xcor`, `ycor`, `type`) VALUES ('8', 'device2', '45665', '475678', '16:9');

  
  
  