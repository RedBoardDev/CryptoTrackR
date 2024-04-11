CREATE DATABASE CryptoTrackR;

USE CryptoTrackR;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE portfolios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  icon VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  type ENUM('transactions', 'wallet', 'pool'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE coins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  symbol VARCHAR(10) NOT NULL
);

CREATE TABLE coin_pairs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  base_coin_id INT NOT NULL,
  quote_coin_id INT NOT NULL,
  FOREIGN KEY (base_coin_id) REFERENCES coins(id),
  FOREIGN KEY (quote_coin_id) REFERENCES coins(id)
);

CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  portfolio_id INT NOT NULL,
  type ENUM('buy', 'sell', 'transfer') NOT NULL,
  coin_id INT NOT NULL,
  quantity DECIMAL(20, 6) NOT NULL,
  price DECIMAL(20, 6) NOT NULL,
  fees DECIMAL(20, 6),
  notes VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (portfolio_id) REFERENCES portfolios(id),
  FOREIGN KEY (coin_id) REFERENCES coins(id)
);

CREATE TABLE ranges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  portfolio_id INT NOT NULL,
  transaction_id INT,
  type ENUM('in', 'out') NOT NULL,
  coin_pair_id INT NOT NULL,
  fees DECIMAL(20, 6),
  pool_id INT,
  notes VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (portfolio_id) REFERENCES portfolios(id),
  FOREIGN KEY (transaction_id) REFERENCES transactions(id),
  FOREIGN KEY (coin_pair_id) REFERENCES coin_pairs(id)
);
