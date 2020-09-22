import React, {ReactElement} from 'react';
import styled, {css, keyframes} from 'styled-components';

import {UiType} from './button';

const blink = keyframes`
  0% {
    opacity: .4;
  }

  20% {
    opacity: 1;
  }

  100% {
    opacity: .4;
  }
`;

const DotsWrapper = styled.div`
  width: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Dot = styled.span<{
  mainColor: string;
  uiType: UiType;
  second?: boolean;
  third?: boolean;
}>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: ${blink} 1200ms infinite both;

  ${({theme, mainColor, uiType}) => {
    if (uiType === 'primary') {
      return css`
        background-color: ${theme.colors.foreground_primary};
      `;
    }
    if (uiType === 'secondary') {
      return css`
        background-color: ${theme.colors[mainColor]};
      `;
    }
    return null;
  }};
  ${({second}) =>
    second &&
    css`
      animation-delay: 200ms;
    `}
  ${({third}) =>
    third &&
    css`
      animation-delay: 400ms;
    `}
`;

type Props = {
  className?: string;
  mainColor: string;
  uiType: UiType;
};

const Dots = ({className, mainColor, uiType}: Props): ReactElement => (
  <DotsWrapper className={className}>
    <Dot mainColor={mainColor} uiType={uiType} />
    <Dot mainColor={mainColor} second uiType={uiType} />
    <Dot mainColor={mainColor} third uiType={uiType} />
  </DotsWrapper>
);

export default Dots;
