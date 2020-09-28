module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ["<rootDir>/lib/", "<rootDir>/build/"],
  moduleNameMapper: {
    '@hooks(.*)$': '<rootDir>/src/hooks/$1',
    '@utils(.*)$': '<rootDir>/src/utils/$1',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
