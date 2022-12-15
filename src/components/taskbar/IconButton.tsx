import cx from 'classnames';

type Props = {
  isOpen: boolean;
  isFocus?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const IconButton = ({ isOpen, isFocus = false, children, ...rest }: Props) => {
  return (
    <div
      className={cx(
        'group flex h-full w-12 flex-col items-center hover:bg-zinc-800',
        {
          'bg-zinc-800 hover:bg-zinc-700': isFocus,
        }
      )}
      {...rest}
    >
      <button className={cx('flex grow cursor-default items-center')}>
        {children}
      </button>
      <div
        className={cx(
          'border-b-2 transition-[width,border-color] group-hover:w-full',
          { 'border-blue-300': isOpen },
          { 'border-transparent': !isOpen },
          { 'w-full': isFocus },
          { 'w-10/12': !isFocus }
        )}
      ></div>
    </div>
  );
};

export default IconButton;
