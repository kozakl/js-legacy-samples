var gulp    = require('gulp'),
    concat  = require('gulp-concat'),
    through = require('through2');

gulp.task('build', function() {
    const files = [
        './src/Easing.js'
    ];
    
    gulp.src(files)
        .pipe(concat('Easing.js'))
        .pipe(through.obj(addWrapper))
        .pipe(gulp.dest('./build'));
});

function addWrapper(file, enc, cb)
{
    enc = null;
    if (file.contents)
        file.contents = new Buffer('(function(){{0}})();'.replace('{0}', file.contents.toString()));
    
    this.push(file);
    return cb();
}
