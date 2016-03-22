import * as del from 'del';
import {APP_DEST} from '../config';

export function clean(gulp, plugins, option) {
  return function (done) {
    cleanApp(done);
  };
};
function cleanApp(done) {
  del(APP_DEST, done);
}
