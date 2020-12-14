// Core
import React from 'react';
import { useLocation } from '@reach/router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const Transition = ({ children }) => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={500}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};
