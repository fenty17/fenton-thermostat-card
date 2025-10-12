const resolve = require('@rollup/plugin-node-resolve');
const terser = require('@rollup/plugin-terser'); // <-- remove .terser
const typescript = require('@rollup/plugin-typescript');

module.exports = {
  input: 'src/fenton-thermostat-card.ts',
  output: {
    file: 'dist/fenton-thermostat-card.js',
    format: 'es',
    sourcemap: false,
  },
  plugins: [
    resolve(),
    typescript({ tsconfig: './tsconfig.json' }),
    terser(), // <-- no .terser on call
  ],
};