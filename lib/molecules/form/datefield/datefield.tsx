import dayjs from 'dayjs';
import {useField, FieldValidator} from 'formik';
import React, {
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Transition} from 'react-transition-group';
import {TransitionStatus} from 'react-transition-group/Transition';
import styled, {css} from 'styled-components';

import {fadeIn, fadeOut} from '@utils/animations/animations';

import Icon from '../../../atoms/icons/icon';
import FormInputMessage from '../input-message/input-message';

const InputContainer = styled.div`
  position: relative;
  display: inline;
  z-index: 0;
`;

const Input = styled.input<{fadeValue: boolean}>`
  ${({theme}) => theme.typography.base};
  color: ${({theme}) => theme.colors.label_primary};
  caret-color: ${({theme}) => theme.colors.positive};
  padding: 0;
  background-color: transparent;

  ${({fadeValue}) =>
    fadeValue &&
    css`
      color: ${({theme}) => `${theme.colors.label_primary}00`};
      transition: color 120ms ease;
    `}
`;
const InputTwoNumbers = styled(Input)`
  width: 20px;
`;
const InputFourNumbers = styled(Input)`
  width: 40px;
`;

const Divider = styled.span`
  position: relative;
  ${({theme}) => theme.typography.base};
  color: ${({theme}) => theme.colors.placeholder};
  top: 1px;
  margin: 0 4px;
  user-select: none;
`;

const Label = styled.label`
  display: block;
  ${({theme}) => theme.typography.micro};
  color: ${({theme}) => theme.colors.label_secondary};
  padding: 0;
  user-select: none;
  line-height: 1.8rem;
  pointer-events: none;
`;

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

const EmptyButton = styled.span<{animationState: TransitionStatus}>`
  position: absolute;
  top: 15px;
  right: 15px;
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

const setThickBorder = (color: string) => css`
  border-width: 2px;
  border-color: ${color};
  padding: 7px 15px 5px;

  & + ${Label} {
    color: ${color};
  }

  & ${EmptyButton} {
    top: 14px;
    right: 14px;
  }
`;

const InputsWrapper = styled.div`
  position: relative;
  background-color: ${({theme}) => theme.colors.background};
  height: 56px;
  padding: 8px 16px 6px;
  border-radius: 6px;
  border: 1px solid ${({theme}) => theme.colors.border};
  transition: border-color 200ms ease, color 150ms ease;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;

  &:hover {
    border-color: ${({theme}) => theme.colors.border_hover};
  }
  &:focus-within {
    ${({theme}) => setThickBorder(theme.colors.positive)}
  }
  &.errored {
    ${({theme}) => setThickBorder(theme.colors.negative)}
  }
`;

const PlaceholderContainer = styled.div`
  ${({theme}) => theme.typography.base};
  font-family: 'Roboto Mono', monospace;
  color: ${({theme}) => theme.colors.placeholder};
  display: inline;
  left: 0;
  position: absolute;
  user-select: none;
  z-index: -1;
  padding-top: 1px;
`;
const InvisiblePart = styled.span`
  visibility: hidden;
`;

type PlaceholderProps = {
  type: 'day' | 'month' | 'year';
  value: string;
};

const Placeholder = ({type, value}: PlaceholderProps) => {
  const getOptions = () => {
    switch (type) {
      case 'day':
        return {char: 'J', length: 2};
      case 'month':
        return {char: 'M', length: 2};
      case 'year':
        return {char: 'A', length: 4};
      default:
        return {char: '?', length: 2};
    }
  };
  const options = getOptions();
  const hiddenText = options.char.repeat(value.length);
  const visibleText = options.char.repeat(options.length - value.length);

  return (
    <PlaceholderContainer>
      <InvisiblePart>{hiddenText}</InvisiblePart>
      <span>{visibleText}</span>
    </PlaceholderContainer>
  );
};

type Props = {
  className?: string;
  label: string;
  name: string;
  validate?: FieldValidator;
};

const DateField = ({className, label, name, validate}: Props): ReactElement => {
  const inputDay = useRef<HTMLInputElement>(null);
  const inputMonth = useRef<HTMLInputElement>(null);
  const inputYear = useRef<HTMLInputElement>(null);
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [fadeValue, setFadeValue] = useState(false);

  const [, meta, helpers] = useField({name, validate});

  useEffect(() => {
    const initialDate =
      meta.initialValue && dayjs(meta.initialValue, 'DD/MM/YYYY');

    if (initialDate) {
      setDay(initialDate.get('date').toString().padStart(2, '0'));
      setMonth(String(initialDate.get('month') + 1).padStart(2, '0'));
      setYear(initialDate.get('year').toString());
    }
  }, [meta.initialValue]);

  useEffect(() => {
    // @ts-expect-error This should be fixed
    const newDate = dayjs({day: +day, month: +month - 1, year: +year});

    if (day.length === 2 && month.length === 2 && year.length === 4) {
      helpers.setTouched(true);
    }
    helpers.setValue(newDate);

    /* Formik bug: helpers needs to be excluded from the dependencies
      or will cause an infinite loop of rerendering */
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [day, day.length, month, month.length, year, year.length]);

  const focusNextField = (field: EventTarget) => {
    if (field === inputDay.current && inputMonth.current) {
      inputMonth.current.focus();
      inputMonth.current.selectionStart = inputMonth.current.value.length;
    } else if (field === inputMonth.current && inputYear.current) {
      inputYear.current.focus();
      inputYear.current.selectionStart = inputYear.current.value.length;
    }
  };

  const focusPreviousField = (field: EventTarget) => {
    if (field === inputMonth.current && inputDay.current) {
      inputDay.current.focus();
      inputDay.current.selectionStart = inputDay.current.value.length;
    } else if (field === inputYear.current && inputMonth.current) {
      inputMonth.current.focus();
      inputMonth.current.selectionStart = inputMonth.current.value.length;
    }
  };

  const focusNextEmpty = () => {
    if (day.length < 2) {
      inputDay.current?.focus();
    } else if (month.length < 2) {
      inputMonth.current?.focus();
    } else {
      inputYear.current?.focus();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // backspace or left arrow
    if (event.keyCode === 8 || event.keyCode === 37) {
      const targetInput = event.target;
      const isCaretAtStart =
        // @ts-expect-error This should be fixed
        targetInput.selectionStart === 0 && targetInput.selectionEnd === 0;

      if (isCaretAtStart) {
        focusPreviousField(targetInput);
      }
    }
    // right arrow
    if (event.keyCode === 39) {
      const targetInput = event.target;
      const isCaretAtEnd =
        // @ts-expect-error This should be fixed
        targetInput.selectionEnd === targetInput.value.length;
      if (isCaretAtEnd) {
        focusNextField(targetInput);
      }
    }
  };

  const handleClick = (event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  const handleDayValueChange = (value: string) => {
    if (value.length === 1 && parseInt(value, 10) > 3) {
      setDay(0 + value);
    } else if (value.length <= 2) {
      setDay(value);
    }
  };

  const handleMonthValueChange = (value: string) => {
    if (value.length === 1 && parseInt(value, 10) > 1) {
      setMonth(0 + value);
    } else if (value.length <= 2) {
      setMonth(value);
    }
  };

  const handleYearValueChange = (value: string) => {
    if (value.length === 1 && parseInt(value, 10) > 2) {
      setYear(19 + value);
    } else if (value.length <= 4) {
      setYear(value);
    }
  };

  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const targetInput = event.target;
    // @ts-expect-error This should be fixed
    const value = targetInput.value;

    if (!value.match(/^\d*$/)) {
      return;
    }

    if (targetInput === inputDay.current) {
      if (value.length <= 2) {
        handleDayValueChange(value);
        if (value.length === 2) {
          focusNextField(targetInput);
        }
      } else {
        const lastNumberTyped = value.split('').pop();
        handleMonthValueChange(lastNumberTyped);
        focusNextField(targetInput);
      }
    } else if (targetInput === inputMonth.current) {
      if (value.length <= 2) {
        handleMonthValueChange(value);
        if (value.length === 2) {
          focusNextField(targetInput);
        }
      } else {
        const lastNumberTyped = value.split('').pop();
        handleYearValueChange(lastNumberTyped);
        focusNextField(targetInput);
      }
    } else if (targetInput === inputYear.current) {
      handleYearValueChange(value);
    }
  };

  const handleClearField = () => {
    setFadeValue(true);
    setTimeout(() => {
      handleDayValueChange('');
      handleMonthValueChange('');
      handleYearValueChange('');
      setFadeValue(false);
      inputDay?.current?.focus();
    }, 120);
  };

  const setIsTouchedOnBlur = (event: SyntheticEvent<HTMLDivElement>) => {
    const {target} = event;
    // @ts-expect-error This should be fixed
    const {value} = target;
    if (
      (target === inputDay.current || target === inputMonth.current) &&
      // @ts-expect-error This should be fixed
      target?.value.length < 2
    ) {
      helpers.setTouched(true);
    } else if (
      target === inputYear.current &&
      (value.length !== 4 || day.length < 2 || month.length < 2)
    ) {
      helpers.setTouched(true);
    }
  };

  return (
    <div className={className}>
      <InputsWrapper
        className={meta.touched && meta.error ? 'errored' : ''}
        onBlur={setIsTouchedOnBlur}
        onClick={focusNextEmpty}
      >
        <Label>{label}</Label>
        <InputContainer>
          <Placeholder type="day" value={day} />
          <InputTwoNumbers
            ref={inputDay}
            fadeValue={fadeValue}
            inputMode="numeric"
            onChange={handleChange}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            type="text"
            value={day}
          />
        </InputContainer>
        <Divider>/</Divider>
        <InputContainer>
          <Placeholder type="month" value={month} />
          <InputTwoNumbers
            ref={inputMonth}
            fadeValue={fadeValue}
            inputMode="numeric"
            onChange={handleChange}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            type="text"
            value={month}
          />
        </InputContainer>
        <Divider>/</Divider>
        <InputContainer>
          <Placeholder type="year" value={year} />
          <InputFourNumbers
            ref={inputYear}
            fadeValue={fadeValue}
            inputMode="numeric"
            onChange={handleChange}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            type="text"
            value={year}
          />
        </InputContainer>
        <Transition
          in={!!day || !!month || !!year}
          timeout={{enter: 300, exit: 100}}
        >
          {(state: any) => (
            <EmptyButton animationState={state} onClick={handleClearField}>
              <Icon name="glyphes/icons/clear" />
            </EmptyButton>
          )}
        </Transition>
      </InputsWrapper>
      {meta.touched && meta.error && (
        <FormInputMessage level="negative">{meta.error}</FormInputMessage>
      )}
    </div>
  );
};

export default DateField;
