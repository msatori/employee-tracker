const db = require('./db/index');
const inquirer = require('inquirer');
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



function loadApp() {
    init();
}

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
                case inqMessages.viewAllEmployees: findAllEmployees();
                    break;

                case inqMessages.viewAllDepartments: viewEmployeeDepartments();
                    break;

                case inqMessages.viewByManager: viewEmployeeByManager();
                    break;

                case inqMessages.addNewEmployee: createNewEmployee();
                    break;

                case inqMessages.updateEmployee: updateCureentEmployee();
                    break;

                case inqMessages.updateRole: updateEmployeeRole();
                    break;

                case inqMessages.updateManager: updateEmployeeManager();
                    break;

                case inqMessages.viewAllRoles: viewAllAvailableRoles();
                    break;

               //
               
             //  default: exitApp();

            }
        })
        .catch(error => {
            if (error.isTtyError) {
                console.log(error)
            } else {
                if (error) throw error
            }
        })
};

//create a function to find every employee
function findAllEmployees() {
    //call db query
    db.findAllEmployees()
        //place info
        .then(([rows]) => {
            console.log("/n");
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
                name: `${first_name}, ${last_name}`,
                value: id
            }));

            inquirer.
                prompt([
                    {
                        type: 'list',
                        name: 'managerId',
                        message: "Which manager's team would you like to see?",
                        choices: allManagers
                    }
                ])
                .then(res => db.findAllEmployeesByManager(res.managerId))
                .then(([rows]) => {
                    let employees = rows;
                    console.log('/n');

                    if (employees.length === 0) {
                        console.log("There is no manager attached to this employee")
                    } else {
                        console.table(employees)
                    }
                })
                .then(() => init())

        });
};

function createNewEmployee() {
    inquirer
        .prompt([
            {
                name: 'firstName',
                message: "Please enter the employee's first name"
            },
            {
                name: 'lastName',
                message: "Please enter the employee's last name"

            }
        ])
        .then(res => {
            let firstName = res.firstName;
            let lastName = res.lastName;

            
        })
}
loadApp();