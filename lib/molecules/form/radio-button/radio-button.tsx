import {useField} from 'formik';
import React, {ReactElement} from 'react';
import styled, {css} from 'styled-components';

import FormInputMessage from '../input-message/input-message';

const Wrapper = styled.div<{noPadding?: boolean}>`
  ${({noPadding}) => css`
    ${noPadding ? 'padding: 0!important;' : 'padding-bottom: 16px;'}
  `}

  width: 100%;
`;

const Label = styled.label<{disabled: boolean}>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: default;
  padding: 10px 0;
  color: ${({disabled, theme}) =>
    disabled ? theme.colors.label_secondary : theme.colors.label_primary};
  ${({disabled, theme}) =>
    !disabled &&
    css`
      cursor: pointer;
      &:hover > input + span {
        border-color: ${theme.colors.positive};
      }
    `}
`;

const Input = styled.input`
  margin-right: 20px;
  display: none;

  & + span {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border-radius: 25px;
    border-width: 1px;
    border-style: solid;
    border-color: ${({checked, disabled, theme}) =>
      checked && !disabled ? theme.colors.positive : 'currentColor'};
    margin-right: 8px;
    ${({checked, disabled, theme}) =>
      checked &&
      css`
        &::before {
          content: '';
          width: 12px;
          height: 12px;
          border-radius: 25px;
          background-color: ${disabled
            ? theme.colors.label_secondary
            : theme.colors.positive};
        }
      `}
  }
`;

export type Props = {
  className?: string;
  dataTestId?: string;
  id?: string;
  inputClassName?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  label: React.ReactNode;
  name: string;
  noPadding?: boolean;
  showError?: boolean;
  showRadioClip?: boolean;
  value: string;
};

const RadioButton = ({
  className,
  dataTestId,
  id,
  inputClassName,
  isChecked = false,
  isDisabled = false,
  label,
  name,
  noPadding,
  showError = true,
  showRadioClip = true,
  value,
}: Props): ReactElement => {
  const [field, {error}] = useField({
    checked: isChecked,
    name,
    type: 'radio',
    value,
  });

  return (
    <Wrapper className={className} noPadding={noPadding}>
      <Label disabled={isDisabled} htmlFor={id || name}>
        <Input
          {...field}
          className={inputClassName}
          data-testid={dataTestId}
          disabled={isDisabled}
          id={id}
          type="radio"
        />
        {showRadioClip && <span />}
        {label}
      </Label>
      {showError && error && (
        <FormInputMessage
          dataTestId={dataTestId && `${dataTestId}-error`}
          level="negative"
        >
          {error}
        </FormInputMessage>
      )}
    </Wrapper>
  );
};

export default RadioButton;
