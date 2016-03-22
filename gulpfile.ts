import * as gulp from 'gulp';
import {build, clean, serve, watch} from './tools/tasks';
import {runSequence, task} from './tools/utils';

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('build', done => runSequence('build', done));
gulp.task('clean', done => runSequence('clean', done));
gulp.task('serve', done => runSequence('serve', done));
gulp.task('watch', done => runSequence('watch', done));
