import {boolean} from '@storybook/addon-knobs';
import {Formik} from 'formik';
import React, {ReactElement} from 'react';

import RadioButton from './radio-button';

export const Working = (): ReactElement => {
  return (
    <Formik initialValues={{myRadio: 'value1'}} onSubmit={() => {}}>
      {({values}) => (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '200px',
            }}
          >
            <RadioButton
              id="uniqueId1"
              isChecked={values.myRadio === 'value1'}
              label={<div>radio value1</div>}
              name="myRadio"
              value="value1"
            />
            <RadioButton
              id="uniqueId2"
              isChecked={values.myRadio === 'value2'}
              label={<div>radio value1</div>}
              name="myRadio"
              value="value2"
            />
          </div>
          <hr />
          <div>selected value : {values.myRadio}</div>
        </>
      )}
    </Formik>
  );
};

Working.storyName = 'Working example';

export const Knobs = (): ReactElement => {
  const isDisabled = boolean('isDisabled', false);
  const isChecked = boolean('isChecked', false);
  const onError = boolean('error', false);

  const validate = () => {
    return onError
      ? {
          myRadio: 'My error message',
        }
      : {};
  };

  return (
    <Formik
      initialValues={{myRadio: isChecked ? 'value1' : 'other value'}}
      onSubmit={() => {}}
      validate={validate}
    >
      {({values}) => (
        <RadioButton
          id="uniqueId"
          isChecked={values.myRadio === 'value1'}
          isDisabled={isDisabled}
          label={<div>my radio</div>}
          name="myRadio"
          value="value1"
        />
      )}
    </Formik>
  );
};

export default {
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  title: 'Design System/Molecules/Form/RadioButton',
};
