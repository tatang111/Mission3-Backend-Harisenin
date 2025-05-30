-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2025 at 01:32 PM
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
-- Database: `chill_movie`
--

-- --------------------------------------------------------

--
-- Table structure for table `casters`
--

CREATE TABLE `casters` (
  `caster` varchar(250) DEFAULT NULL,
  `movie_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `casters`
--

INSERT INTO `casters` (`caster`, `movie_id`) VALUES
('Laura Miles', 1),
('Derek Vance', 1),
('Anna Cole', 1),
('Mark Hayes', 2),
('Clara Finn', 2),
('Oliver Drake', 3),
('Liam Parker', 3),
('Sasha Reed', 4),
('Yanto Finn', 4),
('Amelia Stone', 4),
('Mirwan', 5),
('Rudi', 5);

-- --------------------------------------------------------

--
-- Table structure for table `daftar_saya`
--

CREATE TABLE `daftar_saya` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `movie_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `filmmakers`
--

CREATE TABLE `filmmakers` (
  `filmmaker` varchar(250) DEFAULT NULL,
  `movie_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `filmmakers`
--

INSERT INTO `filmmakers` (`filmmaker`, `movie_id`) VALUES
('Harvey Kent', 1),
('Melissa Ford', 1),
('Tina Andrews', 2),
('Harvey Kent', 2),
('Rachel King', 2),
('Edward Lane', 3),
('Samantha Blair', 3),
('Timothy Adams', 3),
('Frank Benson', 4),
('Ben Foster', 4),
('Faqih', 5),
('Tatang', 5);

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `genre` varchar(50) DEFAULT NULL,
  `movie_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`genre`, `movie_id`) VALUES
('Comedy', 1),
('Petualang', 1),
('Aksi', 1),
('Thriller', 2),
('Comedy', 2),
('Drama', 2),
('Aksi', 3),
('Petualang', 3),
('Perang', 3),
('Misteri', 4),
('Thriller', 4),
('Aksi', 4),
('Aksi', 5),
('Drama', 5),
('Thriller', 5);

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `episode_number` int(11) DEFAULT NULL,
  `release_date` int(11) DEFAULT NULL,
  `min_age` int(11) DEFAULT NULL,
  `image_url` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `title`, `video_url`, `duration`, `description`, `episode_number`, `release_date`, `min_age`, `image_url`) VALUES
(1, 'One piece', 'https://abc.com', 120, 'One Piece Film: Red follows the Straw Hat Pirates as they attend a concert by the mysterious diva Uta, whose enchanting voice hides a dark secret tied to Shanks, the legendary pirate', 1, 2024, 13, 'http://abc.com'),
(2, 'Shadow of Vengeance', 'https://abc.com', 130, 'A retired soldier seeks justice after his family is taken from him. He faces a dangerous underworld to uncover the truth.', 2, 2012, 13, 'http://abc.com'),
(3, 'Mystic Horizons', 'https://abc.com', 124, 'A young girl discovers a portal to another world filled with magic. She must navigate dangerous alliances to save her village.', 2, 2017, 13, 'http://abc.com'),
(4, 'Horimiya', 'https://abc.com', 120, 'One Piece Film: Red follows the Straw Hat Pirates as they attend a concert by the mysterious diva Uta, whose enchanting voice hides a dark secret tied to Shanks, the legendary pirate', 1, 2024, 13, 'http://abc.com'),
(5, 'Horimiya', 'https://abc.com', 120, 'One Piece Film: Red follows the Straw Hat Pirates as they attend a concert by the mysterious diva Uta, whose enchanting voice hides a dark secret tied to Shanks, the legendary pirate', 1, 2024, 13, 'http://abc.com');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `package_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `expired_at` datetime DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `paket_langganan`
--

CREATE TABLE `paket_langganan` (
  `id` int(11) NOT NULL,
  `paket_name` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `duration_days` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pembayaran`
--

CREATE TABLE `pembayaran` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `amount_method` varchar(50) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `paid_at` datetime DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `series_film`
--

CREATE TABLE `series_film` (
  `id` int(11) NOT NULL,
  `trending_movies` tinyint(1) DEFAULT NULL,
  `new_release` tinyint(1) DEFAULT NULL,
  `continue_watching` tinyint(1) DEFAULT NULL,
  `chill_offering` tinyint(1) DEFAULT NULL,
  `top_rating_movie` tinyint(1) DEFAULT NULL,
  `movie_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_subscribe` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `casters`
--
ALTER TABLE `casters`
  ADD KEY `movie_id` (`movie_id`);

--
-- Indexes for table `daftar_saya`
--
ALTER TABLE `daftar_saya`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- Indexes for table `filmmakers`
--
ALTER TABLE `filmmakers`
  ADD KEY `movie_id` (`movie_id`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD KEY `movie_id` (`movie_id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `package_id` (`package_id`);

--
-- Indexes for table `paket_langganan`
--
ALTER TABLE `paket_langganan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `series_film`
--
ALTER TABLE `series_film`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `daftar_saya`
--
ALTER TABLE `daftar_saya`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `paket_langganan`
--
ALTER TABLE `paket_langganan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `series_film`
--
ALTER TABLE `series_film`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `casters`
--
ALTER TABLE `casters`
  ADD CONSTRAINT `casters_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`);

--
-- Constraints for table `daftar_saya`
--
ALTER TABLE `daftar_saya`
  ADD CONSTRAINT `daftar_saya_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `daftar_saya_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`);

--
-- Constraints for table `filmmakers`
--
ALTER TABLE `filmmakers`
  ADD CONSTRAINT `filmmakers_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`);

--
-- Constraints for table `genres`
--
ALTER TABLE `genres`
  ADD CONSTRAINT `genres_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`);

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `paket_langganan` (`id`);

--
-- Constraints for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD CONSTRAINT `pembayaran_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`);

--
-- Constraints for table `series_film`
--
ALTER TABLE `series_film`
  ADD CONSTRAINT `series_film_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
