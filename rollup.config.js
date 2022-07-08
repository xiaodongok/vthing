import typescript from "rollup-plugin-typescript2";

export default {
  input: "./core/index.ts",
  plugins: [typescript()],
  output: {
    file: "dist/index.js",
    format: 'cjs',
    sourcemap: true
  }
}
