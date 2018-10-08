const gulp         = require(`gulp`);
const autoprefixer = require(`gulp-autoprefixer`);
const sass         = require(`gulp-sass`);
const t2           = require("through2").obj;
const path         = `node_modules\\bootstrap\\scss`;

// copy bootstrap scss to project root
gulp.task('copy-bootstrap', () =>
    gulp.src( `${path}\\**\\*.*`, {base:path} )
    .pipe(gulp.dest("bootstrap/"))
)

// copy main import files
gulp.task('copy-scss', () =>
    gulp.src( [
        `./bootstrap\\bootstrap.scss`,
        `./bootstrap\\bootstrap-grid.scss`,
        `./bootstrap\\bootstrap-reboot.scss`,
    ],{base:`./bootstrap`})
    .pipe(t2((file,enc,cb)=>{
        let str = file.contents.toString()
        str=str.replace(/@import "/g,'@import "../bootstrap/')
        file.contents = Buffer.from(str);
        cb(null,file)
    }))
    .pipe(gulp.dest("scss/"))
)

gulp.task('copy',gulp.series('copy-bootstrap','copy-scss'))


// run "gulp" to compile new css
gulp.task('default', () =>
    gulp.src("scss/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest("css"))
)