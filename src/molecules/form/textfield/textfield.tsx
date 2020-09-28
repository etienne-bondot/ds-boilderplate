import classNames from 'classnames';
import {useField} from 'formik';
import React, {memo, ReactElement, useRef, useState} from 'react';
import {Transition} from 'react-transition-group';
import {TransitionStatus} from 'react-transition-group/Transition';
import styled, {css} from 'styled-components';

import {fadeIn, fadeOut} from '@utils/animations/animations';

import Icon from '../../../atoms/icons/icon';
import Text from '../../../atoms/typography/text';
import Button from '../button/button';
import FormInputMessage from '../input-message/input-message';

import SvgEye from './eye';

const animateButton = (animationState: string) => {
  if (animationState === 'entering' || animationState === 'entered') {
    return css`
      animation: ${fadeIn} 300ms ease-out;
    `;
  }
  if (animationState === 'exiting' || animationState === 'exited') {
    return css`
      animation: ${fadeOut} 100ms ease-in forwards;
    `;
  }
  return null;
};

const Wrapper = styled.div`
  padding-bottom: 16px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  /** NOTE: this is a hack to hide chrome default placeholder on date type **/
  input[type='date']:in-range::-webkit-datetime-edit-year-field,
  input[type='date']:in-range::-webkit-datetime-edit-month-field,
  input[type='date']:in-range::-webkit-datetime-edit-day-field,
  input[type='date']:in-range::-webkit-datetime-edit-text {
    color: transparent;
  }
  input::-ms-reveal,
  input::-ms-clear {
    display: none;
  }
`;

export const Label = styled.label`
  ${({theme}) => theme.typography.base};
  user-select: none;
  line-height: 2rem;
  padding: 0;
  color: ${({theme}) => theme.colors.label_secondary};
  position: absolute;
  pointer-events: none;
  left: 16px;
  top: 18px;
  transition: all 200ms ease;
`;

const EmptyButton = styled.span<{animationState: TransitionStatus}>`
  position: absolute;
  right: 16px;
  width: 28px;
  height: 28px;
  padding: 0;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }

  ${({animationState}) => animateButton(animationState)};

  & > svg {
    color: ${({theme}) => theme.colors.label_quaternary};
  }
`;

const ActionButton = styled(Button)`
  position: absolute;
  right: 16px;
`;

const Eye = styled(SvgEye)<{animationState: TransitionStatus}>`
  cursor: pointer;
  position: absolute;
  right: 9px;
  ${({animationState}) => animateButton(animationState)};
`;

const filledState = css`
  padding-top: 23px;
  padding-bottom: 7px;

  & + ${Label} {
    top: 10px;
    font-size: 1.2rem;
    line-height: 1;
  }
`;

const setThickBorder = (color: string, noPaddingRight?: boolean) => css`
  border-width: 2px;
  border-color: ${color};
  & + ${Label} {
    color: ${color};
  }
  padding: 15px ${noPaddingRight ? '0' : `59px`} 15px 15px;
`;

const Input = styled.input<{noPaddingRight?: boolean; fadeValue: boolean}>`
  ${({theme}) => theme.typography.base};
  background-color: ${({theme}) => theme.colors.background};
  color: ${({theme}) => theme.colors.label_primary};
  height: 56px;
  padding: 16px ${({noPaddingRight}) => (noPaddingRight ? '0' : `59px`)} 16px
    16px;
  border-radius: 6px;
  border: 1px solid ${({theme}) => theme.colors.border};
  transition: border-color 200ms ease, color 150ms ease;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;

  /* specificity to overrive setThickBorder's padding */
  &&& {
    ${({value}) => value && filledState}
  }

  &:hover {
    border-color: ${({theme}) => theme.colors.border_hover};
  }

  &:focus {
    ${({theme, noPaddingRight}) =>
      setThickBorder(theme.colors.positive, noPaddingRight)}
  }

  &.errored {
    ${({theme, noPaddingRight}) =>
      setThickBorder(theme.colors.negative, noPaddingRight)}
  }

  &:disabled {
    background-color: ${({theme}) => theme.colors.foreground_secondary};
    border-color: ${({theme}) => theme.colors.border};
    color: ${({theme}) => theme.colors.label_secondary};
  }

  &:-webkit-autofill {
    ${filledState};
  }

  ${({fadeValue}) =>
    fadeValue &&
    css`
      color: ${({theme}) => `${theme.colors.label_primary}00`};
      transition: color 120ms ease;
    `}
`;

type Type = 'date' | 'email' | 'password' | 'tel' | 'text';

type Props = {
  actionLabel?: string;
  className?: string;
  dataTestId?: string;
  helperMessage?: string;
  id?: string;
  inputClassName?: string;
  isDisabled?: boolean;
  label: React.ReactNode;
  name: string;
  onClick?: () => void;
  tabIndex?: number;
  type?: Type;
  validMessage?: string;
  withAction?: boolean;
};

const Textfield = ({
  actionLabel = '',
  className,
  dataTestId,
  helperMessage,
  id,
  inputClassName,
  isDisabled = false,
  label,
  name,
  onClick = () => {},
  type = 'text',
  tabIndex,
  validMessage,
  withAction = false,
}: Props): ReactElement => {
  const [field, {error, touched}, {setValue}] = useField({name});
  const [fadeValue, setFadeValue] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const handleClearField = () => {
    setFadeValue(true);
    setTimeout(() => {
      setValue('');
      setFadeValue(false);
      input?.current?.focus();
    }, 120);
  };

  const renderButtonRight = (state: any) => {
    if (type === 'password' && field.value) {
      const toggleType = () => {
        if (input.current) {
          input.current.type =
            input.current?.type === 'password' ? 'text' : 'password';
          setIsPasswordShown(!isPasswordShown);
        }
      };
      return (
        <Eye
          animationState={state}
          isEyeOpen={!isPasswordShown}
          onClick={toggleType}
        />
      );
    }
    if (type !== 'date' && !withAction && field.value) {
      return (
        <EmptyButton animationState={state} onClick={handleClearField}>
          <Icon name="glyphes/icons/clear" />
        </EmptyButton>
      );
    }
    if (withAction && field.value) {
      return (
        <ActionButton onClick={onClick} uiType="link">
          <Text noPadding uiType="small">
            {actionLabel}
          </Text>
        </ActionButton>
      );
    }
    return null;
  };

  const getMessage = () => {
    if (touched) {
      if (error) {
        return (
          <FormInputMessage
            dataTestId={dataTestId && `${dataTestId}-error`}
            level="negative"
          >
            {error}
          </FormInputMessage>
        );
      }
      if (validMessage) {
        return (
          <FormInputMessage
            dataTestId={dataTestId && `${dataTestId}-valid`}
            level="positive"
          >
            {validMessage}
          </FormInputMessage>
        );
      }
    }
    if (helperMessage) {
      return (
        <FormInputMessage
          dataTestId={dataTestId && `${dataTestId}-helper`}
          level="helper"
        >
          {helperMessage}
        </FormInputMessage>
      );
    }
    return null;
  };

  return (
    <Wrapper className={className}>
      <InputWrapper>
        <Input
          {...field}
          ref={input}
          className={classNames(inputClassName, {errored: touched && error})}
          data-testid={dataTestId}
          disabled={isDisabled}
          fadeValue={fadeValue}
          id={id}
          noPaddingRight={type === 'date'}
          {...(tabIndex ? {tabIndex} : {})}
          type={type}
        />
        <Label htmlFor={name}>{label}</Label>
        {!isDisabled && (
          <Transition in={!!field.value} timeout={{enter: 300, exit: 100}}>
            {(state) => renderButtonRight(state)}
          </Transition>
        )}
      </InputWrapper>
      {getMessage()}
    </Wrapper>
  );
};

export default memo(Textfield);
