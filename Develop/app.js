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
    //collect manager's info
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

    //create manager class and push to userList
    const manager = new Manager (managerData.name, userId++, managerData.email, managerData.officeNumber);
    userList.push(manager);


    //loop through all team members and select engineer or intern role, then push classes to userList
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
                    name: 'name',
                    message: "The engineer's name:",
                },
                {   
                    name: 'email',
                    message: "The engineer's email:",
                },
                {
                    name: 'github',
                    message: 'Github:',
                }
            ]);
            const engineer = new Engineer(employee.name, userId++, employee.email, employee.github);
            userList.push(engineer);
            
        }
        else {
            const employee = await inquirer.prompt([
                {   
                    name: 'name',
                    message: "The intern's name:"
                },
                {   
                    name: 'email',
                    message: "The intern's email:"
                },
                {
                    name: 'school',
                    message: 'School:'
                }
            ])
            const intern = new Intern (employee.name, userId++, employee.email, employee.school)
            userList.push(intern);
        } 
    }

    //render userList to outputPath 
    fs.writeFileSync(outputPath, render(userList), "utf-8");
    console.log( `Completed writing to: ${outputPath}` )

}
main()
