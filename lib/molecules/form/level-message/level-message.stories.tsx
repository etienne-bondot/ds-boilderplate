import {select} from '@storybook/addon-knobs';
import React, {ReactElement, ReactNode} from 'react';

import {Level} from '@utils/form/levelMessage';

import LevelMessage from './level-message';

const levels: Level[] = ['negative', 'positive'];

export const All = (): ReactNode => {
  return levels.map((level: string) => (
    <LevelMessage key={level} level={level as Level}>
      form <strong>message</strong>
    </LevelMessage>
  ));
};

export const Knobs = (): ReactElement => {
  const level: Level = select('level', levels, levels[0]);

  return (
    <LevelMessage level={level}>
      form <strong>message</strong>
    </LevelMessage>
  );
};

export default {
  component: LevelMessage,
  parameters: {
    layout: 'centered',
  },
  title: 'Design System/Molecules/Form/LevelMessage',
};
