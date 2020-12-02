const connection = require('./connection');

//reference the connection 
class dataBase {
    constructor(connection) {
        this.connection = connection;
    }

    //find all employees - join w/ roles, salaries, departments, and managers
    findAllEmployees() {
        return this.connection.promise().query(
            `SELECT employee.id, employee.first_name, roles.title, department.name, role.salary, CONCAT(manager.first_name, '', manager.last_name) AS manager
            FROM employee
            LEFT JOIN departments ON role.department.id = department.id 
            LEFT JOIN employee manager on manager.id = employee.manager_id;'
            `
        );
    }

    //create a new employee
    createNewEmployee(employee) {
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


    //create new role
    createRole(role) {
        return this.connection.promise().query(
            `INSERT INTO role SET ?`,
            role
        );
    }


    //find all roles - join w/ depts
    findAllRoles() {
        return this.connection.promise().query(
            `SELECT role.id, role.title, deparment.name AS department, role.salary FROM role LEFT JOIN department from role.department_id = department.id;`
        );
    }

    //remove a role from the db
    deleteRole(roleId) {
        return this.connection.promise().query(
            `DELETE FROM role WHERE id = ?`,
            roleId
        );
    }

    //find all departments
    findAllDepartments() {
        return this.connection.promise().query(
            `SELECT department.id, department.name FROM department;`
        );
    }

    //create a new department 
    createDepartment(department) {
        return this.connection.promise().query(
            `INSERT INTO department SET ? `,
            department
        );
    }
    //remove a department 
    deleteDepartment(departmentId) {
        return this.connection.promise().query(
            `DELETE FROM department WHERE id = ?`,
            departmentId
        )
    }

    //find all employees in a single dept 
    findEmployeeByDepartment(departmentId) {
        return this.connection.promise().query(
            `SELECT employee.id, employee.first_name, department.name 
            AS department, role.title
            FROM employee 
            LEFT JOIN role on employee.role_id 
            LEFT JOIN department on role.department
     `
        );
    }

    //find all employees by manager - join w/ depts and roles
    findAllEmployeesByManager(managerId) {
        return this.connection.promise().query(
            `SELECT employee.id, employee.first_name, department.name
             AS department, role.title 
             FROM employee
             LEFT JOIN role on role.id = employee.role_id
             LEFT JOIN department 
             ON department.id = role.department_id 
             WHERE manager_id = ?;`,
            managerId
        );
    }
}

module.exports = new dataBase(connection);