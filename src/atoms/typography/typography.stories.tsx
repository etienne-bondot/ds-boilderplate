import {select, boolean, text} from '@storybook/addon-knobs';
import React, {ReactElement} from 'react';
import styled from 'styled-components';

import Text, {texts, TextUiType} from './text';

const TextWithBorder = styled(Text)`
  && {
    border: 1px dashed lightgrey;
    margin: 10px 0 30px;
  }
`;

export const All = (): ReactElement => {
  return (
    <div
      style={{
        alignItems: 'flex-start',
        display: 'flex',
        flexFlow: 'row wrap',
        margin: '20px',
      }}
    >
      {Object.keys(texts).map((textItem: string) => (
        <div key={textItem} style={{paddingLeft: '20px', width: '33%'}}>
          {textItem} : <br />
          <TextWithBorder uiType={textItem as TextUiType}>
            Blabla bla bla
          </TextWithBorder>
        </div>
      ))}
    </div>
  );
};

export const Knobs = (): ReactElement => {
  const uiTypes = Object.keys(texts);
  const elements = ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5'];

  const uiType = select('uiType :', uiTypes, uiTypes[0]);
  const element = select('Element :', elements, elements[0]);
  const noPadding = boolean('noPadding : ', false);
  const infoText = text('Text : ', 'blabla blabla');

  return (
    <TextWithBorder
      element={element as React.ElementType}
      noPadding={noPadding}
      uiType={uiType as TextUiType}
    >
      {infoText}
    </TextWithBorder>
  );
};

export default {
  component: Text,
  title: 'Design System/Atoms/Typography',
};
