import { Dialog, Tab, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useRef } from 'react';
import WindowTransition from '../../components/window/WindowTransition';
import { apps } from '../../constants';
import { useStore } from '../../store';
import ChromePanel from './ChromePanel';

export const appName = apps.chrome.name;

const Chrome = () => {
  const { isOpen, location, dimensions } = useStore(
    (state) => state.apps[appName]
  );

  const panelsRef = useRef<HTMLDivElement>(null);

  const locationRef = useRef(location);
  const dimensionsRef = useRef(dimensions);
  console.log('render----------');

  useEffect(
    () =>
      useStore.subscribe((state) => {
        locationRef.current = state.apps[appName].location;
        dimensionsRef.current = state.apps[appName].dimensions;
      }),
    []
  );

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => {}} initialFocus={panelsRef}>
        <div className="fixed bottom-11 flex w-full bg-zinc-800">
          <WindowTransition>
            <div
              className="fixed bottom-11 flex w-full"
              style={{
                height: `calc(100% - 44px)`,
                transform: `translate(${locationRef.current.left}px, ${locationRef.current.top}px)`,
              }}
              data-testid="chrome-window"
            >
              <Dialog.Panel className="w-full">
                <Tab.Group as="div" className="flex h-full flex-col">
                  <ChromePanel ref={panelsRef} />
                </Tab.Group>
              </Dialog.Panel>
            </div>
          </WindowTransition>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Chrome;
