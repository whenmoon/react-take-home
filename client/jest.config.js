// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)?$': 'ts-jest',
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  testEnvironment: "jsdom"
};