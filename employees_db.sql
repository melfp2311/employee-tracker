DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments(
    id INTEGER (200) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    department_name VARCHAR (200) NOT NULL
);

CREATE TABLE roles(
	id INTEGER (200) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR (200) NOT NULL,
	salary DECIMAL (65) NOT NULL,
	department_id INTEGER(200),
    CONSTRAINT FOREIGN KEY (department_id) REFERENCES departments (id)
);

CREATE TABLE employees(
	employee_id INTEGER (200) AUTO_INCREMENT NOT NULL PRIMARY KEY,
	first_name VARCHAR (200) NOT NULL,
    last_name VARCHAR (200) NOT NULL,
    role_id INTEGER (200),
    manager_id INTEGER (200),
    CONSTRAINT FOREIGN KEY (role_id) REFERENCES roles (id) 
);

INSERT INTO departments (department_name)
VALUES ("Sales"),("Engineering"),("Finance"),("Legal");

INSERT INTO roles(department_id, title, salary)
VALUES (1, "Sales Lead", 30000), (1, "Sales Person", 10000), (1, "Sales Manager", 18000),
(2, "Lead Engineer", 10000), (2, "Software Engineer", 15000), 
(3, "Accountant", 8000), 
(4, "Legal Team Lead", 10000), (4, "Lawyer", 8000);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("Aaron", "Redding", 1, 3), ("Linda", "Ruiz", 2, 3), ("Rocio", "Rodriguez", 3, null), 
("Arturo", "Camargo", 4, 3), ("Tom", "Dunlap", 5, null), 
("Andres", "Osorio", 6, null),
("Shelly", "Payoff", 7, null), ("Tati", "Uisim", 8, 7);

SELECT *
FROM employees;

SELECT employee_id, first_name, last_name, title, department, salary, manager_id
FROM employees;


SELECT *
FROM departments;

SELECT *
FROM roles;

SELECT *
FROM employees;