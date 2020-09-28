import {select, text} from '@storybook/addon-knobs';
import React, {ReactElement} from 'react';

import {Level} from '@utils/form/levelMessage';

import InfoBanner from './info-banner';

const levels: Level[] = ['negative', 'positive'];

export const All = (): ReactElement => (
  <>
    <div>Note that the icon can be customized</div>
    <br />
    {levels.map((level) => (
      <div key={level} style={{marginBottom: '20px'}}>
        <div style={{marginBottom: '10px'}}>{level} :</div>
        <InfoBanner level={level}>"Blabla bla bla blablabla"</InfoBanner>
      </div>
    ))}
  </>
);

export const Knobs = (): ReactElement => {
  const level = select('level', levels, levels[0]);
  const infoText = text('children', 'this is an information banner');

  return <InfoBanner level={level}>{infoText}</InfoBanner>;
};

export default {
  component: InfoBanner,
  parameters: {
    layout: 'centered',
  },
  title: 'Design System/Molecules/InfoBanner',
};
