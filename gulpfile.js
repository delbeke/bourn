const gulp = require('gulp')
const yargs = require('yargs')
const loadPlugins = require('gulp-load-plugins')
const Instrumenter = require('isparta').Instrumenter
const seq = require('run-sequence')

const COVERAGE_THRESHOLDS = {global: 0}
const {COVERALLS} = process.env

const $ = loadPlugins()
const argv = yargs
  .string('grep')
  .boolean('bail')
  .argv

const unitTest = () => gulp.src(['test/lib/setup.js', 'test/unit/**/*.js'], {read: false})
  .pipe($.mocha({
    reporter: 'spec',
    grep: argv.grep,
    bail: argv.bail
  }))

gulp.task('test:unit', unitTest)

gulp.task('coverage:instrument', () => {
  return gulp.src('src/**/*.js')
    .pipe($.istanbul({
      instrumenter: Instrumenter
    }))
    .pipe($.istanbul.hookRequire())
})

gulp.task('lint', () => {
  return gulp.src('{src,test}/**/*.js')
    .pipe($.standard())
    .pipe($.standard.reporter('default', {
      breakOnError: false
    }))
})

gulp.task('coverage', ['coverage:instrument'], () => {
  return unitTest()
    .pipe($.istanbul.writeReports())
    .pipe($.istanbul.enforceThresholds({thresholds: COVERAGE_THRESHOLDS}))
})

gulp.task('coveralls', () => {
  if (!COVERALLS) {
    return
  }
  return gulp.src('coverage/lcov.info')
    .pipe($.coveralls())
})

gulp.task('test', (cb) => seq('lint', 'coverage', 'coveralls', cb))
