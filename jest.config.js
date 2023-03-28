module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "moduleNameMapper": {
      "\\.(css|less)$": "<rootDir>/__mocks__/loaders/styleMock.js",
      "\\.(gif|jpe?g|png|svg)$": "<rootDir>/__mocks__/loaders/fileMock.js"
    }
}
