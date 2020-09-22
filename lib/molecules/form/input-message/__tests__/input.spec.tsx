import {render} from '@testing-library/react';
import React from 'react';

import ThemeProvider from '@utils/providers/theme-provider';

import FormInputMessage from '../input-message';

const message = 'this is a banner';

describe('Form input message', () => {
  test('should display the message', () => {
    const {getByText} = render(
      <ThemeProvider>
        <FormInputMessage level="positive">{message}</FormInputMessage>
      </ThemeProvider>,
    );
    expect(getByText(message)).toBeInTheDocument();
  });
});
