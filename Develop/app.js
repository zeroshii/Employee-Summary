const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

userList = [];
userId = 1;
async function main(){
    const managerData = await inquirer.prompt([
        {
            name: 'name',
            message: "Manager's name:"
        },
        {
            name: 'email',
            message: "Manager's email:"
        },
        {
            type: 'number',
            name: 'officeNumber',
            message: "Manager's office number:"
        },
        {
            type: 'number',
            name: 'teamMembers',
            message: 'Number of team members:'
        }
    ]);
    const manager = new Manager (managerData.name, userId++, managerData.email, managerData.officeNumber);
    userList.push(manager);
    console.log(manager);

    for (i=0; i<managerData.teamMembers; i++) {

        const teamMember = await inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: "Employee's Role:",
                choices: ['Engineer', 'Intern']
            }
        ]);

        if (teamMember.role === 'Engineer'){
            const employee = await inquirer.prompt([
                {   
                    name: 'name:',
                    message: "The engineer's name:",
                },
                {   
                    name: 'email:',
                    message: "The engineer's email:",
                },
                {
                    name: 'github',
                    message: 'Github:',
                }
            ]);
            const engineer = new Engineer (employee.name, userId++, employee.email, employee.github);
            userList.push(engineer);
            console.log(engineer);
        }
        else {
            const employee = await inquirer.prompt([
                {   
                    name: 'name:',
                    message: "The intern's name:"
                },
                {   
                    name: 'email:',
                    message: "The intern's email:"
                },
                {
                    name: 'school',
                    message: 'School:'
                }
            ])
            const intern = new Intern (employee.name, userId++, employee.email, employee.school)
            userList.push(intern);
            console.log(intern);
        } 
    }

        
}
main()

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
