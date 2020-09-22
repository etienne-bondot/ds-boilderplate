import {useField} from 'formik';
import React, {ReactElement} from 'react';

import styled, {css} from 'styled-components';

import Icon from '../../../atoms/icons/icon';
import FormInputMessage from '../input-message/input-message';

const Wrapper = styled.div`
  padding-bottom: 16px;
`;

const LabelContainer = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const LabelText = styled.div`
  ${({theme}) => theme.typography.base};
  position: absolute;
  padding: 0;
  top: 17px;
  left: 16px;
  color: ${({theme}) => theme.colors.label_secondary};
  user-select: none;
  pointer-events: none;
  transition: all 200ms ease;
  visibility: hidden;
`;

const IconStyled = styled(Icon)<{isDisabled: boolean}>`
  pointer-events: none;
  position: absolute;
  right: 10px;
  color: ${({isDisabled, theme}) =>
    isDisabled ? theme.colors.border : theme.colors.positive};
`;

const filledState = css`
  padding-top: 24px;
  padding-bottom: 4px;

  & + ${LabelText} {
    top: 8px;
    line-height: 1.5;
    font-size: 1.2rem;
    visibility: visible;
  }
`;

const setThickBorder = (color: string) => css`
  border-width: 2px;
  border-color: ${color};
  padding: 15px 48px 15px 15px;

  & + ${LabelText} {
    color: ${color};
  }
`;

const StyledSelect = styled.select<{hasValue: boolean}>`
  &&&&& {
    ${({theme}) => theme.typography.base}
    position:relative;
    width: 100%;
    height: 56px;
    padding: 16px 49px 16px 16px;
    border-radius: 3px;
    border: 1px solid ${({theme}) => theme.colors.border};
    transition: border-color 200ms ease;
    color: ${({theme}) => theme.colors.label_primary};
    background: ${({theme}) => theme.colors.foreground_primary};
    cursor: pointer;
    text-overflow: ellipsis;
    appearance: none;

    /* specificity to overrive setThickBorder's padding */
    &&& {
      ${({hasValue}) => hasValue && filledState}
    }

    &:hover {
      border-color: ${({theme}) => theme.colors.border_hover};
    }

    &:focus {
      ${({theme}) => setThickBorder(theme.colors.positive)};
    }

    &.errored {
      ${({theme}) => setThickBorder(theme.colors.negative)}
    }

    &:disabled {
      background-color: ${({theme}) => theme.colors.foreground_secondary};
      border-color: ${({theme}) => theme.colors.border};
      color: ${({theme}) => theme.colors.label_secondary};
    }
  }
`;

type Option = {
  disabled?: boolean;
  label: string;
  value: string | number;
};

type Props = {
  className?: string;
  dataTestId?: string;
  disabled?: boolean;
  id?: string;
  inputClassName?: string;
  label: React.ReactNode;
  name: string;
  onChange?: (_: React.SyntheticEvent<HTMLSelectElement>) => void;
  options: Option[];
};

const Select = ({
  className,
  dataTestId,
  disabled = false,
  id,
  inputClassName,
  label,
  name,
  onChange,
  options,
}: Props): ReactElement => {
  const [
    {value, onChange: formikOnChange, ...otherFormikFields},
    {error, touched},
  ] = useField({name});

  const handleChange = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    onChange && onChange(event);
    formikOnChange(event);
  };

  if (
    value &&
    options.length &&
    !options.map(({value: val}) => val.toString()).includes(value.toString())
  ) {
    throw new Error(`Wrong value '${value}' for select '${name}'.`);
  }

  const allOptions = [
    <option key={`${name}_default`} disabled>
      {label}
    </option>,
    ...options.map(
      ({
        disabled: optionDisabled = false,
        label: optionLabel,
        value: optionValue,
      }) => (
        <option
          key={`${name}_${optionValue}`}
          disabled={optionDisabled}
          id={`${name}_${optionValue}`}
          value={optionValue}
        >
          {optionLabel}
        </option>
      ),
    ),
  ];

  return (
    <Wrapper className={className}>
      <LabelContainer htmlFor={id || name}>
        <StyledSelect
          {...otherFormikFields}
          className={inputClassName}
          data-testid={dataTestId}
          disabled={disabled}
          hasValue={value}
          id={id}
          onChange={handleChange}
          value={value || label}
        >
          {allOptions}
        </StyledSelect>
        <LabelText>{label}</LabelText>
        <IconStyled isDisabled={disabled} name="glyphes/icons/chevron-down" />
      </LabelContainer>
      {error && touched && (
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

export default Select;
