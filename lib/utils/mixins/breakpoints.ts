import {css} from 'styled-components';

export const breakpoints: {[key: string]: number} = {
  lg: 1280,
  md: 1024,
  sm: 768,
  xs: 600,
};

type MinScreen = {[key in keyof typeof breakpoints]: any};

type NonEmptyArray<T extends any[]> = T extends (infer U)[]
  ? [U, ...U[]]
  : never;

export const minScreen: MinScreen = Object.keys(breakpoints).reduce(
  (acc, label) => {
    // @ts-expect-error Don't know what type is
    acc[label] = (...args: any[]) => css`
      @media screen and (min-width: ${breakpoints[label]}px) {
        ${css(...(args as NonEmptyArray<typeof args>))};
      }
    `;
    return acc;
  },
  {lg: null, md: null, sm: null, xs: null},
);
