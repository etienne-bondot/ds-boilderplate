import {select, text} from '@storybook/addon-knobs';
import React, {ReactElement, ReactNode} from 'react';

import FormInputMessage from './input-message';

const levels = ['helper', 'negative', 'positive'];

type Level = 'helper' | 'negative' | 'positive';

export const All = (): ReactNode => {
  return levels.map((level: string) => (
    <FormInputMessage key={level} level={level as Level}>
      form message
    </FormInputMessage>
  ));
};

export const Knobs = (): ReactElement => {
  const level = select('level', levels, levels[0]);
  const children = text('children', 'this is a form message');

  return <FormInputMessage level={level as Level}>{children}</FormInputMessage>;
};

export default {
  component: FormInputMessage,
  parameters: {
    layout: 'centered',
  },
  title: 'Design System/Molecules/Form/FormInputMessage',
};
