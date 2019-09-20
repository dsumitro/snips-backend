DROP TABLE IF EXISTS snippet;
DROP TABLE IF EXISTS author;
---
CREATE TABLE author (name TEXT PRIMARY KEY, password TEXT);
CREATE TABLE snippet(
  id SERIAL PRIMARY KEY,
  code TEXT,
  title TEXT,
  description TEXT,
  favorites INT DEFAULT 0,
  language TEXT,
  author TEXT REFERENCES author -- establishes snippet-author relationship
);
-- seed with data
INSERT INTO
  author(name, password)
VALUES
  ('Dandy', 'dean123'),
  ('Scott', 'password');
INSERT INTO
  snippet (code, title, description, language, author)
VALUES
  (
    'const america = 1776',
    'freedom',
    'I declared a constitution',
    'JavaSCript',
    'Dandy'
  ),
  (
    'CJ is my brother',
    'Family declaration',
    'CJ agrees',
    'Norwesian',
    'Scott'
  );