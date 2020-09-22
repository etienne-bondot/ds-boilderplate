import React, {ReactElement} from 'react';
import styled from 'styled-components';

const ProgressBarWrapperStyled = styled.div<{transparent: boolean}>`
  width: 100%;
  background-color: ${({theme, transparent}) =>
    transparent ? 'transparent' : theme.colors.border};
`;

const ProgressBarStyled = styled.div<{value: number; max: number}>`
  background-color: ${({theme}) => theme.colors.positive};
  height: 2px;
  transition: width 500ms;
  width: ${({value, max}) => (100 * value) / max}%;
`;

type Props = {
  max?: number;
  transparent?: boolean;
  value: number;
};

const ProgressBar = ({
  max = 100,
  transparent = false,
  value,
}: Props): ReactElement => {
  return (
    <ProgressBarWrapperStyled transparent={transparent}>
      <ProgressBarStyled max={max} value={value < max ? value : max} />
    </ProgressBarWrapperStyled>
  );
};

export default ProgressBar;
