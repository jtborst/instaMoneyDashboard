import {readFileSync} from 'fs';
import {argv} from 'yargs';


// --------------
// Configuration.
export const PORT                 = 5555;
export const LIVE_RELOAD_PORT     = 4002;
export const APP_BASE             = '/';

export const APP_TITLE            = 'InstaMoney Dashboard';

export const APP_SRC              = 'app';
export const ASSETS_SRC           = `${APP_SRC}/assets`;

export const TOOLS_DIR            = 'tools';
export const APP_DEST             = `dist`;
export const CSS_DEST             = `${APP_DEST}/css`;
export const LIB_DEST             = `${APP_DEST}/lib`;
export const APP_ROOT             = `${APP_BASE}`;

export const NPM_DEPENDENCIES = [
  { src: 'systemjs/dist/system-polyfills.js', dest: LIB_DEST },

  { src: 'es6-shim/es6-shim.min.js', inject: 'shims', dest: LIB_DEST },
  { src: 'reflect-metadata/Reflect.js', inject: 'shims', dest: LIB_DEST },
  { src: 'systemjs/dist/system.src.js', inject: 'shims', dest: LIB_DEST },
  { src: 'angular2/bundles/angular2-polyfills.js', inject: 'shims', dest: LIB_DEST },

  { src: 'angular2/bundles/angular2.min.js', inject: 'libs', dest: LIB_DEST },
  { src: 'angular2/bundles/router.js', inject: 'libs', dest: LIB_DEST }, // use router.min.js with alpha47
  { src: 'angular2/bundles/http.min.js', inject: 'libs', dest: LIB_DEST },

  { src: 'ng2-material/dist/ng2-material.css', inject: true, dest: CSS_DEST },
  { src: 'ng2-material/dist/font.css', inject: true, dest: CSS_DEST }
];

const SYSTEM_CONFIG = {
  defaultJSExtensions: true
};

// Declare local files that needs to be injected
export const APP_ASSETS = [
  { src: `${ASSETS_SRC}/main.css`, inject: true, dest: CSS_DEST }
];

NPM_DEPENDENCIES
    .filter(d => !/\*/.test(d.src)) // Skip globs
    .forEach(d => d.src = require.resolve(d.src));

export const DEPENDENCIES = NPM_DEPENDENCIES.concat(APP_ASSETS);
