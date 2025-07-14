-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 14, 2025 at 04:21 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ml-models`
--

-- --------------------------------------------------------

--
-- Table structure for table `model`
--

CREATE TABLE `model` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `model`
--

INSERT INTO `model` (`id`, `name`, `type`, `description`) VALUES
(1, 'XGBoost', 'Regression ', 'Es un modelo para la prediccion de series temporales univariada'),
(5, 'Rnadm Forest', 'regressio', 'adadadas');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `name`, `email`, `password`, `rol`) VALUES
(1, 'ALEX ESTRADA SOLO NAME??', 'ale@gmail.com', '12345', 'admin'),
(2, 'mirko', 'mirko@gmail.com', '12345\r\n', 'user'),
(5, 'a', 'a@gmail.com', '$2b$10$o98RWckL9sUxFh74OA.IX.l6JeS8vZEoLonop8mrf1J6yuOuUSkx6', 'user'),
(6, 'alex', 'alex@gmail.com', '$2b$10$FIEbUblci7VhtOs1S4aZeuw.Pj2ASkPlTyghfQwrnXt5E1qxNZ/dy', 'admin'),
(7, 'alex ', 'alex1@gmail.com', '$2b$10$BkVWwi/1bKian7xTLJBhluauAyt7iomUTSx6KETv4yVD.JK1aHtd6', 'user'),
(8, 'juan', 'juan@gmail.com', '123', 'user'),
(9, 'juan', 'juan33@gmail.com', '$2b$10$nIyW9LjEmZbs6PFZSXe.p.0xzbBmQ3MLVM5kkCGkwQxNluwU0a.DS', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `model`
--
ALTER TABLE `model`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_446adfc18b35418aac32ae0b7b` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `model`
--
ALTER TABLE `model`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
