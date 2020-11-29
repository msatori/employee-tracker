const connection = require('./db/connection');

//reference the connection 
class dataBase {
    constructor(connection) {
        this.connection = connection;
    }
}


//find all employees - join w/ roles, salaries, departments, and managers
function findAllEmployees () {
    return this.connection.promise().query(
        `SELECT employee.id, employee.first_name, roles.title, department.name, role.salary, CONCAT(manager.first_name, '', manager.last_name) AS manager
         FROM employee
         LEFT JOIN departments ON role.department.id = department.id 
         LEFT JOIN employee manager on manager.id = employee.manager_id;'
        `
    );
}




//create a new employee

//remove an employee using their id

//update the employees role

//update employees manager

//find all roles - join w/ depts

//create new role

//remove a role from the db

//find all departments

//create a new department 

//remove a department 

//find all employees in a single dept 

//find all employees by manager - join w/ depts and roles



connection.query('SELECT * FROM department', function(err, res) {
    console.log(res);

});