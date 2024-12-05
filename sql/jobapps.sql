CREATE DATABASE pearup;

USE pearup;
DROP TABLE IF EXISTS jobapps;


CREATE TABLE jobapps (
	
    id INT PRIMARY KEY AUTO_INCREMENT,
    fname VARCHAR(255),
    lname VARCHAR(255),
    company VARCHAR(255),
    email VARCHAR(255),
    fields VARCHAR(255),
    link varchar(255),
    message VARCHAR(1999),
    entryDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
);

INSERT INTO jobapps (
    fname,
    lname,
    company,
    email,
    fields,
    link,
    message
)
VALUES (
    'Liban',
    'Britt',
    'TekCare',
    'liban3378@gmail.com',
    'Software Dev',
    'www.com',
    'I love this job'
);

SELECT * FROM pearup;


SELECT * FROM jobapps;