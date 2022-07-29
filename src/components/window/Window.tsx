import React from 'react';
import { ConnectDragPreview, ConnectDragSource, useDrag } from 'react-dnd';
import { DragItemTypes } from '../../constants';
import { AppWindowProps } from '../../types';

type Props = {
  name: string;
  children: ({
    dragPreview,
    drag,
  }: {
    dragPreview: ConnectDragPreview;
    drag: ConnectDragSource;
  }) => JSX.Element;
} & AppWindowProps;

const Window = ({ name, left, top, children }: Props) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: DragItemTypes.WINDOW,
      item: { id: name, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [left, top]
  );

  if (isDragging) {
    return <></>;
  }
  return <>{children({ dragPreview, drag })}</>;
};

export default Window;
