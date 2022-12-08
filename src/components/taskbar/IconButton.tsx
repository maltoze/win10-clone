import cx from 'classnames';

type Props = {
  isOpen: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = ({ isOpen, children, ...rest }: Props) => {
  return (
    <button
      className={cx(
        'group flex h-full cursor-default items-center border-b-2 px-3.5 transition-[border-color] hover:bg-zinc-800',
        { 'border-blue-300': isOpen },
        { 'border-transparent': !isOpen }
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconButton;
