const inquirer = require('inquirer');
const fs = require('fs');

// Function to prompt the user for input
function promptUser() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of your project:'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a description of your project:'
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Enter installation instructions:'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Enter usage information:'
        },
        {
            type: 'list',
            name: 'license',
            message: 'Choose a license for your project:',
            choices: ['MIT', 'GNU GPLv3', 'Apache License 2.0', 'BSD 3-Clause', 'None']
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Enter contribution guidelines:'
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Enter test instructions:'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address:'
        }
    ]);
}

// Function to generate the README content
function generateREADME(answers) {
    const licenseBadge = renderLicenseBadge(answers.license);
    const licenseNotice = renderLicenseNotice(answers.license);

    return `
# ${answers.title}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${licenseBadge}
${licenseNotice}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
For additional questions, contact [${answers.github}](https://github.com/${answers.github}) via email at ${answers.email}.
`;
}

// Function to render the license badge
function renderLicenseBadge(license) {
    if (license === 'None') {
        return '';
    }
    return `![License](https://img.shields.io/badge/License-${encodeURIComponent(license)}-green.svg)`;
}

// Function to render the license notice
function renderLicenseNotice(license) {
    if (license === 'None') {
        return 'This project is not licensed.';
    }
    return `This project is licensed under the ${license} license.`;
}

// Function to initialize the application
function init() {
    // Prompt user for input
    promptUser()
        .then(answers => {
            // Generate README content
            const readmeContent = generateREADME(answers);

            // Write README file
            fs.writeFile('README.md', readmeContent, err => {
                if (err) {
                    console.error('An error occurred while writing the README:', err);
                } else {
                    console.log('README.md generated successfully!');
                }
            });
        })
        .catch(error => {
            console.error('An error occurred while prompting the user:', error);
        });
}

// Initialize the application
init();