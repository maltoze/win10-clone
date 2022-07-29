import { useDragLayer } from 'react-dnd';
import ChromePanel from '../../apps/chrome/ChromePanel';
import { DragItemTypes } from '../../constants';
import { DragItem } from '../../types';

const itemComponents: { [key: string]: JSX.Element } = {
  chrome: <ChromePanel />,
};

const DragLayer = () => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem() as DragItem,
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

  const renderItem = () => {
    switch (itemType) {
      case DragItemTypes.WINDOW:
        return itemComponents[item.id];
      default:
        return null;
    }
  };

  if (!isDragging) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed top-0 left-0 h-full w-full">
      {currentOffset && (
        <div
          className="h-full"
          style={{
            transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
          }}
        >
          {renderItem()}
        </div>
      )}
    </div>
  );
};

export default DragLayer;
