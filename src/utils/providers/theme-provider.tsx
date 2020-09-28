import React, {ReactElement} from 'react';
import {ThemeProvider} from 'styled-components';

import theme from '@utils/theme/theme';

type Props = {
  children?: React.ReactNode;
};

const _ThemeProvider = ({children}: Props): ReactElement => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default _ThemeProvider;
