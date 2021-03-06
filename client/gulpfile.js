// jshint asi: true
var gulp          = require('gulp')                         // the main guy
var clone         = require('gulp-clone')                   // used to fork a stream
var order         = require('gulp-order')                   // reorder files in stream
var uglify        = require('gulp-uglify')                  // minify js
var jsbeautify    = require('gulp-jsbeautify')				// js files human readable
var stylus        = require('gulp-stylus')                  // turn stylus code into css
var rename        = require('gulp-rename')                  // rename file
var concat        = require('gulp-concat')                  // merge files together
var addsrc        = require('gulp-add-src')                 // mid-stream gulp.src()
var notify        = require('gulp-notify')                  // OS-level notifications
var plumber       = require('gulp-plumber')                 // handle errors without crashing
var beautify      = require('gulp-cssbeautify')             // make files human readable
var annotate      = require('gulp-ng-annotate')             // safely minify angular
var sourcemap     = require('gulp-sourcemaps')              // write sourcemaps
var minifycss     = require('gulp-minify-css')              // minify css code
var combinemq     = require('gulp-combine-media-queries')   // move all media queries to the end
var autoprefix    = require('gulp-autoprefixer')            // prefix any css with low support
var templateCache = require('gulp-angular-templatecache')   // cache angular template files

var paths = {
	stylus: {
		watch: ['assets/styl/*.styl', 'assets/styl/**/*.styl'],
		main: 'assets/styl/style.styl'
	},
	angular: {
		files: ['app/*.js', 'app/**/*.js'],
		watch: ['app/*.js', 'app/**/*.js', 'app/**/*.html'],
		views: 'app/**/*.html'
	},
	libs: [
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/angular/angular.min.js',
		'bower_components/angular-route/angular-route.min.js',
		'bower_components/angular-resource/angular-resource.min.js',
		'bower_components/angular-sanitize/angular-sanitize.min.js',
		'bower_components/angular-animate/angular-animate.min.js',
		'bower_components/lodash/lodash.min.js',
		'bower_components/restangular/dist/restangular.min.js',
		'bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
		'bower_components/angular-google-maps/dist/angular-google-maps.min.js',
		'bower_components/ngGeolocation/ngGeolocation.min.js',
		'bower_components/angular-cookies/angular-cookies.min.js',
		'bower_components/angular-messages/angular-messages.min.js'
		
	],
	output: 'assets/dist/'
}

var plumberOpts = {
	errorHandler: notify.onError("Error: <%= error.message %>")
}

var tplCacheOpts = {
	module: 'app.views'
}

gulp.task('angular', function() {
	var stream = gulp.src(paths.angular.views)              // grab all the html views
		.pipe(plumber(plumberOpts))                         // stop any errors from breaking a watch
		.pipe(templateCache('views.js', tplCacheOpts))      // make a template cache from them
		.pipe(addsrc(paths.angular.files))                  // add the rest of the angular app
		.pipe(order(['app.js']))                            // make sure app.js is first
		.on('error', function(){})                          // suppress jscs error reporting
		.pipe(annotate())                                   // make angular callbacks minifyable
		                                     // minify the code   .pipe(uglify())
		.pipe(concat('app.min.js'))                          // merge them all into the same file
		.pipe(gulp.dest(paths.output))                      // save it into the dist folder
		
	return stream
	
})

gulp.task('libs', function() {
	var stream = gulp.src(paths.libs)                       // grab all the libs
		.pipe(order(['angular.min.js', 'lodash.min.js', 'angular-messages.min.js']))
		.pipe(concat('libs.js'))                            // merge them all into the same file

	stream.pipe(clone())                                    // Readable library
		.pipe(jsbeautify())
		.pipe(rename('libs.js'))
		.pipe(gulp.dest(paths.output))

	stream.pipe(clone())                                    // minified library
		.pipe(uglify())                                     // minify the code
		.pipe(rename('libs.min.js'))
		.pipe(gulp.dest(paths.output))                      // save it into the dist folder
	
	return stream
})

gulp.task('css', function(){
	// prepare css code
	var stream = gulp.src(paths.stylus.main)                // grab our stylus file
		.pipe(plumber(plumberOpts))                         // notify us if any errors appear
		.pipe(sourcemap.init())                             // get ready to write a sourcemap
		.pipe(stylus())                                    // turn the stylus into css
		.pipe(combinemq())                                  // put all the media queries at the bottom
		.pipe(sourcemap.write())                            // write the sourcemap
		.pipe(autoprefix('last 2 versions'))                // autoprefix the css code
	
	// make style.css
	stream.pipe(clone())                                    // make a copy of the stream up to autoprefix
		.pipe(beautify())                                   // make css really readable
		.pipe(rename('style.css'))                          // make the filename style.css
		.pipe(gulp.dest(paths.output))                      // save it into the dist folder
	
	// make style.min.css
	stream.pipe(clone())                                    // make a copy of the stream up to autoprefix
		.pipe(minifycss())                                  // minify it (removes the sourcemap)
		.pipe(sourcemap.write())                            // write the sourcemap
		.pipe(rename('style.min.css'))                      // make the filename style.min.css
		.pipe(gulp.dest(paths.output))                      // save it into the dist folder
	
	return stream
})

gulp.task('watch', ['angular', 'css'], function() {
	
	gulp.watch(paths.angular.watch, ['angular'])
	gulp.watch(paths.stylus.watch,  ['css'])
	
})

gulp.task('default', ['libs', 'angular', 'css'])