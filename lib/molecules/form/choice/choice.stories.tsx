import {Formik} from 'formik';
import React, {ReactElement} from 'react';
import styled from 'styled-components';

import Choice from './choice';

const ChoiceStyled = styled(Choice)`
  flex-basis: calc(50% - 8px);
`;

export const Working = (): ReactElement => {
  return (
    <Formik initialValues={{gender: 'male'}} onSubmit={() => {}}>
      {({values}) => (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '200px',
            }}
          >
            <ChoiceStyled
              id="choice-gender-male"
              isChecked={values.gender === 'male'}
              label="Mr"
              name="gender"
              value="male"
            />
            <ChoiceStyled
              id="choice-gender-female"
              isChecked={values.gender === 'female'}
              label="Mrs"
              name="gender"
              value="female"
            />
          </div>
          <hr />
          <div>selected value : {values.gender}</div>
        </>
      )}
    </Formik>
  );
};

Working.storyName = 'Working example';

export default {
  component: Choice,
  parameters: {
    layout: 'centered',
  },
  title: 'Design System/Molecules/Form/Choice',
};
