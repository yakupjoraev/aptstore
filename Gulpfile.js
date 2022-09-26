const fs = require('fs');
const path = require('path');
const gulp = require('gulp')
const concat = require('gulp-concat')
const through = require('through2')
const gutt = require('gulp-gutt')
const generator = require('gutt-static-site-generator')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const preset = require('postcss-preset-env')
const pimport = require('postcss-import')
const passets = require('postcss-assets')
const csso = require('gulp-csso')
const esbuild = require('esbuild')
const isProduction = process.argv.indexOf('--production') !== -1
let browserSync

function pass() {
	return through.obj()
}

function htmlescape(html) {
	return html.replace(/&/g, "&amp;")
	.replace(/</g, "&lt;")
	.replace(/>/g, "&gt;")
	.replace(/"/g, "&quot;");
}

function errorHandler(formatter) {
	return function (error) {
		const formatterError = formatter(error)

		console.error(formatterError)

		if (browserSync) {
			browserSync.notify(
				`<pre style="text-align: left; font-family: monospace; word-wrap: break-word; max-width: 600px">
				<code>${htmlescape(formatterError)}</code>
				</pre>`,
				5000
			)
		}

		this.emit('end')
	}
}

function errorPipeline(formatter) {
	if (isProduction) {
		return pass()
	}

	const plumber = require('gulp-plumber')

	return plumber({ errorHandler: errorHandler(formatter) })
}

function flatten(lists) {
	return lists.reduce((a, b) => a.concat(b), [])
}

function getDirectories(srcpath) {
	return fs.readdirSync(srcpath)
		.map((file) => path.join(srcpath, file))
		.filter((path) => fs.statSync(path).isDirectory())
}

function getDirectoriesRecursive(srcpath) {
	return [srcpath].concat(flatten(getDirectories(srcpath).map(getDirectoriesRecursive)))
}

const postcssPlugins = [
	pimport(),
	preset({
		stage: 0,
		importFrom: [
			'./layouts/variables.pcss'
		]
	}),
	passets({
		baseUrl: '.',
		loadPaths: getDirectoriesRecursive('./components/')
	})
]

const stylesGlob = [
	'./*.pcss',
	'./libs/*.css',
	'./layouts/*.pcss',
	'./routes/*.pcss',
	'./components/**/*.pcss'
]

function styles() {
	return gulp.src('./index.pcss')
		// .pipe(PRODUCTION ? pass() : sourcemaps.init())
		.pipe(errorPipeline(function (error) { return error.stack }))
		.pipe(postcss(postcssPlugins, { map: true }))
		.pipe(concat('bundle.css'))
		.pipe(rename({ dirname: '' }))
		// .pipe(PRODUCTION ? pass() : sourcemaps.write('.'))
		.pipe(isProduction ? csso() : pass())
		.pipe(gulp.dest(`./dist/`))
		.pipe(browserSync ? browserSync.stream() : pass())
}

function migrating() {
	return gulp.src('./migrating.pcss')
		.pipe(errorPipeline(function (error) { return error.stack }))
		.pipe(postcss(postcssPlugins, { map: true }))
		.pipe(concat('migrating.css'))
		.pipe(rename({ dirname: '' }))
		// .pipe(PRODUCTION ? pass() : sourcemaps.write('.'))
		.pipe(isProduction ? csso() : pass())
		.pipe(gulp.dest(`./dist/`))
}

const assetsGlob = [
	'./{routes,layouts,components}/**/*.{png,svg,jpg,ico,woff,woff2,eot,ttf}'
]

function assets() {
	return gulp
		.src(assetsGlob)
		.pipe(gulp.dest('./dist'))
}

function fonts() {
	return gulp
		.src('./fonts/*')
		.pipe(gulp.dest('./dist/fonts'))
}

function templates() {
	return gulp.src('./routes/**/*.gutt', { read: false, base: './routes/' })
		.pipe(errorPipeline(function (error) { return error.message }))
		.pipe(gutt({ stringifier: generator, prettify: true, handler: function (template) {
			return template()
		}}))
		.pipe(rename({ extname: '.html' }))
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync ? browserSync.stream() : pass())
}

function scripts(done) {
	esbuild.buildSync({
		entryPoints: ['routes/app.js'],
		bundle: true,
		minify: isProduction,
		sourcemap: !isProduction,
		target: ['es5'],
		outfile: 'dist/app.js'
	})
	done()
}

function watch() {
	const watchParams = { ignoreInitial: false }

	browserSync = require('browser-sync').create()
	browserSync.init({
		server: {
			baseDir: './dist/',
			routes: {
				'/storage': 'storage'
			}
		},
		ghostMode: false,
		open: false
	})

	gulp.watch(assetsGlob, watchParams, assets)
	gulp.watch('./fonts/*', watchParams, fonts)
	gulp.watch('./{routes,layouts,components}/**/*.js', watchParams, scripts)
	gulp.watch('./{routes,layouts,components}/**/*.gutt', watchParams, templates)
	gulp.watch(stylesGlob, watchParams, styles)
}

module.exports.templates = templates
module.exports.styles = styles
module.exports.migrating = migrating
module.exports.scripts = scripts
module.exports.assets = assets
module.exports.fonts = fonts
module.exports.watch = watch
module.exports.default = gulp.parallel(
	migrating,
	styles,
	scripts,
	assets,
	fonts,
	templates
)
