# ds-boilderplate

![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)

A design system boilderplate. This project skeleton was created to help people get started with creating their own React component library with:

- written in React with [TypeScript](https://www.typescriptlang.org/)
- test with [Jest](https://jestjs.io/)
- exposed with [Storybook](https://storybook.js.org/) to help you create and show off your components
- build with [Rollup](https://github.com/rollup/rollup)

**Features**:

- [`styled-components`](https://styled-components.com/)

## Development

### Testing

To run all the tests (linter, typescript and Jest)

```
yarn test
```

| Command     | Description             |
| ----------- | ----------------------- |
| `linter`    | run the linter (ESLint) |
| `test:jest` | run the jest tests      |
| `tsc`       | test the type checking  |

### Building

```
yarn build
```

### Storybook

To run a live-reload Storybook server on your local machine

```
yarn install
yarn start
```

### Installing Component Library Locally

Let's say you have another project (`test-app`) on your machine that you want to try installing the component library into without having to first publish the component library. In the `test-app` directory, you can run:

```
yarn add ../ds-boilderplate
```

which will install the local component library as a dependency in `test-app`. It'll then appear as a dependency in `package.json` like:

```JSON
  ...
  "dependencies": {
    ...
    "ds-boilderplate": "file:../ds-boilderplate",
    ...
  },
  ...
```

Your components can then be imported and used in that project.

## Publishing

### Hosting via NPM

First, make sure you have an NPM account and are [logged into NPM using the `npm login` command.](https://docs.npmjs.com/creating-a-new-npm-user-account)

Then update the `name` field in `package.json` to reflect your NPM package name in your private or public NPM registry. Then run:

```
yarn publish
```

## Usage

Let's say you created a public NPM package called `my-component-library` with the `TestComponent` component created in this repository.

Usage of the component (after the library installed as a dependency into another project) will be:

```TSX
import React from 'react;';
import {TestComponent} from 'my-component-library';

const App = () => (
  <div className="app-container">
    <h1>Hello I'm consuming the component library</h1>
    <TestComponent theme="primary" />
  </div>
);

export default App;
```

[Check out this Code Sandbox for a live example.](https://codesandbox.io/s/harvey-component-library-example-y2b60?file=/src/App.js)