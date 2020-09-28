import React, {ReactElement} from 'react';
import styled, {css} from 'styled-components';

import {Level} from '@utils/form/levelMessage';

import Dots from './dots';

const levels = {
  negative: 'negative',
  positive: 'positive',
};

type Modifier = 'hover' | 'background';

const getColorFromLevel = (level: Level, modifier?: Modifier) => {
  return modifier ? `${levels[level]}_${modifier}` : levels[level];
};

const genColBackgborder = (
  color: string,
  backgroundColor: string,
  borderColor: string,
) => {
  return ({theme}: {theme: any}) => css`
    ${color &&
    css`
      color: ${theme.colors[color]};
    `};
    ${backgroundColor &&
    css`
      background-color: ${theme.colors[backgroundColor]};
    `};
    ${borderColor &&
    css`
      border-color: ${theme.colors[borderColor]};
    `};
  `;
};

const UiButton = styled.button<{
  isLoading: boolean;
  level: Level;
  uiType: UiType;
}>`
  &&&&& {
    /* TODO: to remove when all buttons are from DS */
    /* reset */
    flex: initial;
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background-color: transparent;
    color: inherit;
    font: inherit;
    line-height: normal;
    /* reset end */

    border-radius: 6px;
    border-width: 1px;
    border-style: solid;
    ${({theme}) => theme.typography.baseBold};
    padding: 10px 16px;

    cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};

    ${({disabled, isLoading, level, theme, uiType}) => {
      switch (uiType) {
        case 'primary':
          return disabled && !isLoading
            ? genColBackgborder(
                'label_secondary',
                'disabled_background',
                'border',
              )
            : css`
                ${genColBackgborder(
                  'foreground_primary',
                  getColorFromLevel(level),
                  getColorFromLevel(level),
                )}
                &:hover {
                  ${!isLoading &&
                  genColBackgborder(
                    'foreground_primary',
                    getColorFromLevel(level, 'hover'),
                    getColorFromLevel(level, 'hover'),
                  )}
                }
              `;
        case 'secondary':
          return disabled && !isLoading
            ? genColBackgborder(
                'label_secondary',
                'foreground_primary',
                'border',
              )
            : css`
                ${genColBackgborder(
                  getColorFromLevel(level),
                  'foreground_primary',
                  'border',
                )}
                &:hover {
                  ${!isLoading &&
                  genColBackgborder(
                    getColorFromLevel(level),
                    getColorFromLevel(level, 'background'),
                    'border',
                  )}
                }
              `;
        case 'link':
          return disabled
            ? css`
                ${theme.typography.base};
                color: ${theme.colors.label_secondary};
                border: 0;
                padding: 0;
              `
            : css`
                ${theme.typography.base};
                color: ${theme.colors[getColorFromLevel(level)]};
                border: 0;
                padding: 0;
                &:hover {
                  color: ${theme.colors[getColorFromLevel(level, 'hover')]};
                }
              `;
        case 'linkSmall':
          return css`
            ${theme.typography.small};
            color: ${theme.colors.label_secondary};
            border: 0;
            padding: 0;
            text-decoration: underline;
          `;
        default:
          return null;
      }
    }};

    ${({isLoading}) =>
      isLoading &&
      css`
        & > span {
          opacity: 0;
        }
        display: inline-flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      `}
  }
`;

const WrappedDots = styled(Dots)`
  position: absolute;
`;

export type UiType = 'primary' | 'secondary' | 'link' | 'linkSmall';

type Props = {
  children: React.ReactNode;
  className?: string;
  dataTestId?: string;
  id?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  level?: Level;
  onClick?: () => void;
  uiType?: UiType;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({
  children,
  className,
  dataTestId,
  id,
  isDisabled = false,
  isLoading = false,
  level = 'positive',
  onClick = () => {},
  type = 'button',
  uiType = 'primary',
}: Props): ReactElement => {
  return (
    <UiButton
      className={className}
      data-testid={dataTestId}
      disabled={isDisabled || isLoading}
      id={id}
      isLoading={isLoading}
      level={level}
      onClick={onClick}
      type={type}
      uiType={uiType}
    >
      {isLoading && <WrappedDots mainColor={levels[level]} uiType={uiType} />}
      <span>{children}</span>
    </UiButton>
  );
};

export default Button;
