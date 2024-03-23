import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.tsx",
  output: {
    file: "build/bundle.js",
    format: "cjs",
    name: "react-is-keyboard-user",
    // sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    babel({
      babelHelpers: "runtime",
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          { corejs: 3, helpers: true, regenerator: true },
        ],
      ],
      exclude: "node_modules/**",
    }),
    terser(),
  ],
};
