import {useField} from 'formik';
import React, {ReactElement} from 'react';
import styled, {css} from 'styled-components';

import Icon from '../../../atoms/icons/icon';
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
    position: relative;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border-radius: 2px;
    margin-right: 8px;
    border-width: 1px;
    border-style: solid;

    ${({checked, disabled, theme}) =>
      checked &&
      css`
        & {
          border-color: ${disabled ? 'currentColor' : theme.colors.positive};
          background-color: ${disabled
            ? 'currentColor'
            : theme.colors.positive};
          svg {
            color: ${theme.colors.label_quaternary};
            position: absolute;
            width: 20px;
            height: 20px;
          }
        }
      `}
  }
`;

type Props = {
  className?: string;
  dataTestId?: string;
  helperMessage?: string;
  inputClassName?: string;
  isDisabled?: boolean;
  id?: string;
  label: React.ReactNode;
  name: string;
  noPadding?: boolean;
  onChange?: (value: boolean) => void;
};

const Checkbox = ({
  className,
  dataTestId,
  helperMessage,
  inputClassName,
  isDisabled = false,
  id,
  label,
  name,
  noPadding,
  onChange,
}: Props): ReactElement => {
  const [field, {error}, {setValue}] = useField({
    name,
    type: 'checkbox',
  });
  const isChecked = field.value;

  return (
    <Wrapper className={className} noPadding={noPadding}>
      <Label disabled={isDisabled}>
        <Input
          {...field}
          className={inputClassName}
          data-testid={dataTestId}
          disabled={isDisabled}
          id={id}
          onChange={() => {
            const newValue = !field.value;
            setValue(newValue);
            if (onChange) {
              onChange(newValue);
            }
          }}
          type="checkbox"
        />
        <span>{isChecked && <Icon name="glyphes/icons/checkmark" />}</span>
        {label}
      </Label>
      {helperMessage && (
        <FormInputMessage
          dataTestId={dataTestId && `${dataTestId}-helper`}
          level="helper"
        >
          {helperMessage}
        </FormInputMessage>
      )}
      {error && (
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

export default Checkbox;
