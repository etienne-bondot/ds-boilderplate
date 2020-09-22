import {number} from '@storybook/addon-knobs';
import React from 'react';
import styled from 'styled-components';

import ProgressBar from './progress-bar';

const Wrapper = styled.div`
  width: 300px;

  & > div {
    margin-bottom: 20px;
  }
`;

export const Working = () => {
  return (
    <Wrapper>
      <ProgressBar value={25} />
      <ProgressBar value={50} />
      <ProgressBar value={75} />
      <ProgressBar value={100} />
    </Wrapper>
  );
};

Working.storyName = 'Working example';

export const Knobs = () => {
  const value = number('value', 20, {
    max: 100,
    min: 0,
    range: true,
    step: 0.5,
  });

  return (
    <Wrapper>
      <ProgressBar value={value} />
    </Wrapper>
  );
};

export default {
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  title: 'Design System/Molecules/ProgressBars',
};
