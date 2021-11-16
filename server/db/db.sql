DROP DATABASE IF EXISTS qanda;
CREATE DATABASE qanda;
USE qanda;
DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
  question_id SERIAL PRIMARY KEY,
  question_body TEXT NOT NULL,
  question_date timestamp default current_timestamp,
  asker_name TEXT NOT NULL,
  question_helpfulness smallint DEFAULT 0,
  reported BOOLEAN NOT NULL DEFAULT false,
  product_id INT NOT NULL
);
DROP TABLE IF EXISTS answers;
CREATE TABLE answers (
  answer_id SERIAL PRIMARY KEY,
  body TEXT NOT NULL,
  date timestamp default current_timestamp,
  answerer_name TEXT NOT NULL,
  helpfulness smallint DEFAULT 0,
  question_id INT NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  FOREIGN KEY (question_id) REFERENCES questions(question_id)
);
DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
  photo_id SERIAL PRIMARY KEY,
  url: TEXT NOT NULL,
  answer_id INT NOT NULL,
  FOREIGN KEY (answer_id) REFERENCES qustions(answer_id)
)