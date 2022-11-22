CREATE DATABASE pern;

-- a table must be inside a DATABASE
CREATE table todo(
    todo_id serial primary key,
    description varchar(255)
);

CREATE table users(
    id serial primary key,
    email varchar(255),
    hashedPW varchar(255)
);