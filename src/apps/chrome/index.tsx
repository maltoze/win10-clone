import { Dialog, Tab, Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';
import WindowTransition from '../../components/WindowTransition';
import { useStore } from '../../store';
import { AppWindowProps } from '../../types';
import cx from 'classnames';
import ChromePanel from './ChromePanel';

export const appName = 'chrome';

const Chrome = ({ left, top, dragPreviewRef, dragRef }: AppWindowProps) => {
  const { isOpen, close, chrome } = useStore((state) => ({
    isOpen: state.apps?.chrome?.isOpen || false,
    close: state.close,
    chrome: state.apps?.chrome,
  }));

  const panelsRef = useRef<HTMLDivElement>(null);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => {}} initialFocus={panelsRef}>
        <div className={cx('fixed bottom-11 flex w-full bg-zinc-800', {})}>
          <WindowTransition>
            <div
              className="fixed bottom-11 flex w-full"
              style={{
                left,
                top,
              }}
              ref={dragPreviewRef}
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
