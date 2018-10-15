module.exports = {
  // We're expecting to be testing in a node environment
  testEnvironment: "node",

  // Look for files matching `*.spec.ts(x)`
  testMatch: ["**/?(*.)+(spec).ts?(x)"],

  // Run TS files using `ts-jest`
  transform: { "^.+\\.(ts|tsx)$": "ts-jest" },

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  /*
    Transform imports using package paths...

    `import * as <Package> from "~/<package>";`

    becomes...

    `import * as <Package> from "<rootDir>/packages/<package>/src";`
  */
  moduleNameMapper: { "~(.*)$": "<rootDir>/packages/$1/src" }
};
