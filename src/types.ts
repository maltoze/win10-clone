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
};

export type DragItem = {
  id: string;
  top: number;
  left: number;
};

export type Dimensions = {
  width: number | string;
  height: number | string;
  originWidth?: number | string;
  originHeight?: number | string;
};

export type AppState = {
  isOpen?: boolean;
  location: {
    top?: number;
    left?: number;
    originTop?: number;
    originLeft?: number;
  };
  dimensions: Dimensions;
};
