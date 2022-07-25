export type IconButtonProps = {
  icon: JSX.Element;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ChildrenProps = {
  children: React.ReactNode;
};

export type AppWindowProps = {
  left?: number;
  top?: number;
};
