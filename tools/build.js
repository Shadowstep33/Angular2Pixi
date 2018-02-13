'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const camelCase = require('camelcase');
const ngc = require('@angular/compiler-cli/src/main').main;
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const sourcemaps = require('rollup-plugin-sourcemaps');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const inlineResources = require('./inline-resources');

const libName = require('../package.json').name;
const rootFolder = path.resolve(__dirname, '../');
const compilationFolder = path.join(rootFolder, 'out-tsc');
const srcFolder = path.join(rootFolder, 'src/lib');
const distFolder = path.join(rootFolder, 'dist');
const tempLibFolder = path.join(compilationFolder, 'lib');
const es5OutputFolder = path.join(compilationFolder, 'lib-es5');
const es2015OutputFolder = path.join(compilationFolder, 'lib-es2015');

(async () => {
	console.info('Starting compilation');
	try{
		// Copy library to temporary folder and inline html/css.
		try{
			await _relativeCopy(`**/*`, srcFolder, tempLibFolder);
			await inlineResources(tempLibFolder);
			console.info('Inlining succeeded.');
		} catch(error){
			error.message = 'Inlining failed: ' + error.message;
			throw error;
		}

		// Compile to ES2015.
		if(await ngc(['--project', `${tempLibFolder}/tsconfig.lib.json`]) !== 0){
			throw new Error('ES2015 compilation failed');
		}
		console.info('ES2015 compilation succeeded.');

		// Compile to ES5.
		if(await ngc(['--project', `${tempLibFolder}/tsconfig.es5.json`]) !== 0){
			throw new Error('ES5 compilation failed');
		}
		console.info('ES5 compilation succeeded.');

		// Copy typings and metadata to `dist/` folder.
		try{
			_relativeCopy('**/*.d.ts', es2015OutputFolder, distFolder);
			_relativeCopy('**/*.metadata.json', es2015OutputFolder, distFolder);
			console.info('Typings and metadata copy succeeded.');
		} catch(error){
			error.message = 'Typings and metadata copy failed: ' + error.message;
			throw error;
		}

		// Bundle lib.
		try {
			// Base configuration.
			const es5Entry = path.join(es5OutputFolder, `${libName}.js`);
			const es2015Entry = path.join(es2015OutputFolder, `${libName}.js`);
			const rollupBaseConfig = {
				output: {
					name: camelCase(libName),
					// ATTENTION:
					// Add any dependency or peer dependency your library to `globals` and `external`.
					// This is required for UMD bundle users.
					globals: {
						// The key here is library name, and the value is the the name of the global variable name
						// the window object.
						// See https://github.com/rollup/rollup/wiki/JavaScript-API#globals for more.
						'@angular/core': 'ng.core',
						'gsap': 'gsap',
						'pixi.js': 'PIXI'
					},
					sourcemap: true,
				},
				external: [
					// List of dependencies
					// See https://github.com/rollup/rollup/wiki/JavaScript-API#external for more.
					'@angular/core',
					'gsap',
					'pixi.js'
				],
				plugins: [
					commonjs({
						include: ['node_modules/rxjs/**']
					}),
					sourcemaps(),
					nodeResolve({ jsnext: true, module: true })
				]
			};

			// UMD bundle.
			const umdConfig = _.defaultsDeep({}, {
				input: es5Entry,
				output: {
					file: path.join(distFolder, `bundles`, `${libName}.umd.js`),
					format: 'umd',
				},
			}, rollupBaseConfig);

			// Minified UMD bundle.
			const minifiedUmdConfig = _.defaultsDeep({}, {
				input: es5Entry,
				output: {
					file: path.join(distFolder, `bundles`, `${libName}.umd.min.js`),
					format: 'umd',
				},
				plugins: rollupBaseConfig.plugins.concat([uglify({})])
			}, rollupBaseConfig);

			// ESM+ES5 flat module bundle.
			const fesm5config = _.defaultsDeep({}, {
				input: es5Entry,
				output: {
					file: path.join(distFolder, `${libName}.es5.js`),
					format: 'es'
				},
			}, rollupBaseConfig);

			// ESM+ES2015 flat module bundle.
			const fesm2015config = _.defaultsDeep({}, {
				input: es2015Entry,
				output: {
					file: path.join(distFolder, `${libName}.js`),
					format: 'es'
				},
			}, rollupBaseConfig);

			const allBundles = [
				umdConfig,
				minifiedUmdConfig,
				fesm5config,
				fesm2015config
			].map(async cfg => {
				const bundle = await rollup.rollup(cfg);
				return bundle.write(cfg.output);
			});

			await Promise.all(allBundles);
			console.info('All bundles generated successfully.');
		} catch(error){
			error.message = 'Bundles generation failed: ' + error.message;
			throw error;
		}

		// Copy package files
		try{
			_relativeCopy('LICENSE', rootFolder, distFolder);
			_relativeCopy('package.json', rootFolder, distFolder);
			_relativeCopy('README.md', rootFolder, distFolder);
			console.info('Package files copy succeeded.');
		} catch(error){
			error.message = 'Package files copy failed: ' + error.message;
			throw error;
		}
	} catch(error){
		console.error('Build failed. See below for errors.\n');
		console.error(error);
		process.exit(1);
	}
})();


// Copy files maintaining relative paths.
async function _relativeCopy(fileGlob, from, to) {
	return new Promise((resolve, reject) => {
		glob(fileGlob, { cwd: from, nodir: true }, (err, files) => {
			if (err){
				return reject(err);
			}
			files.forEach(file => {
				const origin = path.join(from, file);
				const dest = path.join(to, file);
				const data = fs.readFileSync(origin, 'utf-8');
				_recursiveMkDir(path.dirname(dest));
				fs.writeFileSync(dest, data);
			});
			return resolve();
		})
	});
}

// Recursively create a dir.
function _recursiveMkDir(dir) {
	if (!fs.existsSync(dir)) {
		_recursiveMkDir(path.dirname(dir));
		fs.mkdirSync(dir);
	}
}