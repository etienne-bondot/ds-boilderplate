import React, {ReactElement} from 'react';
import styled, {css} from 'styled-components';

import {getColorFromLevel, Level} from '@utils/form/levelMessage';

import Text from '../../../atoms/typography/text';

const Wrapper = styled.div`
  width: 100%;
  min-width: 230px;
  height: 44px;
  border-radius: 6px;
  border: 1px solid ${({theme}) => theme.colors.border};
  background-color: ${({theme}) => theme.colors.foreground_primary};
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button<{increment?: boolean}>`
  width: 48px;
  height: 100%;
  background-color: ${({disabled, theme}) =>
    disabled ? theme.colors.disabled_background : 'transparent'};
  border-style: solid;
  border-color: ${({theme}) => theme.colors.border};
  border-width: ${({increment}) => (increment ? '0 0 0 1px' : '0 1px 0 0')};
  border-radius: ${({increment}) =>
    increment ? '0 6px 6px 0' : '6px 0 0 6px'};
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  &::before {
    content: '';
    display: block;
    width: 16px;
    height: 2px;
    background-color: ${({disabled, theme}) =>
      disabled ? theme.colors.label_secondary : theme.colors.positive};
  }
  ${({increment, disabled}) =>
    increment &&
    css`
      &::after {
        content: '';
        position: absolute;
        display: block;
        width: 2px;
        height: 16px;
        background-color: ${({theme}) =>
          disabled ? theme.colors.label_secondary : theme.colors.positive};
      }
    `}
`;

const Content = styled(Text)<{level: Level}>`
  color: ${({level, theme}) => theme.colors[getColorFromLevel(level)]};
  width: 100%;
  text-align: center;
`;

export type MinMax = {
  min: number;
  max: number;
};

type Dispatch = 'increment' | 'decrement';

type Props = {
  className?: string;
  dataTestId?: string;
  level?: Level;
  minMax: MinMax;
  onChange: (_: number) => void;
  formatDisplayValue?: (_: number) => string;
  step?: number;
  value: number;
};

const Stepper = ({
  className,
  dataTestId,
  level,
  minMax,
  onChange,
  formatDisplayValue,
  step = 1,
  value,
}: Props): ReactElement => {
  const handleChange = (val: number, type: Dispatch) => {
    switch (type) {
      case 'increment':
        val += step;
        onChange(val);
        break;
      case 'decrement':
        val -= step;
        onChange(val);
        break;
      default:
    }
  };

  return (
    <Wrapper className={className} data-testid={dataTestId}>
      <Button
        data-testid={dataTestId && `${dataTestId}-decrement`}
        disabled={value === minMax.min}
        onClick={() => handleChange(value, 'decrement')}
      />
      <Content level={level as Level} noPadding uiType="baseBold">
        {formatDisplayValue ? formatDisplayValue(value) : value}
      </Content>
      <Button
        data-testid={dataTestId && `${dataTestId}-increment`}
        disabled={value === minMax.max}
        increment
        onClick={() => handleChange(value, 'increment')}
      />
    </Wrapper>
  );
};

export default Stepper;
