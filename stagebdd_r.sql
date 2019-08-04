-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 04, 2019 at 12:46 PM
-- Server version: 5.7.24
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stagebdd_r`
--

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(60) DEFAULT NULL,
  `prenom` varchar(60) DEFAULT NULL,
  `tel` varchar(60) DEFAULT NULL,
  `cin` int(8) NOT NULL,
  `solde` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `nom`, `prenom`, `tel`, `cin`, `solde`) VALUES
(2, 'Chorfan', 'Wael', '+21652236988', 88888888, 77),
(3, 'M.Davis', 'Casy', '5143509039', 77777777, 99);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
CREATE TABLE IF NOT EXISTS `location` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `datedeb` varchar(80) NOT NULL,
  `datefin` varchar(80) NOT NULL,
  `caution` int(10) NOT NULL,
  `prixtotal` int(10) NOT NULL,
  `idc` int(10) NOT NULL,
  `idv` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idc` (`idc`),
  KEY `idv` (`idv`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `datedeb`, `datefin`, `caution`, `prixtotal`, `idc`, `idv`) VALUES
(9, '2019-08-06', '2019-08-07', 8000, 800, 2, 7);

-- --------------------------------------------------------

--
-- Table structure for table `voiture`
--

DROP TABLE IF EXISTS `voiture`;
CREATE TABLE IF NOT EXISTS `voiture` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `matricule` varchar(80) NOT NULL,
  `marque` varchar(80) NOT NULL,
  `couleur` varchar(80) NOT NULL,
  `prixJour` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `voiture`
--

INSERT INTO `voiture` (`id`, `matricule`, `marque`, `couleur`, `prixJour`) VALUES
(7, '180TN5000', 'Renault Clio ', 'rouge', 300),
(8, '160TN4444', 'BMW M3 250D', 'rouge', 50);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `location`
--
ALTER TABLE `location`
  ADD CONSTRAINT `location_ibfk_1` FOREIGN KEY (`idc`) REFERENCES `client` (`id`),
  ADD CONSTRAINT `location_ibfk_2` FOREIGN KEY (`idv`) REFERENCES `voiture` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
