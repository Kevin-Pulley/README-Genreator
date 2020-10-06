const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt ([
        {
            type: "input",
            name: "title",
            message: "What's the title of your project?"
        },
        {
            type: "input",
            name: "description",
            message: "Enter the description of the project:"
        },
 
        {
            type: "input",
            name: "installation",
            message: "How to install:"
        },
        {
            type: "input",
            name: "usage",
            message: "Usage of the product:"
        },
        {
            type: "list",
            name: "license",
            message: "Select a license:",
            choices: [
                "BSD", 
                "MIT",
                "GPL"
            ]
        },
        {
            type: "input",
            name: "contributing",
            message: "List any contributors:"
        },
        {
            type: "input",
            name: "test",
            message: "How to test your product:"
        },
        {
            type: "input",
            name: "github",
            message: "Enter your github username:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email:"
        },
    ]);
}

function generateMarkdown(answers) {
    console.log(answers);
    return `
 # ${answers.title}

 ![${answers.license} license](https://img.shields.io/badge/License-${answers.license}-blue.svg)
---

### Table of Contents

- [Description](#description)
- [How To Use](#how-to-use)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributors](#contributing)
- [Test](#test)
- [Questions](#questions)

---

## Description

- ${answers.description}

[Back To The Top](##Table-of-contents)

---

## How To Use
- ${answers.usage}

[Back To The Top](##Table-of-contents)

---

## Installation
- ${answers.installation}

[Back To The Top](##Table-of-contents)

---

## Usage
- ${answers.usage}

[Back To The Top](##Table-of-contents)

---

## License
${answers.license}


[Back To The Top](##Table-of-contents)

---

## Contributing
- ${answers.contributing}

[Back To The Top](##Table-of-contents)

---

## Test
- ${answers.test}

[Back To The Top](##Table-of-contents)


---

## Questions

- Email - [${answers.email}]
- Github - [github.com/${answers.github}]

[Back To The Top](##Table-of-contents)


    `
}

// function license (req, res){
//     req.body.field = Boolean(req.body.field)
//  }

promptUser()
.then(function(answers) {
    const md = generateMarkdown(answers);

    return writeFileAsync("README.md", md);
})
.then(function() {
    console.log("Successfully wrote to README.md");
})
.catch(function(err) {
    console.log(err);
})