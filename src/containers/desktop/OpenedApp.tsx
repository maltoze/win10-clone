import { useDrop, XYCoord } from 'react-dnd';
import { Rnd } from 'react-rnd';
import Chrome from '../../apps/chrome';
import Window from '../../components/window/Window';
import { apps as appsConfig, DragItemTypes } from '../../constants';
import { useStore } from '../../store';
import { AppWindowProps, DragItem } from '../../types';

const appComponents: {
  [key: string]: (props: AppWindowProps) => JSX.Element;
} = {
  chrome: Chrome,
};

const OpenedApp = () => {
  const { apps, moveWindow, setDimensions } = useStore((state) => ({
    apps: state.apps,
    moveWindow: state.moveWindow,
    setDimensions: state.setDimensions,
  }));

  const [, drop] = useDrop(
    () => ({
      accept: DragItemTypes.WINDOW,
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveWindow(item.id, left, top);
        return undefined;
      },
    }),
    [moveWindow]
  );
  return (
    <div className="h-full w-full">
      {Object.keys(apps).map((appName) => {
        const {
          isOpen,
          location: { left, top },
          dimensions: { width, height },
        } = apps[appName];
        const Component = appComponents[appName];
        const { minWidth, minHeight } = appsConfig[appName];

        if (isOpen) {
          return (
            <Rnd
              key={appName}
              position={{ x: left || 0, y: top || 0 }}
              size={{ width, height }}
              onDrag={(e, d) => {
                moveWindow(appName, d.x, d.y);
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
              <Component />
            </Rnd>
          );
        }
      })}
    </div>
  );
};

export default OpenedApp;
