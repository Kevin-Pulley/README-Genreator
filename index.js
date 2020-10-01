const inquirer = require("inquirer");
const require = ("fs");
const util = ("util");

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
            type: "checkbox",
            name: "license",
            message: "What's the title of your project?",
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
    return `
    # (#${answers.title})


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

${answers.description}

[Back To The Top](#${answers.title})

---

## How To Use
- ${answers.usage}

[Back To The Top](#${answers.title})
---

#### Installation
- ${answers.installation}

[Back To The Top](#${answers.title})

---

#### Usage
- ${answers.usage}

[Back To The Top](#${answers.title})

---

## License
${answers.license}


[Back To The Top](#${answers.title})

---

#### Contributing
- ${answers.contributing}

[Back To The Top](#${answers.title})

---

#### Test
- ${answers.test}

[Back To The Top](#${answers.title})


---

## Questions

- Email - [${answers.email}]
- Github - [github.com/${answers.github}]

[Back To The Top](#${answers.title})

    `
}

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