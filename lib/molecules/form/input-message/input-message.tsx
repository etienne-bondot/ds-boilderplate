import React, {ReactElement} from 'react';
import styled from 'styled-components';

import Text from '../../../atoms/typography/text';

const levels = {
  helper: 'label_secondary',
  negative: 'negative',
  positive: 'positive',
};

type Level = keyof typeof levels;

const StyledTag = styled(Text)<{level: Level}>`
  color: ${({theme, level}) => theme.colors[levels[level]]};
  margin-top: 8px;
`;

type Props = {
  dataTestId?: string;
  children: React.ReactNode;
  level: Level;
};

const FormInputMessage = ({
  children,
  dataTestId,
  level,
}: Props): ReactElement => {
  return (
    <StyledTag data-testid={dataTestId} level={level} noPadding uiType="micro">
      {children}
    </StyledTag>
  );
};

export default FormInputMessage;
