DROP DATABASE IF EXISTS blog_db;

CREATE DATABASE blog_db;

\c blog_db

CREATE TABLE Categories (
    cat_id serial primary key,
    category_name varchar
);

CREATE TABLE Articles (
    id serial primary key,
    title varchar,
    img varchar,
    content text,
    category_id int not null,
    date_posted timestamp,
    foreign key(category_id) references Categories
);

CREATE TABLE admins (
    id serial primary key,
    username varchar,
    passwordKey varchar
);

INSERT INTO admins(username,passwordKey) 
VALUES
('YA7MO', md5('Yahya1234')); 

INSERT INTO Categories(category_name) 
VALUES 
('Technology'), 
('Design'), 
('Culture'), 
('Sports');

INSERT INTO 
Articles(title, content, category_id)
VALUES 
('How to strat a blog' , 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.' , 1),
('How to design a blog', 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.',2),
('Facts about korean bbq' , 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.',3),
('When is messi gonna stop impressing the world', 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis.',4);

-- ALTER TABLE Categories CHANGE id cat_id serial int primary key;