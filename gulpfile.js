var gulp = require('gulp');
var $=require('gulp-load-plugins')();//这里要注意加括号实例化
var open=require('open');//以上都是模块的引用；
var minifycss = require('gulp-minify-css');
/*var plumber=require('gulp-plumber');*/


var yuanqi={//申明全局变量
	//用来定义我们的目录路径
	srcPath:'src/',//源代码放置的位置
	devPath:'build/',//整合之后的文件
	prdPath:'dist/' //用于生产部署
};
gulp.task('lib',function(){
	gulp.src('bower_components/**/*.js.map') //这里指的是读取文件
	.pipe(gulp.dest(yuanqi.devPath+'vendor'))//dest写文件，拷贝到vendor
	.pipe(gulp.dest(yuanqi.prdPath+'vendor'))
	.pipe($.connect.reload());//自动刷新
})
//调用task函数来定义一个任务
gulp.task('lib',function(){
	gulp.src('bower_components/**/*.js') //这里指的是读取文件
	.pipe(gulp.dest(yuanqi.devPath+'vendor'))//dest写文件，拷贝到vendor
	.pipe(gulp.dest(yuanqi.prdPath+'vendor'))
	.pipe($.connect.reload());//自动刷新
})

gulp.task('html',function(){
	gulp.src(yuanqi.srcPath+'**/*.html')
	.pipe(gulp.dest(yuanqi.devPath))
	.pipe(gulp.dest(yuanqi.prdPath))
	.pipe($.connect.reload());
})

gulp.task('json',function(){
	gulp.src(yuanqi.srcPath+'data/**/*.json')
	.pipe(gulp.dest(yuanqi.devPath+'data'))
	.pipe(gulp.dest(yuanqi.prdPath+'data'))
	.pipe($.connect.reload());
})
//压缩css文件
gulp.task('css',function(){
	gulp.src(yuanqi.srcPath+'style/**/*.css')
        .pipe($.plumber())
	.pipe($.concat('index.css'))
	.pipe(gulp.dest(yuanqi.devPath+'css'))
	.pipe(minifycss())
	.pipe(gulp.dest(yuanqi.prdPath+'css'))
	.pipe($.connect.reload());
})

// 合并，压缩文件
gulp.task('js',function(){
	gulp.src(yuanqi.srcPath+'script/**/*.js')
        .pipe($.plumber())
	.pipe($.concat('index.js'))
	.pipe(gulp.dest(yuanqi.devPath+'js'))
	//.pipe($.uglify())
	.pipe(gulp.dest(yuanqi.prdPath+'js'))
	.pipe($.connect.reload());
})

gulp.task('image',function(){
	gulp.src(yuanqi.srcPath+'image/**/*')
        .pipe($.plumber())
	.pipe(gulp.dest(yuanqi.devPath+'image'))
	.pipe($.imagemin())
	.pipe(gulp.dest(yuanqi.prdPath+'image'))
	.pipe($.connect.reload());
})

gulp.task('build',['image','js','css','lib','html','json'])
//写的一个总任务，要打包整个项目时只需要执行build任务就行

gulp.task('clean',function(){
	gulp.src([yuanqi.devPath,yuanqi.prdPath])
	.pipe($.clean());
})

gulp.task('serve',['build'],function(){
	$.connect.server({
		root:[yuanqi.devPath],
		livereload:true//正对高版本浏览器，可以自动刷新浏览器
		/*port:8082*/
	});
	open('http://localhost:8082');

	gulp.watch(yuanqi.srcPath+'**/*.html',['html'])
	gulp.watch(yuanqi.srcPath+'data/**/*.json',['json'])
	gulp.watch(yuanqi.srcPath+'style/**/*.css',['css'])
	gulp.watch(yuanqi.srcPath+'script/**/*.js',['js'])
	gulp.watch(yuanqi.srcPath+'image/**/*',['image'])
});

gulp.task('default',['serve'])//默认任务，执行serve时直接用gulp就能解决问题；
