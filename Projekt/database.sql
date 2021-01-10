-- SQLite
-- DROP TABLE IF EXISTS Games;

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    email varchar(32) UNIQUE NOT NULL,
    firstname varchar(32) NOT NULL,
    lastname varchar(32) NOT NULL,
    password varchar(150) NOT NULL,
    accountType INTEGER(3) NOT NULL,
    blocked INTEGER(3),
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL);

DROP TABLE IF EXISTS question;
CREATE TABLE IF NOT EXISTS question (
    title varchar(32) NOT NULL,
    questionText varchar(500) NOT NULL,
    category varchar(32) NOT NULL,
    date DATETIME,
    author varchar(32),
    duplicate INTEGER(3),
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL);


-- PRAGMA foreign_keys = ON;
DROP TABLE IF EXISTS answer;
CREATE TABLE IF NOT EXISTS answer (
    answerText varchar(500) NOT NULL,
    questId INTEGER(5) NOT NULL,
    date DATETIME,
    author varchar(32),
    rating varchar(3),
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL);

INSERT INTO users (email, firstname, lastname, password, accountType) VALUES
    ('h19linwe', 'Linus', 'Westerback', 'hej123', 2),
    ('h19kripa', 'kristoffer', 'Palmgren', 'då321', 0),
    ('h19simry', 'Simon', 'Rydvall', 're231', 1),
    ('h18votur', 'Volkan', 'Tûrrkan', 'n312', 0);

INSERT INTO question (title, questionText, category, date) VALUES
    ('fungerar', 'Fungerar detta som det ska?', 'fråga', DATETIME('now')),
    ('kanske', 'Fungerar det ska?', 'hej', DATETIME('now')),
    ('jag', 'Fungerar detta som det borde?', 'fråga', DATETIME('now'));

INSERT INTO answer (answerText, questId, date) VALUES
    ('Ja DEt fungerar', '1', DATETIME('now')),
    ('Det kanske fungerar', '2', DATETIME('now')),
    ('Du borde fungera', '3', DATETIME('now')),
    ('Du borde fungera', '3', DATETIME('now'))