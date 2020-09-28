import React, {ReactElement} from 'react';
import styled from 'styled-components';

import RadioButton, {Props as RadioProps} from '../radio-button/radio-button';

type Props = {
  className?: string;
  dataTestId?: string;
  id?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  label: React.ReactNode;
  name: string;
  value: string;
};

const ChoiceStyled = styled(RadioButton)<RadioProps>`
  &&&&& {
    ${({isChecked, theme}) =>
      isChecked ? theme.typography.baseBold : theme.typography.base};

    border-radius: 6px;
    border-width: 1px;
    border-style: solid;
    margin-bottom: 16px;

    border-color: ${({isChecked, theme}) =>
      isChecked ? theme.colors.positive : theme.colors.border};

    cursor: ${({isDisabled}) => (isDisabled ? 'default' : 'pointer')};

    &:hover {
      border-color: ${({isChecked, theme}) =>
        isChecked ? theme.colors.border_hover : theme.colors.positive_hover};
    }

    span {
      display: none;
    }

    label {
      justify-content: center;
      padding: 10px 16px;

      // NOTE: this does not work
      color: ${({isChecked, theme}) =>
        isChecked ? theme.colors.label_tertiary : theme.colors.label_primary};
    }
  }
`;

const Choice = ({
  className,
  dataTestId,
  id,
  isChecked,
  isDisabled,
  label,
  name,
  value,
}: Props): ReactElement => {
  return (
    <ChoiceStyled
      className={className}
      dataTestId={dataTestId}
      id={id}
      isChecked={isChecked}
      isDisabled={isDisabled}
      label={label}
      name={name}
      noPadding
      showRadioClip={false}
      value={value}
    />
  );
};

export default Choice;
