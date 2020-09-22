import {action} from '@storybook/addon-actions';
import {boolean, select, text} from '@storybook/addon-knobs';
import React, {ReactElement, useState} from 'react';

import Button from '../form/button/button';

import Modal from './modal';

export const Working = (): ReactElement => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>open modal</Button>
      <Modal
        hideCloseButton
        isOpen={open}
        onClose={() => setOpen(false)}
        stickyFooter={<div>sticky footer</div>}
      >
        <div
          style={{
            backgroundColor: 'lightblue',
            height: '1200px',
            width: '100%',
          }}
        >
          content
        </div>
      </Modal>
    </>
  );
};

Working.storyName = 'Working Example';

export const Knobs = (): ReactElement => {
  const hideCloseButton = boolean('hideCloseButton', true);
  const isDynamicContent = boolean('isDynamicContent', false);
  const isOpen = boolean('isOpen', true);
  const stickyFooter = boolean('stickyFooter', true);
  const size = select('size', ['large', 'small'], 'large');
  const title = text('title', 'my modal title');

  return (
    <Modal
      hideCloseButton={hideCloseButton}
      isDynamicContent={isDynamicContent}
      isOpen={isOpen}
      onClose={action('On close Modal')}
      size={size}
      stickyFooter={stickyFooter && <div>sticky footer</div>}
      title={title}
    >
      <div
        style={{
          backgroundColor: 'lightblue',
          height: '1200px',
          width: '100%',
        }}
      >
        content
      </div>
    </Modal>
  );
};

export default {
  component: Modal,
  parameters: {layout: 'centered'},
  title: 'Design System/Molecules/Modal',
};
