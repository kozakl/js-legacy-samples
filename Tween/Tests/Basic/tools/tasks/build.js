var gulp        = require('gulp'),
    streamqueue = require('streamqueue'),
    concat      = require('gulp-concat'),
    through     = require('through2'),
    exec        = require('child_process').exec;

gulp.task('build', function() {
    const files = [
        './lib/Easing.js',
        './lib/Pixi.js',
        './src/utils/DetectDevice.js',
        './src/utils/DNumber.js',
        './src/utils/TweenCore.js',
        './src/utils/TweenManager.js',
        './src/tweens/TweenAlpha.js',
        './src/tweens/TweenPos.js',
        './src/tweens/TweenScale.js',
        './src/Main.js'
    ];
    
    streamqueue({objectMode:true},
            gulp.src(files.concat('!./src/**')),
            gulp.src(files.concat('!./lib/*'))
                .pipe(concat('source.js'))
                .pipe(through.obj(removeStats))
                .pipe(through.obj(addWrapper))
        )
        .pipe(concat('source.js'))
        .pipe(through.obj(removeCopyright))
        .pipe(through.obj(optimizePIXI))
        .pipe(through.obj(optimizeRequires))
        .pipe(gulp.dest('./'));
    
    
    var command = 'java -jar tools/compiler.jar';
    command += ' --language_in  ECMASCRIPT6_STRICT';
    command += ' --language_out ECMASCRIPT5_STRICT';
    command += ' --compilation_level ADVANCED_OPTIMIZATIONS';
    //command += ' --debug true';
    //command += ' --formatting PRETTY_PRINT';
    command += ' --externs tools/extern.js';
    command += ' --js source.js';
    command += ' --js_output_file source.min.js';
    
    exec(command,
        function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
        }
    );
});

function removeStats(file, enc, cb)
{
    enc = null;
    if (file.contents)
        file.contents = new Buffer(file.contents.toString().replace(/^.*stats.*$/mg, ''));
    
    this.push(file);
    return cb();
}

function addWrapper(file, enc, cb)
{
    enc = null;
    if (file.contents)
        file.contents = new Buffer('(function(){{0}})();'.replace('{0}', file.contents.toString()));
    
    this.push(file);
    return cb();
}

function removeCopyright(file, enc, cb)
{
    enc = null;
    if (file.contents)
        file.contents = new Buffer(file.contents.toString().replace(/^.*@copyright|@license*/mg, ''));
    
    this.push(file);
    return cb();
}

function optimizePIXI(file, enc, cb)
{
    enc = null;
    if (file.contents)
        file.contents = new Buffer(file.contents.toString().replace(/PIXI/mg, 'P'));
    
    this.push(file);
    return cb();
}

function optimizeRequires(file, enc, cb)
{
    enc = null;
    
    var contents = file.contents.toString();
    var requires = [];
    for (var offset = 0;;)
    {
        var indexStart = contents.indexOf('require(\'', offset);
        var indexEnd   = contents.indexOf(')',          indexStart);
        if (indexStart == -1)
            break;
        
        offset = indexEnd;
        requires.push(contents.substring(indexStart + 9, indexEnd - 1));
    }
    
    //remove duplicates
    requires = requires.filter(
        function(item, pos) {
            return requires.indexOf(item) == pos;
        }
    );
    
    for (var i = 0; i < requires.length; ++i) {
        contents = contents.replace(
            new RegExp("'" + requires[i] + "'|" +
                       '"' + requires[i] + '"', 'mg'), String(i));
    }
    
    file.contents = new Buffer(contents);
    
    this.push(file);
    return cb();
}
