/* psql -U postgres < server/db/schema.sql  THIS ONE!!!*/
DROP DATABASE IF EXISTS qanda;
CREATE DATABASE qanda;
\c qanda;
DROP TABLE IF EXISTS answer_photos;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
  user_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  email VARCHAR(50) NOT NULL unique,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE questions (
  question_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  product_id INT NOT NULL,
  question_body VARCHAR(1000) NOT NULL,
  question_date BIGINT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  reported INT NOT NULL DEFAULT 0,
  question_helpfulness smallint DEFAULT 0
  -- user_id INT default null
  -- FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
CREATE TABLE answers (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  question_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date BIGINT,
  answerer_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  -- user_id INT NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  helpfulness smallint DEFAULT 0,
  FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
  -- FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
CREATE TABLE answer_photos (
  photo_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  answer_id INT NOT NULL,
  url VARCHAR(500) NOT NULL,
  FOREIGN KEY (answer_id) REFERENCES answers(id) ON DELETE CASCADE
);






