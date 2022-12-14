import React, { Fragment, PropsWithChildren } from 'react';
import { Rnd } from 'react-rnd';
import { useStore } from '../../store';
import { AppWindowProps } from '../../types';
import { config as appsConfig } from '../../apps';
import { Transition } from '@headlessui/react';

type Props = {
  name: string;
} & AppWindowProps;

const Window = ({ name: appName, children }: PropsWithChildren<Props>) => {
  const {
    app: {
      isOpen,
      location: { left, top },
      dimensions: { width, height },
    },
    moveWindow,
    setDimensions,
    handleOnFocus,
  } = useStore((state) => ({
    app: state.apps[appName],
    moveWindow: state.moveWindow,
    setDimensions: state.setDimensions,
    handleOnFocus: () => state.handleOnFocus(appName),
  }));
  const { minWidth, minHeight } = appsConfig[appName];

  return (
    <Transition
      show={isOpen}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-75"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      as={Fragment}
    >
      <Rnd
        position={{ x: left || 0, y: top || 0 }}
        size={{ width, height }}
        onDragStart={handleOnFocus}
        onDrag={(e, d) => {
          moveWindow(appName, d.x, d.y);
        }}
        cancel=".drag-cancel"
        onResizeStart={handleOnFocus}
        onResize={(e, direction, ref, delta, position) => {
          setDimensions(appName, {
            width: ref.offsetWidth,
            height: ref.offsetHeight,
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
        <div className="h-full w-full" onClick={handleOnFocus}>
          {children}
        </div>
      </Rnd>
    </Transition>
  );
};

export default Window;
