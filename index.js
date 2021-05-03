const fs = require("fs");
const inquirer = require(`inquirer`);
const util = require("util");
const Choices = require("inquirer/lib/objects/choices")

const writeFileAsync = util.promisify(fs.writeFile);

let questions = [
    {
        type: "input",
        name: "author",
        message: "What is the author's name?"
    },
    {
        type: 'input',
        message: 'What is the title of your project?\n',
        name: 'title'
    },
    {
        type: 'input',
        message: 'Please, write a brief description of your project: \n',
        name: 'description'
    },
    {
        type: 'input',
        message: 'Please enter your installation steps: \n',
        name: 'installation'
    },
    {
        // exmple contribution: 
        // If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer.
        type: 'input',
        message: 'What are your guidelines for contributors to this application: \n',
        name: 'contribution'
    },
    {
        type: 'input',
        message: 'How will tests be run in your application?\n',
        name: 'test'
    },
    {
        type: 'checkbox',
        message: 'Which license type will your application be using?\n',
        name: 'license',
        choices: ['MIT', 'APACHE 2.0', 'GNU GPL v3', 'BSD 3']
    },
    {
        type: 'input',
        message: 'Please enter your github username:',
        name: 'githubUsername'
    },
    {
        type: 'input',
        message: 'Please enter your email address:',
        name: 'email'
    }
]

function generateMarkdown(response) {

    var badge = "";

    if (response.license == "MIT") {
        badge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
    } else if (response.license == "APACHE 2.0") {
        badge = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
    } else if (response.license == "GNU GPL v3") {
        badge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
    } else if (response.license == "BSD 3") {
        badge = "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)"
    };
    
    return `# ${response.title}
${badge} 
## Description
${response.description}
## Table of Contents
* [Installation instructions](#installation)
* [Usage information](#usage)
* [Contributing](#contribution)
* [Tests](#tests)
* [License](#license)
* [Questions](#questions) 
### Installation:
To install, install the necessary dependencies, open the console and run the following command:
\- \`\`\`${response.installation}\`\`\`

### Usage
Provide instructions and examples for use. Include screenshots as needed.
To add a screenshot, create an \`assets/images\` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:
\`\`\`md
![alt text](assets/images/screenshot.png)
\`\`\`
### Contribution
${response.contribution}
### Tests
In order to test open the console and run the following:
\- \`\`\`${response.test}\`\`\`
### License:
${badge}
### Questions:
If you have any questions contact me on [GitHub](https://github.com/${response.githubUsername}) or contact 
${response.author} at ${response.email}

`
};

inquirer
    .prompt(questions)
    .then(response => {
        const markdown = generateMarkdown(response);
        return writeFileAsync("./examples/generatedREADME.md",markdown);
    }).then(function () {
        console.log("Generating generatedEADME.md ...");
    }).catch(error => {
        if (error.isTtyError) {
            console.log(`Prompt couldn't be rendered in the current environment`);
        } else {
            console.log(`Something else went wrong`);
        }
    });