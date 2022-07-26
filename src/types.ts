import { ConnectDragPreview, ConnectDragSource, XYCoord } from 'react-dnd';

export type IconButtonProps = {
  icon: JSX.Element;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ChildrenProps = {
  children: React.ReactNode;
};

export type AppWindowProps = {
  left?: number;
  top?: number;
  dragPreviewRef?: ConnectDragPreview;
  dragRef?: ConnectDragSource;
  preview?: boolean;
  initialOffset?: XYCoord;
  offset?: XYCoord | null;
};

export type DragItem = {
  id: string;
  top: number;
  left: number;
};
