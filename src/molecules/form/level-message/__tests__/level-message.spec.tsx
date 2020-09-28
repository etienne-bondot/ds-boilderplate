import {render} from '@testing-library/react';
import React from 'react';

import ThemeProvider from '@utils/providers/theme-provider';

import LevelMessage from '../level-message';

const message = 'this is a banner';

describe('Form input message', () => {
  test('should display the message', () => {
    const {getByText} = render(
      <ThemeProvider>
        <LevelMessage level="positive">{message}</LevelMessage>
      </ThemeProvider>,
    );
    expect(getByText(message)).toBeInTheDocument();
  });
});
