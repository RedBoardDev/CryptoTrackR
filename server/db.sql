CREATE DATABASE CryptoTrackR;

USE CryptoTrackR;

CREATE TABLE `users` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(255) UNIQUE NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `portfolios` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `icon` VARCHAR(255),
  `name` VARCHAR(255) NOT NULL,
  `type_id` INT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `portfolio_types` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `type` VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE `coins` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `symbol` VARCHAR(10) NOT NULL,
  `usdc_quote` FLOAT DEFAULT -1,
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `coin_pairs` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `base_coin_id` INT NOT NULL,
  `quote_coin_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `transactions` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `portfolio_id` INT NOT NULL,
  `type` ENUM ('buy', 'sell', 'transfer') NOT NULL,
  `coin_id` INT NOT NULL,
  `quantity` DECIMAL(20,6) NOT NULL,
  `price` DECIMAL(20,6) NOT NULL,
  `fees` DECIMAL(20,6),
  `notes` VARCHAR(255),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `ranges` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `portfolio_id` INT NOT NULL,
  `transaction_id` INT,
  `type` ENUM ('in', 'out') NOT NULL,
  `coin_pair_id` INT NOT NULL,
  `fees` DECIMAL(20,6),
  `pool_id` INT,
  `notes` VARCHAR(255),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `activity_logs` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `action` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);


ALTER TABLE `activity_logs` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `portfolios` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `coin_pairs` ADD FOREIGN KEY (`base_coin_id`) REFERENCES `coins` (`id`);

ALTER TABLE `coin_pairs` ADD FOREIGN KEY (`quote_coin_id`) REFERENCES `coins` (`id`);

ALTER TABLE `transactions` ADD FOREIGN KEY (`portfolio_id`) REFERENCES `portfolios` (`id`);

ALTER TABLE `transactions` ADD FOREIGN KEY (`coin_id`) REFERENCES `coins` (`id`);

ALTER TABLE `ranges` ADD FOREIGN KEY (`portfolio_id`) REFERENCES `portfolios` (`id`);

ALTER TABLE `ranges` ADD FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`);

ALTER TABLE `ranges` ADD FOREIGN KEY (`coin_pair_id`) REFERENCES `coin_pairs` (`id`);

ALTER TABLE `portfolios` ADD FOREIGN KEY (`type_id`) REFERENCES `portfolio_types` (`id`);


CREATE INDEX idx_user_id_on_portfolios ON portfolios(user_id);

CREATE INDEX idx_base_coin_id_on_coin_pairs ON coin_pairs(base_coin_id);

CREATE INDEX idx_quote_coin_id_on_coin_pairs ON coin_pairs(quote_coin_id);

CREATE INDEX idx_portfolio_id_on_transactions ON transactions(portfolio_id);

CREATE INDEX idx_coin_id_on_transactions ON transactions(coin_id);

CREATE INDEX idx_portfolio_id_on_ranges ON ranges(portfolio_id);

CREATE INDEX idx_transaction_id_on_ranges ON ranges(transaction_id);

CREATE INDEX idx_coin_pair_id_on_ranges ON ranges(coin_pair_id);

CREATE INDEX idx_user_id_on_activity_logs ON activity_logs(user_id);
