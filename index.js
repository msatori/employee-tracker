const db = require('./db');
const inquirer = require('inquirer');
const { updateEmployeeManager } = require('./db');
require('console.table'); 

const inqMessages = {
    viewAllEmployees: "View all Employees",
    viewAllDepartments: "View all Departments",
    viewByManager: "View employees by managers",
    addNewEmployee: "Add a new employee",
    updateEmployee: "Update a current employee",
    updateRole: "Update an employees role",
    updateManager: "Change an employees manager",
    viewAllRoles: "View all roles",
    exit: "Exit"
};


const init = function() {
    inquirer.
        prompt ([
            {
                type: "list",
                name: "mainQ",
                message: "What would you like to do?",
                choices: [
                    inqMessages.viewAllEmployees,
                    inqMessages.viewAllDepartments,
                    inqMessages.viewByManager,
                    inqMessages.addNewEmployee,
                    inqMessages.updateEmployee,
                    inqMessages.updateRole,
                    inqMessages.updateManager,
                    inqMessages.viewAllRoles,
                    inqMessages.exit
                ]
        }
    ])
    .then(answers => {
        switch(answers) {
            case viewAllEmployees: findAllEmployees();
            break;

            case viewAllDepartments: viewEmployeeDepartments();
            break;

            case viewByManager: viewEmployeeByManager();
            break;

            case addNewEmployee: createNewEmployee();
            break;

            case updateEmployee: updateCureentEmployee();
            break;

            case updateRole: updateEmployeeRole();
            break;

            case updateManager: updateEmployeeManager();
            break;

            case viewAllRoles: viewAllAvailableRoles();
            break;

            default: exitApp();

        }
    })
    .catch(error => {
        if(error.isTtyError) {
            console.log(error)
        } else {
            if (err) throw new err
        }
    })
};

function findAllEmployees() {
    db.findAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.table(employees)
    })
    .then(() => init());
}

function viewEmployeeDepartment() {

}