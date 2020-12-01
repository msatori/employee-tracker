const connection = require('./connection');

//reference the connection 
class dataBase {
    constructor(connection) {
        this.connection = connection;
    }



//find all employees - join w/ roles, salaries, departments, and managers
findAllEmployees () {
    return this.connection.promise().query(
        `SELECT employee.id, employee.first_name, roles.title, department.name, role.salary, CONCAT(manager.first_name, '', manager.last_name) AS manager
         FROM employee
         LEFT JOIN departments ON role.department.id = department.id 
         LEFT JOIN employee manager on manager.id = employee.manager_id;'
        `
    );
}

//create a new employee
makeNewEmployee(employee) {
    return this.connection.promise().query(
        `UPDATE TABLE employee SET ?;`,
         employee
    );
}
//remove an employee using their id
deleteEmployee(employeeId) {
    return this.connection.promise().query(
        `DELETE FROM employee WHERE id=?;`,
        employeeId
    );
}

//update the employees role
updateEmployeeRole(employeeId, roleId) {
    return this.connection.promise().query(
        `UPDATE TABLE employee SET role where id = ?;`,
        [roleId, employeeId]
    );
}

//update employees manager
updateEmployeeManager(employeeId, managerId) {
    return this.connection.promise().query(
        `UPDATE employee SET manager_id WHERE id =?;`,
        [managerId, employeeId]
    );
}

//find all roles - join w/ depts
findAllRoles() {
   return this.connection.promise().query(
       `SELECT role.id, role.title, deparment.name AS department, role.salary FROM role LEFT JOIN department from role.department_id = department.id;`
   )
}

//create new role

//remove a role from the db

//find all departments

//create a new department 

//remove a department 

//find all employees in a single dept 

//find all employees by manager - join w/ depts and roles

}

connection.query('SELECT * FROM department', function(err, res) {
    console.log(res);

});