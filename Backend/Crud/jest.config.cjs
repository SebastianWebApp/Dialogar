// jest.config.cjs
module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // Mapea imports .js a .ts
  },
  extensionsToTreatAsEsm: [".ts"],
};
