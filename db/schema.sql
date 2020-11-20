CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    --foreign key for role id
    --foreign key for manager id
)

-- CREATE TABLE role (
--     title VARCHAR(30),
--     salary 
--     fk for department_id
-- )

 CREATE TABLE department (
   name VARCHAR(30)
 );