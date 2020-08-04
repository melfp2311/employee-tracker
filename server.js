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
function questions(firsttime = false) {
    inquirer.prompt({
        message: firsttime ? "Welcome to Employee Tracker, how can I help you today?" : "What else would you like help with today?",
        type: "list",
        name: "choice",
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
            case "Add Department":
                addDepartment()
                break;    
            case "Add Role":
                addRole()
                break;
            case "View Employees":
                viewEmployees()
                break;
            case "View Departments":
                viewDepartments()
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
                console.log("byebye.");
                return;
        }
    });
}

//adding employees, departments and roles
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "roleId",
            message: "What is their role?",
            choices: [
                "1 Salesman",
                "2 Developer",
                "3 Accountant",
                "4 Analyst",
                "5 Manager"
            ]
        },
        {
            type: "number",
            name: "managerId",
            message: "What is their manager's ID?"
        }
    ]).then(function (res) {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [res.firstName, res.lastName, res.roleId[0], res.managerId], function (err, data) {
            if (err) throw err;
            console.log("Employee added!");
            viewEmployees();
        });
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What would you like your new department name to be?"
        }
    ]).then(function (res) {
        connection.query("INSERT INTO department (name) VALUES (?)", [res.department], function (err, data) {
            if (err) throw err;
            console.log(`${res.department} Department added!`);
            questions();
        });
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter employee's title"
        },
        {
            type: "number",
            name: "salary",
            message: "Enter employee's salary"
        },
        {
            type: "input",
            name: "departmentId",
            message: "Enter department ID"
        }
    ]).then(function (res) {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [res.title, res.salary, res.departmentId], function (err, data) {
            if (err) throw err;
            console.log("Role added!");
            viewRoles();
        });
    });
}

//view employees, departments and roles
function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        console.table(data);
        questions();
    });
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        console.table(data);
        questions();
    });
}

function viewRoles() {
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        console.table(data);
        questions();
    });
}

// updating employee managers
async function updateEmployeeManager() {
    const employees = await connection.query("SELECT id, first_name, last_name FROM employee")
    const employeeChoices = employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    const employeeId = await
        inquirer.prompt(
            {
                type: "list",
                name: "eName",
                message: "Select the employee you would like to update:",
                choices: employeeChoices
            }
        );

    const managers = await connection.query("SELECT id, first_name, last_name FROM employee WHERE role_id=5")
    const managerChoices = managers.map(manager => ({
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.id
    }))

    const managerId = await
        inquirer.prompt(
            {
                type: "list",
                name: "eName",
                message: "Select manager:",
                choices: managerChoices
            }
        );
    await connection.query("UPDATE employee SET manager_id=? WHERE id=?", [managerId.eName, employeeId.eName])
    console.log("Employee manager updated!")
    viewEmployees();
}

// updating employee roles
async function updateEmployeeRole() {
    const employees = await connection.query("SELECT id, first_name, last_name FROM employee")
    const employeeChoices = employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));
    const employeeId = await inquirer.prompt(
        {
            type: "list",
            name: "eName",
            message: "Select the employee you would like to update:",
            choices: employeeChoices
        }
    );
    const roles = await connection.query("SELECT * FROM role")
    const roleChoices = roles.map(role => ({
        name: `${role.id} ${role.title} $${role.salary}`,
        value: role.id
    }));
    const roleId = await
        inquirer.prompt(
            {
                type: "list",
                name: "eName",
                message: "Select role:",
                choices: roleChoices
            }
        );
    await connection.query("UPDATE employee SET role_id=? WHERE id=?", [roleId.eName, employeeId.eName])
        console.log("Employee role updated!")
        viewEmployees();
}

// deleting employees
async function deleteEmployee() {
    const employees = await connection.query("SELECT id, first_name, last_name FROM employee")
    const employeeChoices = employees.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }))

    const employeeId = await
        inquirer.prompt(
            {
                type: "list",
                name: "eName",
                message: "Select the employee you want to delete:",
                choices: employeeChoices
            })

    await connection.query("DELETE from employee where id=?", [employeeId.eName]);
    console.log("Employee deleted.")
    viewEmployees();
}

// deleting departments
async function deleteDepartment() {
    const departments = await connection.query("SELECT * FROM department")
    const departmentChoices = departments.map(dept => ({
        name: `${dept.name}`,
        value: dept.id
    }))

    const departmentId = await
        inquirer.prompt(
            {
                type: "list",
                name: "eName",
                message: "Select the department you want to delete:",
                choices: departmentChoices
            })

    await connection.query("DELETE from department where id=?", [departmentId.eName]);
    console.log("Department deleted.")
    viewDepartment();
}

//  deleting roles
async function deleteRole() {
    const roles = await connection.query("SELECT * FROM role")
    const roleChoices = roles.map(roles => ({
        name: `${roles.title}`,
        value: roles.id
    }));

    const roleId = await
        inquirer.prompt(
            {
                type: "list",
                name: "eName",
                message: "Select the role you want to delete:",
                choices: roleChoices
            });

    await connection.query("DELETE from role where id=?", [roleId.eName]);
    console.log("Role deleted.")
    viewRoles();
}

questions(true);