const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig.json");

/**
 * @type { import("@jest/types/build/Config").InitialOptions }
 */
module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  preset: "ts-jest",
  testEnvironment: "node",
};
