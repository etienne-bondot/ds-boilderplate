import {action} from '@storybook/addon-actions';
import {boolean, select} from '@storybook/addon-knobs';
import React, {ReactElement} from 'react';
import styled from 'styled-components';

import {Level} from '@utils/form/levelMessage';

import Button from './button';

const Container = styled.div`
  border-bottom: 1px solid lightgrey;
  & > button {
    margin: 20px !important;
  }
`;

const AllButtons = (level: Level) => (
  <Container>
    <Button level={level} onClick={action('click button')} uiType="primary">
      primary
    </Button>
    <Button
      isDisabled
      level={level}
      onClick={action('click button')}
      uiType="primary"
    >
      disabled // primary
    </Button>
    <Button
      isLoading
      level={level}
      onClick={action('click button')}
      uiType="primary"
    >
      primary
    </Button>
    <br />
    <Button level={level} onClick={action('click button')} uiType="secondary">
      secondary
    </Button>
    <Button
      isDisabled
      level={level}
      onClick={action('click button')}
      uiType="secondary"
    >
      disabled // secondary
    </Button>
    <Button
      isLoading
      level={level}
      onClick={action('click button')}
      uiType="secondary"
    >
      secondary
    </Button>
    <br />
    <Button level={level} onClick={action('click button')} uiType="link">
      large // link
    </Button>
    <Button
      isDisabled
      level={level}
      onClick={action('click button')}
      uiType="link"
    >
      large // link
    </Button>
    <Button level={level} onClick={action('click button')} uiType="linkSmall">
      small // link
    </Button>
  </Container>
);

export const All = (): ReactElement => {
  return (
    <>
      {['positive', 'negative'].map((level) => (
        <div key={level}>{AllButtons(level as Level)}</div>
      ))}
    </>
  );
};

export const Knobs = (): ReactElement => {
  const uiType = select('uiType', ['primary', 'secondary'], 'primary');
  const isLoading = boolean('isLoading', false);
  const isDisabled = boolean('isDisabled', false);

  return (
    <Button
      isDisabled={isDisabled}
      isLoading={isLoading}
      onClick={action('click button')}
      uiType={uiType}
    >
      mybutton
    </Button>
  );
};

export default {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  title: 'Design System/Molecules/Form/Button',
};
