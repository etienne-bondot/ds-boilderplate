import {act, render, fireEvent, waitFor} from '@testing-library/react';
import React from 'react';

import ThemeProvider from '@utils/providers/theme-provider';

import Button from '../button';

const buttonText = 'my test button';

describe('Button', () => {
  test('should fire onClick when button clicked', async () => {
    const onClick = jest.fn();

    const {getByText} = render(
      <ThemeProvider>
        <Button onClick={onClick}>{buttonText}</Button>
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.click(getByText(buttonText));
    });

    await waitFor(() => {});

    expect(onClick).toHaveBeenCalled();
  });

  test('should not fire onClick when disabled button clicked', async () => {
    const onClick = jest.fn();

    const {getByText} = render(
      <ThemeProvider>
        <Button isDisabled onClick={onClick}>
          {buttonText}
        </Button>
      </ThemeProvider>,
    );

    act(() => {
      fireEvent.click(getByText(buttonText));
    });

    await waitFor(() => {});

    expect(onClick).not.toHaveBeenCalled();
  });
});
