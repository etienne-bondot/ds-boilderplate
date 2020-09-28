/*  eslint-disable */
// @ts-nocheck

import initStoryshots, {
  Stories2SnapsConverter,
} from '@storybook/addon-storyshots';
import {render} from '@testing-library/react';
import {act, create} from 'react-test-renderer';

import 'jest-styled-components';
import {styleSheetSerializer} from 'jest-styled-components/serializer';
import {addSerializer} from 'jest-specific-snapshot';

const reactTestingLibrarySerializer = {
  print: (val, serialize) => serialize(val.container.firstChild),
  test: (val) => val && val.hasOwnProperty('container'),
};

const wait = () =>
  act(
    () =>
      new Promise((resolve) => {
        setTimeout(resolve, 10);
      }),
  );

addSerializer(styleSheetSerializer);

jest.mock('global', () => global);

const runTest = async (story, context) => {
  // Modal uses Sticky which jsdom doesn't handle well
  if (
    story.kind.includes('Design System') &&
    !story.kind.includes('Atoms/Icons') &&
    !story.kind.includes('Molecules/Modal')
  ) {
    const converter = new Stories2SnapsConverter();
    const snapshotFilename = converter.getSnapshotFileName(context);

    const storyElement = story.render(context);

    let tree;
    act(() => {
      tree = create(storyElement);
    });

    await wait();
    expect(tree.toJSON()).toMatchSpecificSnapshot(snapshotFilename);
    tree.unmount();
  }
};

initStoryshots({
  asyncJest: true,
  framework: 'react',
  renderer: render,
  snapshotSerializers: [reactTestingLibrarySerializer],
  test: async ({story, context, done}) => {
    runTest(story, context).then(done);
  },
});
