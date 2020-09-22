import React, {ReactElement} from 'react';
import styled, {css} from 'styled-components';

import {minScreen} from '@utils/mixins/breakpoints';

const lato = css`
  font-family: 'Lato', Tahoma, sans-serif, arial;
  font-display: swap;
`;

const latoRegular = css`
  ${lato};
  font-weight: 400;
`;

const latoBold = css`
  ${lato};
  font-weight: 700;
`;

const latoBlack = css`
  ${lato};
  font-weight: 900;
`;

const large = (isBold: boolean) => css`
  ${isBold ? latoBold : latoRegular};
  font-size: 1.8rem;
  line-height: 2.6rem;
  ${({noPadding}: {noPadding?: boolean}) =>
    !noPadding && 'padding-bottom: 2.4rem'};
`;

const base = (isBold: boolean) => css`
  ${isBold ? latoBold : latoRegular};
  font-size: 1.6rem;
  line-height: 2.4rem;
  ${({noPadding}: {noPadding?: boolean}) =>
    !noPadding && 'padding-bottom: 1.6rem'};
`;

const small = (isBold: boolean) => css`
  ${isBold ? latoBold : latoRegular};
  font-size: 1.4rem;
  line-height: 2rem;
  ${({noPadding}: {noPadding?: boolean}) =>
    !noPadding && 'padding-bottom: 1.6rem'};
`;

const micro = (isBold: boolean) => css`
  ${isBold ? latoBold : latoRegular};
  font-size: 1.2rem;
  line-height: 1.8rem;
  ${({noPadding}: {noPadding?: boolean}) =>
    !noPadding && 'padding-bottom: 1.6rem'};
`;

const typos = {
  base: base(false),
  baseBold: base(true),
  large: large(false),
  largeBold: large(true),
  micro: micro(false),
  microBold: micro(true),
  small: small(false),
  smallBold: small(true),
};

const headers = {
  h1: css`
    ${latoBlack};
    font-size: 2.8rem;
    line-height: 3.6rem;
    ${({noPadding}: {noPadding?: boolean}) =>
      !noPadding && 'padding-bottom: 2.4rem'};
    ${minScreen.sm`
      font-size: 4.6rem;
      line-height: 5.4rem;
      ${({noPadding}: {noPadding?: boolean}) =>
        !noPadding && 'padding-bottom: 3.2rem'};
    `}
  `,
  h2: css`
    ${latoBlack};
    font-size: 2.4rem;
    line-height: 3.2rem;
    ${({noPadding}: {noPadding?: boolean}) =>
      !noPadding && 'padding-bottom: 2.4rem'};
    ${minScreen.sm`
      font-size: 3.2rem;
      line-height: 4.4rem;
    `}
  `,
  h3: css`
    ${latoRegular};
    font-size: 2rem;
    line-height: 3rem;
    ${({noPadding}: {noPadding?: boolean}) =>
      !noPadding && 'padding-bottom: 2.4rem'};
    ${minScreen.sm`
      font-size: 2.4rem;
      line-height: 3.4rem;
    `}
  `,
  h4: css`
    ${latoBold};
    font-size: 2rem;
    line-height: 2.6rem;
    ${({noPadding}: {noPadding?: boolean}) =>
      !noPadding && 'padding-bottom: 1.6rem'};
  `,
  h5: css`
    ${latoBold};
    font-size: 1.8rem;
    line-height: 2.4rem;
    ${({noPadding}: {noPadding?: boolean}) =>
      !noPadding && 'padding-bottom: 1.6rem'};
  `,
};

export const texts = {...headers, ...typos};

const TextElement = styled.div<{
  uiType: TextUiType;
  noPadding?: boolean;
  as?: React.ElementType | HeadersUiType;
}>`
  ${({uiType}) => texts[uiType]};
`;

export type TextUiType = keyof typeof texts;

type HeadersUiType = keyof typeof headers;

const isHeading = (type: TextUiType) => Object.keys(headers).includes(type);

type Props = {
  className?: string; // needeed for css override
  children: React.ReactNode;
  element?: React.ElementType;
  uiType: TextUiType;
  noPadding?: boolean;
};

const Text = ({
  className,
  children,
  element = 'div',
  uiType,
  noPadding = false,
}: Props): ReactElement => {
  return (
    <TextElement
      as={isHeading(uiType) ? (uiType as HeadersUiType) : element}
      className={className}
      noPadding={noPadding}
      uiType={uiType}
    >
      {children}
    </TextElement>
  );
};

export default Text;
