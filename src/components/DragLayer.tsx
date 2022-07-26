import { useDragLayer, XYCoord } from 'react-dnd';
import Chrome from '../apps/chrome';
import ChromePreview from '../apps/chrome/ChromePreview';
import { DragItemTypes } from '../constants';

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  let { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
  };
}

const DragLayer = () => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

  const renderItem = (currentOffset: XYCoord) => {
    switch (itemType) {
      case DragItemTypes.WINDOW:
        return <Chrome preview offset={currentOffset} />;
      default:
        return null;
    }
  };

  if (!isDragging) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed top-0  left-0 h-full w-full">
      {currentOffset && (
        <div
          className="h-full"
          style={{
            transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
          }}
        >
          <ChromePreview />
        </div>
      )}
    </div>
  );
};

export default DragLayer;
