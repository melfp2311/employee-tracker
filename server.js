var mysql = require("mysql");
var inquirer = require("inquirer");

//CONNECTION TO THE DATABASE
var connection = mysql.createConnection({
    host: "localhost",

    //CHOSEN PORT
    port: 3306,
    user: "root",
    password: "superSecretPwd",
    database: "employees_db"
});

connection.connect(function(err){
    if(err) throw err;
    employeesInfo();
});

//PROMPT THE USER
function employeesInfo(){
    inquirer
    .prompt({
        type:"list",
        name:"selectAction",
        message: "What would you like to do?",
        choices: [
            "Add Employee",
            "Add Department",
            "Add Role",
            "View Employees",
            "View Departments",
            "View Roles",
            "Update Employee Manager",
            "Update Employee Role",
            "Delete Employee",
            "Delete Department",
            "Delete Role",
            "Exit Program"
        ]
    }).then(answers => {
        switch (answers.choice) {
            case "Add Employee":
                addEmployee()
                break;
            case "View Employees":
                viewEmployees()
                break;
            case "Add Department":
                addDepartment()
                break;
            case "View Departments":
                viewDepartment()
                break;
            case "Add Role":
                addRole()
                break;
            case "View Roles":
                viewRoles()
                break;
            case "Update Employee Manager":
                updateEmployeeManager()
                break;
            case "Update Employee Role":
                updateEmployeeRole()
                break;
            case "Delete Employee":
                deleteEmployee()
                break;
            case "Delete Department":
                deleteDepartment()
                break;
            case "Delete Role":
                deleteRole()
                break;
            case "Exit Program":
                console.log("Thank you, and have a nice day.");
                return;
        }
    });
}

//add employee functioon
function addEmployee(){
    inquirer
    .prompt({
        type:"input",
        name:"firstName",
        message:"Enter new employee's first name"
    },
    {
        type:"input",
        name:"firstName",
        message:"Enter new employee's last name"
    },
    {
        type:"list",
        name:"enterDepartment",
        message:"Enter employee's department?",
        choices: [
            "Sales",
            "Engineering",
            "Finance",
            "Legal",
        ]
    },
    {
        type:"list",
        name:"enterRole",
        message:"Enter your employee's role?",
        choices: [
            "Sales Lead",
            "Sales Person",
            "Lead Engineer",
            "Software Engineer",
            "Accountant",
            "Legal Team Lead",
            "Lawyer"
        ]
    },
    {
        type:"input",
        name:"enterSalary",
        message:"Which is your employee's salary"
    }
    )
}

//view for
function viewDepartment() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        console.table(data);
        questions();
    });
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        console.table(data);
        questions();
    });
}

function enterEmployees(){
    inquirer
    .prompt({
        type:"input",
        name: "employeeName",
        message:"Enter first name"
    },
    {
        type:"input",
        name:"employeeSecondName",
        message:"Enter the second name"
    })
}

function enterDepartment(){
    inquirer
    .prompt({
        type:"list",
        name:"enterDepartment",
        message:"Which department you'd like to search for?",
        choices: [
            "Sales",
            "Engineering",
            "Finance",
            "Legal",
        ]
    })
}

function enterManager(){
    inquirer
    .prompt({
        type:"input",
        name: "managerName",
        message:"Enter first name"
    },
    {
        type:"input",
        name:"managerSecondName",
        message:"Enter the second name"
    })
}

function enterRole(){
    inquirer
    .prompt({
        type:"list",
        name:"enterRole",
        message:"Which role you'd like to search for?",
        choices: [
            "Sales Lead",
            "Sales Person",
            "Lead Engineer",
            "Software Engineer",
            "Accountant",
            "Legal Team Lead",
            "Lawyer"
        ]
    })
}

