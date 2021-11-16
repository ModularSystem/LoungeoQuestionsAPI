
DROP DATABASE IF EXISTS qanda;
CREATE DATABASE qanda;
\c qanda;
/* psql -U postgres < server/db/schema.sql  THIS ONE!!!*/
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS answers;
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
CREATE TABLE answers (
  answer_id SERIAL PRIMARY KEY,
  body TEXT NOT NULL,
  date timestamp default current_timestamp,
  answerer_name TEXT NOT NULL,
  helpfulness smallint DEFAULT 0,
  question_id INT NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
);
CREATE TABLE photos (
  photo_id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  answer_id INT NOT NULL,
  FOREIGN KEY (answer_id) REFERENCES answers(answer_id) ON DELETE CASCADE
);
/* foreign keys for fake users for answerer/asker
 varchar ////   foreign key consideration //////texts */

 INSERT INTO questions( question_body, asker_name, product_id) VALUES ('what does it do?', 'bug', 1);

 INSERT INTO answers( body, answerer_name, question_id) VALUES ('it works', 'a differen bug', 1)