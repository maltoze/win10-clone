import React, { Fragment, PropsWithChildren, useEffect, useRef } from 'react';
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

  const handleContextMenuEvent = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const containerEle = containerRef.current;
    if (containerEle) {
      containerEle.addEventListener('contextmenu', handleContextMenuEvent);
      return () => {
        containerEle?.removeEventListener(
          'contextmenu',
          handleContextMenuEvent
        );
      };
    }
  }, []);

  return (
    <Transition show={isOpen} appear={true}>
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
        <Transition.Child
          enter="transition-opacity ease-linear duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="h-full w-full"
          onClick={handleOnFocus}
          ref={containerRef}
        >
          {children}
        </Transition.Child>
      </Rnd>
    </Transition>
  );
};

export default Window;
