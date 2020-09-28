import React, {memo, useEffect, useRef, useState} from 'react';
import Sticky from 'react-sticky-el';
import {Transition} from 'react-transition-group';
import {TransitionStatus} from 'react-transition-group/Transition';
import styled, {css, keyframes} from 'styled-components';

import useOnClickOutside from '@hooks/click-outside';
import useEventListener from '@hooks/event-listener';
import {minScreen} from '@utils/mixins/breakpoints';

import Icon from '../../atoms/icons/icon';
import Text from '../../atoms/typography/text';

const Overlay = styled.div`
  display: flex;
  align-items: safe center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24px 0 0 0;
  background-color: ${({theme}) => theme.colors.overlay};
  z-index: 999999;
  text-align: initial;
  ${minScreen.xs`
      padding: 20px;
  `}
`;

const show = keyframes`
  0% {
    opacity: 0.5;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: scale(1.02);
  }
`;

const hide = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.7);
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }

`;

const ModalWrapper = styled.div<{
  animationState: TransitionStatus;
  size: string;
}>`
  position: absolute;
  bottom: 0;
  background-color: ${({theme}) => theme.colors.foreground_primary};
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.1);
  overflow: auto;
  max-height: calc(100% - 24px);
  width: 100%;
  white-space: pre-wrap;
  border-radius: 16px 16px 0 0;
  ${minScreen.xs`
    position: relative;
    bottom: unset;
    border-radius: 16px;
    ${({size}: {size: string}) => {
      if (size === 'large') {
        return css`
          max-width: 600px;
        `;
      }
      if (size === 'small') {
        return css`
          max-width: 420px;
        `;
      }
      return null;
    }};
  `}

  ${({animationState}) => {
    if (animationState === 'entering' || animationState === 'entered') {
      return css`
        animation: ${show} 150ms ease-out;
      `;
    }
    if (animationState === 'exiting' || animationState === 'exited') {
      return css`
        animation: ${hide} 80ms ease-in forwards;
      `;
    }
    return null;
  }}
`;

const ModalMainContent = styled.div`
  opacity: 0.5;
  animation: ${fadeIn} 150ms ease-out 150ms forwards;
`;

const StackedSticky = styled(Sticky)`
  z-index: 1;
`;

const CloseButton = styled(Icon)`
  position: absolute;
  background-color: ${({theme}) => theme.colors.foreground_secondary};
  color: ${({theme}) => theme.colors.positive};
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  top: 24px;
  right: 24px;
  ${minScreen.xs`
    right: 32px;
  `};
  &:hover {
    transform: scale(1.1);
    transition: transform ease-in-out 200ms;
  }
`;

export const Body = styled.div<{stickyFooter: boolean}>`
  color: ${({theme}) => theme.colors.label_primary};
  padding: ${({stickyFooter}) => (stickyFooter ? '24px 24px 8px' : '24px')};
  ${minScreen.xs`
        padding: ${({stickyFooter}: {stickyFooter: boolean}) =>
          stickyFooter ? '24px 32px 8px' : '24px 32px 32px'};
  `}
  overflow: hidden;
`;

const Title = styled(Text)`
  overflow: hidden;
  padding-bottom: 32px;
`;

const Footer = styled.div`
  padding: 16px 24px;
  ${minScreen.xs`
    padding: 24px 32px;
  `}
  background-color: ${({theme}) => theme.colors.label_quaternary};
  border-radius: 0 0 16px 16px;
`;

interface CommonProps {
  children: React.ReactNode;
  className?: string;
  hideCloseButton?: boolean;
  isDynamicContent?: boolean;
  onClose: () => void;
  onOpen?: () => void;
  size?: 'large' | 'small';
  stickyFooter?: React.ReactNode;
  title?: React.ReactNode;
}

interface ContainerProps extends CommonProps {
  animationState: TransitionStatus;
}

interface Props extends CommonProps {
  isOpen: boolean;
}

const ModalContainer = ({
  animationState,
  children,
  className,
  hideCloseButton = false,
  isDynamicContent,
  onClose,
  size = 'large',
  stickyFooter,
  title,
}: ContainerProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useOnClickOutside(modalRef, onClose);
  useEventListener('keydown', onKeyDown);

  return (
    <ModalWrapper
      ref={modalRef}
      animationState={animationState}
      className={`${className} modal-wrapper`}
      size={size}
    >
      <ModalMainContent>
        <StackedSticky scrollElement=".modal-wrapper">
          {!hideCloseButton && (
            <CloseButton
              data-testid="modal-close-button"
              name="glyphes/web/modal-close"
              onClick={onClose}
            />
          )}
        </StackedSticky>
        <Body stickyFooter={!!stickyFooter}>
          {title && <Title uiType="h4">{title}</Title>}
          {children}
        </Body>
        {stickyFooter && (
          <Sticky
            bottomOffset={0}
            boundaryElement=".modal-wrapper"
            mode="bottom"
            positionRecheckInterval={isDynamicContent ? 100 : 0}
            scrollElement=".modal-wrapper"
            stickyStyle={{boxShadow: '0 -2px 6px #0000000d'}}
          >
            <Footer>{stickyFooter}</Footer>
          </Sticky>
        )}
      </ModalMainContent>
    </ModalWrapper>
  );
};

const Modal = ({
  children,
  className = '',
  hideCloseButton = false,
  /** set isDynamicContent to true if the modal height changes and you have a sticky footer */
  isDynamicContent = false,
  isOpen,
  onClose,
  onOpen = () => {},
  size = 'large',
  stickyFooter,
  title,
}: Props) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (document.body) {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
    if (isOpen) {
      setShowModal(true);
      onOpen && onOpen();
    }
    return () => {
      if (document.body) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, onOpen]);

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <Transition
      in={isOpen}
      onExited={hideModal}
      timeout={{enter: 150, exit: 80}}
    >
      {(state) =>
        showModal && (
          <Overlay>
            <ModalContainer
              animationState={state}
              className={className}
              hideCloseButton={hideCloseButton}
              isDynamicContent={isDynamicContent}
              onClose={onClose}
              size={size}
              stickyFooter={stickyFooter}
              title={title}
            >
              {children}
            </ModalContainer>
          </Overlay>
        )
      }
    </Transition>
  );
};

export default memo(Modal);
