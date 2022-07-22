import { Dialog, Tab, Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';
import WindowCloseButton from '../../components/base/buttons/WindowCloseButton';
import WindowTransition from '../../components/WindowTransition';
import { useStore } from '../../store';
import AddressBar from './components/AddressBar';

const Chrome = () => {
  const { isOpen, close } = useStore((state) => ({
    isOpen: state.apps?.chrome?.isOpen || false,
    close: state.close,
  }));

  const panelsRef = useRef<HTMLDivElement>(null);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => {}} initialFocus={panelsRef}>
        <div className="fixed top-0 bottom-11 flex w-full bg-zinc-800">
          <WindowTransition>
            <Dialog.Panel className="w-full">
              <Tab.Group as="div" className="flex h-full flex-col">
                <div className="flex bg-zinc-900">
                  <Tab.List className="h-10 grow bg-zinc-900 px-2 pt-2 text-xs text-zinc-100">
                    <Tab className="relative h-full w-60 cursor-default rounded-t-lg bg-zinc-700 pl-4 pr-2 text-left outline-0">
                      <span className="absolute bottom-0 -left-3 block h-4 w-3 bg-zinc-700"></span>
                      <span className="absolute -bottom-0 -left-3 block h-4 w-3 rounded-br-lg bg-zinc-900"></span>
                      <span className="absolute bottom-0 -right-3 block h-4 w-3 bg-zinc-700"></span>
                      <span className="absolute -bottom-0 -right-3 block h-4 w-3 rounded-bl-lg bg-zinc-900"></span>
                      New Tab
                    </Tab>
                  </Tab.List>
                  <div>
                    <WindowCloseButton onClick={() => close('chrome')} />
                  </div>
                </div>
                <Tab.Panels ref={panelsRef} className="grow">
                  <Tab.Panel className="h-full">
                    <div className="flex h-full flex-col bg-zinc-700">
                      <AddressBar />
                      <div className="grow border-t border-zinc-500 bg-zinc-800"></div>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </Dialog.Panel>
          </WindowTransition>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Chrome;
