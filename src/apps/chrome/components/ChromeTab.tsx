import { Tab } from '@headlessui/react';
import React from 'react';
import { ChildrenProps } from '../../../types';

const ChromeTab = ({ children }: ChildrenProps) => {
  return (
    <Tab className="drag-cancel relative h-full w-60 cursor-default rounded-t-lg bg-zinc-700 pl-4 pr-2 text-left outline-0">
      <span className="absolute bottom-0 -left-2 block h-4 w-2 bg-zinc-700"></span>
      <span className="absolute -bottom-0 -left-2 block h-4 w-2 rounded-br-lg bg-zinc-900"></span>
      <span className="absolute bottom-0 -right-2 block h-4 w-2 bg-zinc-700"></span>
      <span className="absolute -bottom-0 -right-2 block h-4 w-2 rounded-bl-lg bg-zinc-900"></span>
      {children}
    </Tab>
  );
};

export default ChromeTab;
