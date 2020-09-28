import React, {memo} from 'react';
import styled, {css} from 'styled-components';

const StyledIcon = styled.div<{positive: boolean}>`
  ${({positive: isPositive, theme}) =>
    isPositive &&
    css`
      color: ${theme.colors.positive};
    `};
`;

type Props = React.SVGAttributes<HTMLElement> & {
  name: string;
  positive?: boolean;
};

const Icon = ({name, positive = false, ...rest}: Props) => {
  return <StyledIcon positive={positive} {...rest} />;
};

export default memo(Icon);
