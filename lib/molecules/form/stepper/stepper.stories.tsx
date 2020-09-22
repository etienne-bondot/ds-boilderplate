import {select} from '@storybook/addon-knobs';
import React, {ReactElement, useState} from 'react';

import {Level} from '@utils/form/levelMessage';

import Stepper from './stepper';

const levels: Level[] = ['negative', 'positive'];

export const Working = (): ReactElement => {
  const [value, setValue] = useState(10);
  const handleChange = (val: number) => setValue(val);

  return (
    <Stepper
      minMax={{max: 40, min: 20}}
      onChange={handleChange}
      value={value}
    />
  );
};

Working.storyName = 'Working example';

export const Knobs = (): ReactElement => {
  const [value, setValue] = useState(10);
  const level = select('level', levels, levels[0]);
  const handleChange = (val: number) => setValue(val);

  return (
    <Stepper
      level={level}
      minMax={{max: 40, min: 20}}
      onChange={handleChange}
      value={value}
    />
  );
};

export default {
  component: Stepper,
  parameters: {
    layout: 'centered',
  },
  title: 'Design System/Molecules/Form/Stepper',
};
