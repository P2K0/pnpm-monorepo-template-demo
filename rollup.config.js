const { nodeResolve } = require("@rollup/plugin-node-resolve");
const { terser } = require("rollup-plugin-terser");

const json = require("@rollup/plugin-json");
const commonjs = require("@rollup/plugin-commonjs");
const { babel } = require("@rollup/plugin-babel");

export default {
  input: "./packages/demo1/src/index.js",
  output: [
    {
      file: "./packages/demo1/dist/index-cjs.js",
      format: "cjs",
      exports: "auto"
    },
    {
      file: "./packages/demo1/dist/index-esm.js",
      format: "esm",
      name: "config"
    },
    {
      file: "./packages/demo1/dist/index-umd.js",
      format: "umd",
      name: "config"
    }
  ],
  plugins: [
    json(),
    commonjs(),
    nodeResolve({
      customResolveOptions: {
        moduleDirectories: "node_modules"
      }
    }),
    babel({
      presets: [["@babel/preset-env"]],
      plugins: [["@babel/plugin-transform-runtime"]],
      babelHelpers: "runtime",
      exclude: "node_modules/**"
    }),
    terser()
  ]
};
