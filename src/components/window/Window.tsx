import React, { Fragment, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { useStore } from '../../store';
import { AppWindowProps } from '../../types';
import { apps as appsConfig } from '../../apps';
import { Transition } from '@headlessui/react';

type Props = {
  name: string;
} & AppWindowProps;

const Window = ({ name: appName, children }: Props) => {
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
        tabIndex="0"
        className="focus:z-30"
        position={{ x: left || 0, y: top || 0 }}
        size={{ width, height }}
        onDrag={(e, d) => {
          const { movementX, movementY } = e;
          console.log(movementX, movementY, d.deltaX, d.deltaY);
          // const x = (left || 0) + d.deltaX;
          // const y = (top || 0) + d.deltaY;
          const x = (left || 0) + movementX;
          const y = (top || 0) + movementY;
          moveWindow(appName, x, y);
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
        {children}
      </Rnd>
    </Transition>
  );
};

export default Window;
