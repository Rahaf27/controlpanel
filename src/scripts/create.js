const fs = require('fs');
const exec = require('child_process').exec;
const component = process.argv[2]; // take component name from terminal 
fs.readFile("./src/components/template.html", "utf8", (err, source) => {
    if (err) return console.error(err);
    const content = source.replace(/COMPONENT_NAME/g, component);
    if (fs.existsSync(`./src/components/${component}.html`)) {
        return console.error(`${component}.html already exist, use anthor name`);
    }
    fs.writeFile(`./src/components/${component}.html`, content, (err) => {
        if (err) return console.error(`there is a problem creating ${component}.html`);
        else {
            fs.writeFile(`./src/assets/sass/components/${component}.scss`, '', (err) => {
                if (err) return console.error(`there is a problem creating ${component}.scss`);
                console.log(`${component} created successfully!`);
                fs.appendFile(`./src/assets/sass/components/_components.scss`, `@import "${component}";\n`, (err) => {
                    console.log(`${component} appended successfully!`);
                    exec(`code -r ./src/components/${component}.html`, (err) => {
                        if (err) return console.error(err)
                    });
                    exec(`code -r ./src/assets/sass/components/${component}.scss`, (err) => {
                        if (err) return console.error(err)
                    });
                });

            });
        }
    });
}

);