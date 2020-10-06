// Core
import React from 'react';

// Components
import { SubNav } from './navs/SubNav';
import { Transition } from './utils/Transition';

export const View = ({ option, children, location }) => {
  return (
    <>
      <SubNav option={option} />
      <Transition location={location}>
        <div className="overflow-y-scroll px-2 py-2 h-64">{children}</div>
      </Transition>
    </>
  );
};
