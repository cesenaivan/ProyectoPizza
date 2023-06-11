-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema proyecto2
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `proyecto2` ;

-- -----------------------------------------------------
-- Schema proyecto2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `proyecto2` DEFAULT CHARACTER SET utf8 ;
USE `proyecto2` ;

-- -----------------------------------------------------
-- Table `proyecto2`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyecto2`.`Users` (
  `id_nombre` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(250) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_nombre`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

delimiter $$
CREATE TRIGGER copia
AFTER INSERT ON Users
FOR EACH ROW
BEGIN
insert into copia_seguridad(email,fecha_registro)
values (new.email,fecha_registro);
END; 



CREATE TABLE IF NOT EXISTS `proyecto2`.`copia_seguridad` (
  `email` VARCHAR(250) NOT NULL,
  `fecha_registro` DATETIME,
  PRIMARY KEY (`email`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

select * from users;
select * from copia_seguridad;
