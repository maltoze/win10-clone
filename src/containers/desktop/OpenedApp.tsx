import { useDrop, XYCoord } from 'react-dnd';
import Chrome from '../../apps/chrome';
import { useStore } from '../../store';
import { AppWindowProps } from '../../types';

type DragItem = {
  id: string;
  name: string;
  top: number;
  left: number;
};

const appComponents: {
  [key: string]: (props: AppWindowProps) => JSX.Element;
} = {
  chrome: Chrome,
};

const OpenedApp = () => {
  const { apps, moveWindow } = useStore((state) => ({
    apps: state.apps,
    moveWindow: state.moveWindow,
  }));

  const [, drop] = useDrop(
    () => ({
      accept: 'window',
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
    <div ref={drop} className="h-full w-full">
      {Object.keys(apps).map((appName) => {
        if (appName) {
          const { left, top } = apps[appName];
          const Component = appComponents[appName];
          return <Component key={appName} left={left} top={top} />;
        }
      })}
    </div>
  );
};

export default OpenedApp;
