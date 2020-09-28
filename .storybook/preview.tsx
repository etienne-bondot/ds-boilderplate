import React from 'react';

import ThemeProvider from '../src/utils/providers/theme-provider';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story: any) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  )
];