import {boolean} from '@storybook/addon-knobs';
import {Formik} from 'formik';
import React, {ReactElement} from 'react';
import styled from 'styled-components';

import Text from '../../../atoms/typography/text';

import Select from './select';

const FlexWrapper = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  border: 1px solid #adadad;
  border-radius: 6px;
  padding: 20px;
  margin: 0 20px;
`;

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

export const Working = (): ReactElement => {
  return (
    <Formik initialValues={{mySelect: null}} onSubmit={() => {}}>
      {() => <Select label="Label" name="mySelect" options={options} />}
    </Formik>
  );
};

Working.storyName = 'Working example';

export const Knobs = (): ReactElement => {
  const disabled = boolean('disabled', false);
  const onError = boolean('error', false);

  const validate = () => {
    return onError
      ? {
          mySelect: 'My error message',
        }
      : {};
  };

  return (
    <Formik
      initialValues={{mySelect: undefined, mySelect2: 'option 2'}}
      onSubmit={() => {}}
      validate={validate}
    >
      {({values}) => (
        <FlexWrapper>
          <Wrapper>
            <Text uiType="h2">No initial value</Text>
            <Select
              disabled={disabled}
              label="Select an option"
              name="mySelect"
              options={options}
            />
            <hr />
            <div>value: {values.mySelect}</div>
          </Wrapper>
          <Wrapper>
            <Text uiType="h2">With initial value</Text>
            <Select
              disabled={disabled}
              label="Label"
              name="mySelect2"
              options={options}
            />
            <hr />
            <div>value: {values.mySelect2}</div>
          </Wrapper>
        </FlexWrapper>
      )}
    </Formik>
  );
};

export default {
  component: Select,
  parameters: {
    layout: 'centered',
  },
  title: 'Design System/Molecules/Form/Select',
};
