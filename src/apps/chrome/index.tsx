import { Dialog, Tab, Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';
import WindowTransition from '../../components/window/WindowTransition';
import { useStore } from '../../store';
import { AppWindowProps } from '../../types';
import ChromePanel from './ChromePanel';

export const appName = 'chrome';

const Chrome = ({ dragPreviewRef, dragRef }: AppWindowProps) => {
  const { isOpen, left, top } = useStore((state) => state.apps[appName]);

  const panelsRef = useRef<HTMLDivElement>(null);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => {}} initialFocus={panelsRef}>
        <div className="fixed bottom-11 flex w-full bg-zinc-800">
          <WindowTransition>
            <div
              className="fixed bottom-11 flex w-full"
              style={{ left, top }}
              ref={dragPreviewRef}
              data-testid="chrome-window"
            >
              <Dialog.Panel className="w-full">
                <Tab.Group as="div" className="flex h-full flex-col">
                  <ChromePanel dragRef={dragRef} ref={panelsRef} />
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
