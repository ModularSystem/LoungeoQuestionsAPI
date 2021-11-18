\c qanda;
\COPY questions FROM './csv/questionsCSV.csv' WITH DELIMITER ',' CSV HEADER;
\COPY answers FROM './csv/answersCSV.csv' WITH DELIMITER ',' CSV HEADER;
\COPY answer_photos FROM './csv/answers_photosCSV.csv' WITH DELIMITER ',' CSV HEADER;


SELECT setval(pg_get_serial_sequence('questions', 'question_id'), (SELECT MAX(question_id) from "questions"));
SELECT setval(pg_get_serial_sequence('answers', 'answer_id'), (SELECT MAX(answer_id) from "answers"));
SELECT setval(pg_get_serial_sequence('answer_photos', 'photo_id'), (SELECT MAX(answer_id) from "answer_photos"));

-- INSERT INTO users(name, email) SELECT DISTINCT name, email FROM questions ;

-- INSERT INTO users(name, email) SELECT DISTINCT name, email FROM answers ;

-- ALTER TABLE questions ADD COLUMN user_id INT default null;

-- UPDATE questions(users)

-- ALTER questions DROP (ask, email)