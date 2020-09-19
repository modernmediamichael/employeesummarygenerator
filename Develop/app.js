const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamMembers = [];

const managerQuestions = [
    {  
        type: "input",
        message: "What is the name of this team project?",
        name: "teamTitle"
    },
    { 
        type: "input",
        message: "Who is the manager of this project?",
        name: "managerName"
    },
    {
        type: "input",
        message: "What is the manager's ID?",
        name: "managerID"
    },
    {
        type: "input",
        message: "What is the manager's email?",
        name: "managerEmail"
    },
    { 
        type: "input",
        message: "What is the manager's office number?",
        name: "officeNumber"
    },
    {
        type: "confirm",
        name: "newEmployee",
        message: "Would you like to add another team member?"
}]

const employeeQuestions = [
     {
            type: "list",
            message: "What is this employee's role?",
            name: "employeeRole",
            choices: ["Intern", "Engineer"]
        },
        {
            type: "input",
            message: "What is the employee's name?",
            name: "employeeName"
        },
        {
            type: "input",
            message: "What is the employee's id?",
            name: "employeeId"
        },
        {
            type: "input",
            message: "What is the employee's email?",
            name: "employeeEmail"
}]

const engineerQuestions = [
    {
        type: "input",
        message: "What is the Engineer's Github?",
        name: "github",
    },
    {
        type: "confirm",
        name: "newEmployee",
        message: "Would you like to add another team member?"
}]

const internQuestions = [
        {
            type: "input",
            message: "What's the Intern's school?",
            name: "school",
        },
        {
            type: "confirm",
            name: "newEmployee",
            message: "Would you like to add another team member?"
        }
]

function managerData() {
    inquirer.prompt(managerQuestions).then(function(answer){
        const manager = new Manager(answer.managerName,answer.managerID,answer.managerEmail,answer.officeNumber);
        teamMembers.push(manager);
        // console.log(answer);
        checkIfNewEmployee(answer);
    })
}

function addNewEmployee () {
    inquirer.prompt(employeeQuestions).then(function(employeeAnswers){
        if (employeeAnswers.employeeEmail !== null && employeeAnswers.employeeRole === "Intern"){
            inquirer.prompt(internQuestions).then(function(internAnswers) {
                const intern = new Intern(employeeAnswers.employeeName,employeeAnswers.employeeId,employeeAnswers.employeeEmail,internAnswers.school);
                teamMembers.push(intern);
                // console.log(teamMembers)
                checkIfNewEmployee(internAnswers);
            })
        } else if (employeeAnswers.employeeEmail !== null && employeeAnswers.employeeRole === "Engineer"){
            inquirer.prompt(engineerQuestions).then(function(engineerAnswers) {
                const enginer = new Engineer(employeeAnswers.employeeName,employeeAnswers.employeeId,employeeAnswers.employeeEmail,internAnswers.school);
                teamMembers.push(engineer);
                console.log(teamMembers);
                checkIfNewEmployee(engineerAnswers)
            })
        }
    });
}


function checkIfNewEmployee(answer) {
    if(answer.newEmployee === true) {
        addNewEmployee();
    } else {
        renderAndSaveHtml();
    }
}

function renderAndSaveHtml(){
    const htmlString = render(teamMembers)
    fs.writeFile("team.html",htmlString,(err)=>{
        if (err) throw err
        console.log("Message written to file")
    });
    console.log(teamMembers);
}

managerData();

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