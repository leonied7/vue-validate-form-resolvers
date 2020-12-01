import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import pkg from './package.json';

// browser-friendly UMD build
function getBrowserConfig(input, outputFile, name) {
  return {
    input,
    output: {
      name,
      file: outputFile,
      format: 'umd',
      exports: 'named'
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: ['node_modules/**']
      })
    ]
  };
}

// CommonJS (for Node) build.
function getCommonJSConfig(input, outputFile) {
  return {
    input,
    external: [],
    output: { file: outputFile, format: 'cjs', exports: 'named' }
  };
}

// ES module (for bundlers) build.
function getEsConfig(input, outputFile) {
  return {
    input,
    external: [],
    output: { file: outputFile, format: 'es', exports: 'named' }
  };
}

export default [
  getBrowserConfig('src/index.js', pkg.browser, 'VueValidateFormResolvers'),

  getCommonJSConfig('src/index.js', pkg.main),

  getEsConfig('src/index.js', pkg.module)
];
