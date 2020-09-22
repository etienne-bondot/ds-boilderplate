import {act, fireEvent, render, waitFor} from '@testing-library/react';
import {Formik} from 'formik';
import React from 'react';

import ThemeProvider from '@utils/providers/theme-provider';

import Select from '../select';

const options = [
  {
    label: 'option 1',
    value: 'option 1',
  },
  {
    label: 'option 2',
    value: 'option 2',
  },
  {
    label: 'option 3',
    value: 'option 3',
  },
];

describe('Select', () => {
  test('should change the option', async () => {
    const {getByTestId} = render(
      <ThemeProvider>
        <Formik initialValues={{mySelect: ''}} onSubmit={() => {}}>
          <Select
            dataTestId="test"
            label="label"
            name="mySelect"
            options={options}
          />
        </Formik>
      </ThemeProvider>,
    );

    const select = getByTestId('test') as HTMLSelectElement;

    act(() => {
      fireEvent.change(select, {target: {value: 'option 2'}});
    });

    await waitFor(() => {});

    expect(select.value).toBe('option 2');
  });
});
