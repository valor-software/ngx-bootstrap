module.exports = function(config) {
  config.set({
    frameworks: ["jasmine", "karma-typescript"],
    files: [
      { pattern: "src/bs-moment/**/*.+(ts|html)" }
    ],
    preprocessors: {
      "**/*.ts": "karma-typescript"
    },
    reporters: ["progress", "karma-typescript"],
    browsers: ["Chrome"],
    karmaTypescriptConfig: {
      bundlerOptions: {
        entrypoints: /\.spec\.ts$/
      },
      compilerOptions: {
        lib: ["ES2015", "DOM"]
      }
    }
  });
};
