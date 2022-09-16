import React, { Fragment, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { useStore } from '../../store';
import { AppWindowProps } from '../../types';
import { apps as appsConfig } from '../../constants';
import { Dialog, Transition } from '@headlessui/react';
import WindowTransition from './WindowTransition';

type Props = {
  name: string;
  children: React.FC<any>;
} & AppWindowProps;

const Window = ({ name: appName, children: Children }: Props) => {
  const {
    app: {
      isOpen,
      location: { left, top },
      dimensions: { width, height },
    },
    moveWindow,
    setDimensions,
  } = useStore((state) => ({
    app: state.apps[appName],
    moveWindow: state.moveWindow,
    setDimensions: state.setDimensions,
  }));
  const { minWidth, minHeight } = appsConfig[appName];

  const panelsRef = useRef<HTMLDivElement>(null);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => {}} initialFocus={panelsRef}>
        <div className="fixed bottom-11 flex w-full bg-zinc-800">
          <WindowTransition>
            <div
              className="fixed bottom-11 h-[calc(100%-2.75rem)] w-full"
              data-testid="chrome-window"
            >
              <Rnd
                position={{ x: left || 0, y: top || 0 }}
                size={{ width, height }}
                onDrag={(e) => {
                  // @ts-ignore
                  const { movementX, movementY } = e;
                  moveWindow(
                    appName,
                    (left || 0) + movementX,
                    (top || 0) + movementY
                  );
                }}
                cancel=".drag-cancel"
                onResize={(e, direction, ref, delta, position) => {
                  setDimensions(appName, {
                    width: ref.style.width,
                    height: ref.style.height,
                  });
                  moveWindow(appName, position.x, position.y);
                }}
                minHeight={minHeight}
                minWidth={minWidth}
                dragHandleClassName={`${appName}-drag-handle`}
                resizeHandleStyles={{
                  top: { cursor: 'ns-resize' },
                  bottom: { cursor: 'ns-resize' },
                  left: { cursor: 'ew-resize' },
                  right: { cursor: 'ew-resize' },
                }}
              >
                <Dialog.Panel className="h-full w-full">
                  <Children ref={panelsRef} />
                </Dialog.Panel>
              </Rnd>
            </div>
          </WindowTransition>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Window;
