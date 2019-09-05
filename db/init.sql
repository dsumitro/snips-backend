DROP TABLE IF EXISTS snippet;
CREATE TABLE snippet(
    id SERIAL PRIMARY KEY,
    code TEXT,
    title TEXT,
    description TEXT,
    favorites INT DEFAULT 0,
    language TEXT,
    author TEXT
);

-- seed with data

INSERT INTO snippet (code, title, descript, language, author)
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
        'Dean'
    );