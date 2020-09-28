import {boolean, select, text} from '@storybook/addon-knobs';
import {Formik} from 'formik';
import React, {ReactElement} from 'react';

import Textfield from './textfield';

export const Working = (): ReactElement => {
  const initialValues = {
    textField1: '',
    textField2: '',
    textField3: '',
    textField4: '',
    textField5: '',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <>
        <Textfield
          helperMessage="testing.helper_message"
          id="uniqueId-1"
          isDisabled
          label="Disabled TextField"
          name="textField1"
          validMessage="testing.valid_message"
        />
        <br />
        <Textfield
          helperMessage="testing.helper_message"
          id="uniqueId-2"
          label="Simple TextField"
          name="textField2"
          validMessage="testing.valid_message"
        />
        <br />
        <Textfield
          helperMessage="testing.helper_message"
          id="uniqueId-3"
          label="Password TextField"
          name="textField3"
          type="password"
          validMessage="testing.valid_message"
        />
        <br />
        <Textfield
          actionLabel="Apply"
          helperMessage="testing.helper_message"
          id="uniqueId-4"
          label="TextField with action"
          name="textField4"
          validMessage="testing.valid_message"
          withAction
        />
      </>
    </Formik>
  );
};

Working.storName = 'Working examples';

export const Knobs = (): ReactElement => {
  const actionLabel = text('actionLabel', 'Apply');
  const withAction = boolean('withAction', false);
  const type = select(
    'type',
    ['date', 'text', 'password', 'email', 'tel'],
    'password',
  );
  const label = text('label', 'label');
  const isDisabled = boolean('isDisabled', false);
  const onError = boolean('error', false);
  const validMessage = text('validMessage', 'testing.valid_message');
  const helperMessage = text('helperMessage', 'testing.helper_message');

  const validate = () => {
    return onError
      ? {
          textField1: 'My error message',
        }
      : {};
  };

  return (
    <Formik
      initialValues={{textField1: ''}}
      onSubmit={() => {}}
      validate={validate}
    >
      <>
        <Textfield
          actionLabel={actionLabel}
          helperMessage={helperMessage}
          id="uniqueId-1"
          isDisabled={isDisabled}
          label={label}
          name="textField1"
          type={type}
          validMessage={validMessage}
          withAction={withAction}
        />
      </>
    </Formik>
  );
};

export default {
  component: Textfield,
  parameters: {
    layout: 'centered',
  },
  title: 'Design System/Molecules/Form/Textfield',
};
