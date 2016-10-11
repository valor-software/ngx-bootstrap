var pkg     = require('./package.json');
var path    = require('path');
var Builder = require('systemjs-builder');
var name    = pkg.name;

var builder = new Builder();
var config = {
    baseURL: '.',
    transpiler: 'typescript',
    typescriptOptions: {
        module: 'cjs'
    },
    map: {
        'typescript': './node_modules/typescript/lib/typescript.js',
        '@angular': './node_modules/@angular',
        'rxjs': './node_modules/rxjs',
        'moment': './node_modules/moment/moment.js'
    },
    paths: {
        '*': '*.js'
    },
    meta: {
        './node_modules/@angular/*': { build: false },
        './node_modules/rxjs/*': { build: false }
    }
};

builder.config(config);

builder
    .buildStatic(name, path.resolve(__dirname, 'bundles/', name + '.js'), {format: 'umd'})
    .then(function() {
        console.log('Build complete.');
    })
    .catch(function(err) {
        console.log('Error', err);
    });