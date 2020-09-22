import {Formik} from 'formik';
import React, {ReactElement} from 'react';

import TextArea from './textarea';

export const Working = (): ReactElement => {
  const initialValues = {
    textArea1: '',
    textArea2: '',
    textArea3: '',
    textArea4: 'Textarea with helper',
  };

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <>
        <TextArea name="textArea1" placeholder="Simple Textarea" />
        <TextArea isDisabled name="textArea2" placeholder="Disabled Textarea" />
        <TextArea name="textArea3" placeholder="Tall Textarea" rows={15} />
        <TextArea
          helperMessage="common.textarea.helper_message"
          name="textArea4"
          placeholder="Textarea with helper"
        />
      </>
    </Formik>
  );
};

Working.storyName = 'Working example';

export default {
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  title: 'Design System/Molecules/Form/Textarea',
};
