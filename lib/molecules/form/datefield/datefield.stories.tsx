import {boolean, text} from '@storybook/addon-knobs';
import {Formik} from 'formik';
import React, {ReactElement} from 'react';

import DateField from './datefield';

export const Working = (): ReactElement => {
  return (
    <div style={{width: '300px'}}>
      <Formik initialValues={{dateOfBirth: null}} onSubmit={() => {}}>
        {({submitForm}) => (
          <>
            <DateField
              label="Date of birth"
              name="dateOfBirth"
              validate={(date) => {
                if (!date?.isValid()) {
                  return 'Invalid date';
                }
                if (!date.isBetween('1920', '2010')) {
                  return 'Date must be between 2000 and 2020';
                }
                return '';
              }}
            />
            <button
              onClick={() => submitForm()}
              style={{marginTop: '40px'}}
              type="submit"
            >
              submit
            </button>
          </>
        )}
      </Formik>
    </div>
  );
};

Working.storyName = 'Working example';

export const Knobs = (): ReactElement => {
  const label = text('label', 'Label');
  const onError = boolean('error', false);

  return (
    <div style={{width: '300px'}}>
      <Formik initialValues={{dateOfBirth: null}} onSubmit={() => {}}>
        {() => (
          <>
            <DateField
              label={label}
              name="dateOfBirth"
              validate={() => (onError ? 'My error message' : '')}
            />
          </>
        )}
      </Formik>
    </div>
  );
};

export default {
  component: DateField,
  parameters: {
    layout: 'centered',
  },
  title: 'Design System|Molecules/Form/DateField',
};
