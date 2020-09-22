import {boolean, text} from '@storybook/addon-knobs';
import {Formik} from 'formik';
import React, {ReactElement} from 'react';

import Checkbox from './checkbox';

export const Working = (): ReactElement => {
  return (
    <Formik initialValues={{myCheckbox: true}} onSubmit={() => {}}>
      {({values}) => (
        <>
          <Checkbox
            helperMessage="This a a little helper message"
            id="uniqueId"
            label={<span>my checkbox</span>}
            name="myCheckbox"
          />
          <hr />
          <div>{values.myCheckbox ? 'isChecked' : 'not isChecked'}</div>
        </>
      )}
    </Formik>
  );
};

Working.storyName = 'Working example';

export const Knobs = (): ReactElement => {
  const label = text('label', 'My checkbox');
  const isDisabled = boolean('isDisabled', false);
  const isChecked = boolean('isChecked', false);
  const onError = boolean('error', false);
  const helperMessage = text(
    'helperMessage',
    'This is a little helper message',
  );

  const validate = () => {
    return onError
      ? {
          myCheckbox: 'My error message',
        }
      : {};
  };

  return (
    <Formik
      initialValues={{myCheckbox: isChecked}}
      onSubmit={() => {}}
      validate={validate}
    >
      {() => (
        <Checkbox
          helperMessage={helperMessage}
          id="uniqueId"
          isDisabled={isDisabled}
          label={label}
          name="myCheckbox"
        />
      )}
    </Formik>
  );
};

export default {
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  title: 'Design System/Molecules/Form/Checkbox',
};
