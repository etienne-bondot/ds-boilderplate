import React, {ReactElement} from 'react';
import styled from 'styled-components';

import {Level} from '@utils/form/levelMessage';

import Icon from '../../atoms/icons/icon';
import Text from '../../atoms/typography/text';

const levels = {
  negative: {background: 'negative_background', text: 'negative'},
  positive: {background: 'positive_background', text: 'positive'},
};

const Banner = styled(Text)<{level: Level}>`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-radius: 2px;
  background-color: ${({level, theme}) =>
    theme.colors[levels[level].background]};
  color: ${({level, theme}) => theme.colors[levels[level].text]};
  width: 100%;
  margin-bottom: 16px;
`;

const IconStyled = styled(Icon)<{level: Level}>`
  color: ${({level, theme}) => theme.colors[levels[level].text]};
  border-radius: 25px;
  margin-right: 16px;
  height: 24px;
  width: 24px;
`;

type Props = {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  level?: Level;
};

const InfoBanner = ({
  children,
  className,
  icon,
  level = 'positive',
}: Props): ReactElement => {
  return (
    <Banner className={className} level={level} uiType="small">
      <div>
        {icon || <IconStyled level={level} name="glyphes/icons/info" />}
      </div>
      <div>{children}</div>
    </Banner>
  );
};

export default InfoBanner;
