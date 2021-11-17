\c qanda;
\COPY questions FROM './csv/questionsCSV.csv' WITH DELIMITER ',' CSV HEADER;
\COPY answers FROM './csv/answersCSV.csv' WITH DELIMITER ',' CSV HEADER;
\COPY answer_photos FROM './csv/answers_photosCSV.csv' WITH DELIMITER ',' CSV HEADER;



-- INSERT INTO users(name, email) SELECT DISTINCT name, email FROM questions ;

-- INSERT INTO users(name, email) SELECT DISTINCT name, email FROM answers ;

-- ALTER TABLE questions ADD COLUMN user_id INT default null;

-- UPDATE questions(users)

-- ALTER questions DROP (ask, email)