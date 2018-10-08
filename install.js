const clild = require('child_process').execSync;

function next (cmd,msg=""){
    console.log(msg,clild(cmd).toString());
}

console.log("")
next("node -v","node: ")
next("npm -v" ,"npm: ")
console.log("waiting npm install...")
next("npm i")
next("gulp copy --color")
console.log("\nAll ok! Now you can delete install.js file.\nRun 'gulp' in terminal for compile scss to css\n\n")
