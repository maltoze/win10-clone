import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import WinLogo from '../components/icons/WinLogo';

const StartMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="group flex h-full cursor-default items-center px-3.5 outline-none hover:bg-zinc-800"
        onMouseUp={() => setIsOpen(!isOpen)}
      >
        <WinLogo className="block h-5 w-5 fill-white group-hover:fill-blue-500" />
      </button>
      <Transition
        show={isOpen}
        enter="transition ease-in-out duration-150 transform"
        enterTo="translate-y-0"
        enterFrom="translate-y-10"
        leave="transition ease-in-out duration-75 transform"
        leaveFrom="translate-y-0"
        leaveTo="translate-y-1"
        as={Fragment}
      >
        <Dialog onClose={() => setIsOpen(false)}>
          <Dialog.Panel className="absolute bottom-11 h-[576px] w-80 bg-zinc-800">
            <div className="flex">
              <div></div>
              <div className="flex-grow"></div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </>
  );
};
export default StartMenu;
