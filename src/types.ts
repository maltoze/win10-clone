export type AppWindowProps = {
  preview?: boolean;
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
  lastFocusTimestamp?: number;
};

export type MenuItem = {
  label: string;
  disabled?: boolean;
  submenus?: MenuItem[];
};

export type IconProps = { className: string };
