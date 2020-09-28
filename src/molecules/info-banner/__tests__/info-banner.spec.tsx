import {render} from '@testing-library/react';
import React from 'react';

import ThemeProvider from '@utils/providers/theme-provider';

import Banner from '../info-banner';

const bannerText = 'this is a banner';

describe('Info Banner', () => {
  test('should display banner text', () => {
    const {getByText} = render(
      <ThemeProvider>
        <Banner>{bannerText}</Banner>
      </ThemeProvider>,
    );
    expect(getByText(bannerText)).toBeInTheDocument();
  });
});
