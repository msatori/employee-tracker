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


const init = function () {
    inquirer.
        prompt([
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
            switch (answers) {
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
            if (error.isTtyError) {
                console.log(error)
            } else {
                if (err) throw new err
            }
        })
};

//create a function to find every employee
function findAllEmployees() {
    //call db query
    db.findAllEmployees()
        //place info
        .then(([rows]) => {
            let employees = rows;
            console.table(employees)
        })
        .then(() => init());
}

//function to view employees via departments
function viewEmployeeDepartments() {
    //call db query
    db.findAllDepartments()
        .then(([rows]) => {
            let depts = rows
            const allDepartments = depts.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            //create inquirer prompts for where to go from here
            inquirer.
                prompt([
                    {
                        type: 'list',
                        name: 'allDepartments',
                        choices: allDepartments
                    }
                ])

                .then(res => db.findAllDepartments(res.departmentId))
                .then(([rows]) => {
                    let employeesByDept = rows;
                    console.log("/n");
                    console.table(employeesByDept)
                })
                .then(() => init())

        });
}

//view employees according to their managers 
function viewEmployeeByManager() {
    db.viewAllEmployees()
    .then(([rows]) => {
        let managers = rows;
        const allManagers = managers.map(({ id, first_name, last_name, }) => ({
            name: `${first_name, last_name}`,
            value: id
        }))
    })
}