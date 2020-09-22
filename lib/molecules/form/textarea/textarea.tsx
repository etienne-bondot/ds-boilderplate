import classNames from 'classnames';
import {useField} from 'formik';
import React, {memo, ReactElement} from 'react';
import styled, {css} from 'styled-components';

import FormInputMessage from '../input-message/input-message';

const Wrapper = styled.div`
  padding-bottom: 16px;
`;

const TextareaWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const setThickBorder = (color: string) => css`
  box-shadow: 0 0 0 2px ${color};
`;

const StyledTextarea = styled.textarea`
  ${({theme}) => theme.typography.base};
  background-color: ${({theme}) => theme.colors.background};
  padding: 12px;
  border-radius: 6px;
  line-height: 2.2rem;
  border: none;
  box-shadow: 0 0 0 1px ${({theme}) => theme.colors.border};
  transition: box-shadow 200ms ease, color 150ms ease;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  width: 100%;
  resize: none;
  outline: none;

  &:hover {
    box-shadow: 0 0 0 1px ${({theme}) => theme.colors.border_hover};
  }

  &:focus {
    ${({theme}) => setThickBorder(theme.colors.positive)}
  }

  &.errored {
    ${({theme}) => setThickBorder(theme.colors.negative)}
  }

  &:disabled {
    background-color: ${({theme}) => theme.colors.foreground_secondary};
    box-shadow: 0 0 0 1px ${({theme}) => theme.colors.border};
  }
`;

type Props = {
  className?: string;
  dataTestId?: string;
  helperMessage?: string;
  id?: string;
  isDisabled?: boolean;
  name: string;
  placeholder?: string;
  rows?: number;
  textareaClassName?: string;
  validMessage?: string;
};

const Textarea = ({
  className,
  dataTestId,
  helperMessage,
  id,
  isDisabled = false,
  name,
  placeholder,
  rows = 5,
  textareaClassName,
  validMessage,
}: Props): ReactElement => {
  const [field, {error, touched}] = useField({name});

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
      <TextareaWrapper>
        <StyledTextarea
          {...field}
          className={classNames(textareaClassName, {errored: touched && error})}
          data-testid={dataTestId}
          disabled={isDisabled}
          id={id}
          placeholder={placeholder}
          rows={rows}
        />
      </TextareaWrapper>
      {getMessage()}
    </Wrapper>
  );
};

export default memo(Textarea);
