import {join, sep} from 'path';
import {APP_SRC, APP_DEST, DEPENDENCIES, MODULES_SRC} from '../config';
import {transformPath, templateLocals} from '../utils';

export function build(gulp, plugins) {
  return function () {
    return gulp.src([
        join(APP_SRC, 'index.html'),
        join(APP_SRC, 'js', '**'),
        join(APP_SRC, 'css', '**'),
        join(APP_SRC, 'img', '**'),
        join(APP_SRC, 'webgl', '**'),
        join(MODULES_SRC, 'jquery', 'dist', 'jquery.js'),
        join(MODULES_SRC, 'jquery-validation', 'dist', 'jquery.validate.js')
      ])
      // .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(APP_DEST));
  };

  function inject(name?: string) {
    return plugins.inject(gulp.src(getInjectablesDependenciesRef(name), { read: false }), {
      name,
      transform: transformPath(plugins, 'dev')
    });
  }

  function getInjectablesDependenciesRef(name?: string) {
    return DEPENDENCIES
      .filter(dep => dep['inject'] && dep['inject'] === (name || true))
      .map(mapPath);
  }

  function mapPath(dep) {
    let prodPath = join(dep.dest, dep.src.split(sep).pop());
    return dep.src;
  }
};
