import React, {ReactElement} from 'react';
import styled from 'styled-components';

import {Level, getColorFromLevel} from '@utils/form/levelMessage';

import Text, {texts} from '../../../atoms/typography/text';

const StyledTag = styled(Text)<{
  level: Level;
  noPadding?: boolean;
  uiType: string;
}>`
  color: ${({theme}) => theme.colors.label_secondary};
  margin-top: 8px;
  strong {
    ${texts.smallBold};
    color: ${({level, theme}) => theme.colors[getColorFromLevel(level)]};
  }
`;

type Props = {
  className?: string;
  dataTestId?: string;
  children: React.ReactNode;
  level?: Level;
};

const LevelMessage = ({
  className,
  children,
  dataTestId,
  level = 'positive',
}: Props): ReactElement => {
  return (
    <StyledTag
      className={className}
      data-testid={dataTestId}
      level={level}
      noPadding
      uiType="small"
    >
      {children}
    </StyledTag>
  );
};

export default LevelMessage;
