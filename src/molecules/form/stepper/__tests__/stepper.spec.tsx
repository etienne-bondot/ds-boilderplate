import {act, fireEvent, render, waitFor} from '@testing-library/react';
import React from 'react';

import ThemeProvider from '@utils/providers/theme-provider';

import Stepper from '../stepper';

describe('Stepper', () => {
  test('should have the default value', () => {
    const handleChange = jest.fn();
    const {getByText} = render(
      <ThemeProvider>
        <Stepper
          dataTestId="test"
          formatDisplayValue={(v) => `test${v}`}
          minMax={{
            max: 13,
            min: 0,
          }}
          onChange={handleChange}
          value={10}
        />
      </ThemeProvider>,
    );
    expect(getByText('test10')).toBeInTheDocument();
  });

  test('should call onChange with 9 after decrementing', async () => {
    const handleChange = jest.fn();
    const {container} = render(
      <ThemeProvider>
        <Stepper
          dataTestId="test"
          formatDisplayValue={(v) => `test${v}`}
          minMax={{
            max: 13,
            min: 0,
          }}
          onChange={handleChange}
          value={10}
        />
      </ThemeProvider>,
    );

    const decrementButton = container.getElementsByTagName('button')[0];

    act(() => {
      fireEvent.click(decrementButton);
    });

    await waitFor(() => {});

    expect(handleChange).toHaveBeenCalledWith(9);
  });

  test('should call onChange with 11 after incrementing', async () => {
    const handleChange = jest.fn();
    const {container} = render(
      <ThemeProvider>
        <Stepper
          dataTestId="test"
          formatDisplayValue={(v) => `test${v}`}
          minMax={{
            max: 13,
            min: 0,
          }}
          onChange={handleChange}
          value={10}
        />
      </ThemeProvider>,
    );

    const incrementButton = container.getElementsByTagName('button')[1];

    act(() => {
      fireEvent.click(incrementButton);
    });

    await waitFor(() => {});

    expect(handleChange).toHaveBeenCalledWith(11);
  });
});
