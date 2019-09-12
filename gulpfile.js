var gulp = require("gulp");
// html压缩
var htmlclean = require("gulp-htmlclean");

// js压缩
var uglify = require("gulp-uglify");

// 图片压缩
var imagemin = require("gulp-imagemin");

//去掉调试语句
var debug = require("gulp-strip-debug");

// css
var less = require("gulp-less");
var postCss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssClean = require("gulp-clean-css");  //压缩css


// 开启服务器
var connect = require("gulp-connect")

//文件路径
var folder = {
    src: './src/',
    dist: './dist/'
}

// 当前的环境变量
var devMode = process.env.NODE_ENV="production" //生产环境

// export.NODE_ENV=development    命令行 设置环境变量为开发环境

gulp.task("html", function(){
    var page = gulp.src(folder.src+'html/*')  //路径
            .pipe(connect.reload());  //当文件有变化  重新刷新
        if(!devMode){    //如果不是生产环境 则不会压缩html代码
            page.pipe(htmlclean())  //html压缩
        }
        page.pipe(gulp.dest(folder.dist+'html/'))
})

gulp.task("css", function(){
    gulp.src(folder.src+'css/*')
        .pipe(connect.reload())
        .pipe(less())  //less转化成css
        .pipe(postCss([autoprefixer()]))  //添加前缀
        .pipe(cssClean())  //css压缩
        .pipe(gulp.dest(folder.dist+'css/'))
})

gulp.task("js", function(){
    var page = gulp.src(folder.src+'js/*')
                .pipe(connect.reload())
        if(!devMode){
        page.pipe(debug())  //去除js中调试代码
            .pipe(uglify()) //压缩js
        }
        page.pipe(gulp.dest(folder.dist+'js/'))
})

gulp.task("image", function(){
    gulp.src(folder.src+'image/*')
        .pipe(imagemin())  //压缩图片
        .pipe(gulp.dest(folder.dist+'image/'))
})

gulp.task("watch", function(){
    gulp.watch(folder.src + "html/*", ["html"]);  //监听html文件夹下的文件 如果有修改 执行html任务
    gulp.watch(folder.src + "css/*", ["css"]);
    gulp.watch(folder.src + "js/*", ["js"]);
})

// 开启服务器
gulp.task("server", function(){
    connect.server({
        port: "8081", //端口号
        livereload: true //实时刷新
    })
})


gulp.task("default", ["html", "css", "js", "image","server", "watch"]);
