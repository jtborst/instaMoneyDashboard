import * as runSequence from 'run-sequence';
import {join} from 'path';
import {APP_SRC} from '../config';
import {notifyLiveReload} from '../utils';

export function watch(plugins) {
  return function () {
    plugins.watch(join(APP_SRC, '**'), e =>
      runSequence('build', () => notifyLiveReload(e))
    );
  };
};
