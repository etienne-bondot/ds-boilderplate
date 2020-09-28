import {act, render, fireEvent, waitFor} from '@testing-library/react';
import {Formik} from 'formik';
import React from 'react';

import ThemeProvider from '@utils/providers/theme-provider';

import RadioButton from '../radio-button';

describe('Radio Button', () => {
  test('should change the checked attribute when clicked', async () => {
    const {getByTestId} = render(
      <ThemeProvider>
        <Formik initialValues={{myRadio: 'value1'}} onSubmit={() => {}}>
          <>
            <RadioButton
              dataTestId="test1"
              id="uniqueId"
              label={<span>my radio 1</span>}
              name="myRadio"
              value="value1"
            />
            <RadioButton
              dataTestId="test2"
              id="uniqueId2"
              label={<span>my radio 2</span>}
              name="myRadio"
              value="value2"
            />
          </>
        </Formik>
      </ThemeProvider>,
    );

    const radio1 = getByTestId('test1') as HTMLInputElement;
    const radio2 = getByTestId('test2') as HTMLInputElement;

    act(() => {
      fireEvent.click(radio2);
    });

    await waitFor(() => {});

    expect(radio2.checked).toBe(true);
    expect(radio1.checked).toBe(false);
  });
});
