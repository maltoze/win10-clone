import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChildrenProps } from '../types';

const WindowTransition = ({ children }: ChildrenProps) => (
  <Transition.Child
    as={Fragment}
    enter="ease-out duration-50"
    enterFrom="opacity-0 scale-95"
    enterTo="opacity-100 scale-100"
    leave="ease-in duration-50"
    leaveFrom="opacity-100 scale-100"
    leaveTo="opacity-0 scale-95"
  >
    {children}
  </Transition.Child>
);

export default WindowTransition;
