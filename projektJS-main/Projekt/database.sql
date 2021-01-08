-- SQLite
-- DROP TABLE IF EXISTS Games;

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    email varchar(32) UNIQUE NOT NULL,
    firstname varchar(32) NOT NULL,
    lastname varchar(32) NOT NULL,
    password varchar(150) NOT NULL,
    accountType INTEGER(3) NOT NULL,
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL);

DROP TABLE IF EXISTS question;
CREATE TABLE IF NOT EXISTS question (
    title varchar(32) NOT NULL,
    questionText varchar(500) NOT NULL,
    category varchar(32) NOT NULL,
    date DATETIME(150),
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL);

DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS contributer;

-- PRAGMA foreign_keys = ON;
DROP TABLE IF EXISTS answer;
CREATE TABLE IF NOT EXISTS answer (
    answerText varchar(500) NOT NULL,
    questId INTEGER(5) NOT NULL,
    -- FOREIGN KEY(questId) REFERENCES question(id),
    date DATETIME(150),
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL);

INSERT INTO users (email, firstname, lastname, password, accountType) VALUES
    ('h19linwe', 'Linus', 'Westerback', 'hej123', 2),
    ('h19kripa', 'kristoffer', 'Palmgren', 'då321', 0),
    ('h19simry', 'Simon', 'Rydvall', 're231', 1),
    ('h18votur', 'Volkan', 'Tûrrkan', 'n312', 0);

INSERT INTO question (title, questionText, category) VALUES
    ('fungerar', 'Fungerar detta som det ska?', 'fråga'),
    ('kanske', 'Fungerar det ska?', 'hej'),
    ('jag', 'Fungerar detta som det borde?', 'fråga');

INSERT INTO answer (answerText, questId) VALUES
    ('Ja DEt fungerar', '1'),
    ('Det kanske fungerar', '2'),
    ('Du borde fungera', '3'),
    ('Du borde fungera', '3')