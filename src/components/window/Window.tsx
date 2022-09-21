import React, { Fragment, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { useStore } from '../../store';
import { AppWindowProps } from '../../types';
import { apps as appsConfig } from '../../constants';
import { Transition } from '@headlessui/react';

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
    <Transition
      show={isOpen}
      className="h-full w-full"
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-75"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Rnd
        position={{ x: left || 0, y: top || 0 }}
        size={{ width, height }}
        onDrag={(e) => {
          // @ts-ignore
          const { movementX, movementY } = e;
          moveWindow(appName, (left || 0) + movementX, (top || 0) + movementY);
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
        <Transition.Child
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          as={Fragment}
        >
          <Children ref={panelsRef} />
        </Transition.Child>
      </Rnd>
    </Transition>
  );
};

export default Window;
