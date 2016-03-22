import {serveSPA} from '../utils';

export function serve(gulp, plugins) {
  return function () {
    serveSPA();
  };
};
