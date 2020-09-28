import {render} from '@testing-library/react';
import React from 'react';

import ThemeProvider from '@utils/providers/theme-provider';

import Modal from '../modal';

const stickyFooterText = 'my sticky footer';

describe('Modal', () => {
  test('should display the sticky footer', () => {
    const onClose = jest.fn();

    const {getByText} = render(
      <ThemeProvider>
        <Modal
          isOpen
          onClose={onClose}
          stickyFooter={<div>{stickyFooterText}</div>}
        >
          content
        </Modal>
      </ThemeProvider>,
    );

    expect(getByText(stickyFooterText)).toBeInTheDocument();
  });

  test('should display the close button', async () => {
    const onClose = jest.fn();

    const {findByTestId} = render(
      <ThemeProvider>
        <Modal
          isOpen
          onClose={onClose}
          stickyFooter={<div>{stickyFooterText}</div>}
        >
          content
        </Modal>
      </ThemeProvider>,
    );
    const icon = await findByTestId('modal-close-button');
    expect(icon).toBeInTheDocument();
  });
});
