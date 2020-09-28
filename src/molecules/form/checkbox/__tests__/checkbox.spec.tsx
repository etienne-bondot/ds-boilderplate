import {act, render, fireEvent, waitFor} from '@testing-library/react';
import {Formik} from 'formik';
import React from 'react';

import ThemeProvider from '@utils/providers/theme-provider';

import Checkbox from '../checkbox';

describe('Checkbox', () => {
  test('should change the checked attribute when clicked', async () => {
    const {getByTestId} = render(
      <ThemeProvider>
        <Formik initialValues={{myCheckbox: false}} onSubmit={() => {}}>
          <Checkbox
            dataTestId="test"
            id="uniqueId"
            label={<span>my checkbox</span>}
            name="myCheckbox"
          />
        </Formik>
      </ThemeProvider>,
    );

    const checkbox = getByTestId('test') as HTMLInputElement;

    act(() => {
      fireEvent.click(checkbox);
    });

    await waitFor(() => {});

    expect(checkbox.checked).toBe(true);
  });
});
