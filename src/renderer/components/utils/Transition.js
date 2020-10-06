// Core
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const Transition = ({ children, location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="fade" timeout={500}>
      {children}
    </CSSTransition>
  </TransitionGroup>
);
