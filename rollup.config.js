import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import size from 'rollup-plugin-size'
import pkg from './package.json'

export default [
  // Browser Build
  {
    input: 'src/main.js',
    external: ['react', '@qvvg/sos'],
    output: {
      name: 'sidecar',
      file: pkg.browser,
      format: 'umd',
      globals: {
        react: 'React',
        '@qvvg/sos': 'sos',
      },
    },
    plugins: [resolve(), babel(), commonjs(), size()],
  },
  // CommonJS build
  {
    input: 'src/main.js',
    external: ['react', '@qvvg/sos'],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    plugins: [resolve(), babel(), commonjs(), size()],
  },
]
