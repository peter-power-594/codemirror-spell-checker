"use strict";

var gulp = require("gulp"),
	minifycss = require("gulp-clean-css"),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat"),
	header = require("gulp-header"),
	buffer = require("vinyl-buffer"),
	pkg = require("./package.json"),
	debug = require("gulp-debug"),
	eslint = require("gulp-eslint"),
	prettify = require("gulp-jsbeautifier"),
	browserify = require("browserify"),
	source = require("vinyl-source-stream"),
	rename = require("gulp-rename");

var banner = ["/**",
	" * <%= pkg.name %> v<%= pkg.version %>",
	" * Copyright <%= pkg.company %>",
	" * @link <%= pkg.homepage %>",
	" * @license <%= pkg.license %>",
	" * Modified by Pierre-Henri Lavigne for the Wordpress Plugin Markup Markdown",
	" */",
	""].join("\n");

gulp.task("prettify-js", function() {
	return gulp.src("./src/js/spell-checker.js")
		.pipe(prettify({js: {brace_style: "collapse", indent_char: "\t", indent_size: 1, max_preserve_newlines: 3, space_before_conditional: false}}))
		.pipe(gulp.dest("./src/js"));
});


gulp.task("lint", function() {
	return gulp.src("./src/js/**/*.js")
		.pipe(debug())
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

function taskBrowserify(opts) {
	return browserify("./src/js/spell-checker.js", opts)
		.bundle();
}

gulp.task("browserify:debug", function() {
	return taskBrowserify({debug:true, standalone:"CodeMirrorSpellChecker"})
		.pipe(source("spell-checker.debug.js"))
		.pipe(buffer())
		.pipe(header(banner, {pkg: pkg}))
		.pipe(gulp.dest("./debug/"));
});

gulp.task("browserify", function() {
	return taskBrowserify({standalone:"CodeMirrorSpellChecker"})
		.pipe(source("spell-checker.js"))
		.pipe(buffer())
		.pipe(header(banner, {pkg: pkg}))
		.pipe(gulp.dest("./debug/"));
});

gulp.task("scripts",
gulp.series("prettify-js", "lint", gulp.parallel("browserify:debug", "browserify"), function() {
	var js_files = ["./debug/spell-checker.js"];

	return gulp.src(js_files)
		.pipe(concat("spell-checker.min.js"))
		.pipe(uglify())
		.pipe(buffer())
		.pipe(header(banner, {pkg: pkg}))
		.pipe(gulp.dest("./dist/"));
}));


gulp.task("default",
	gulp.parallel("scripts")
);
