import cx from 'classnames';

type Props = {
  isOpen: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const IconButton = ({ isOpen, children, ...rest }: Props) => {
  return (
    <div
      className="group flex h-full w-12 flex-col items-center hover:bg-zinc-800"
      {...rest}
    >
      <button className={cx('flex grow cursor-default items-center')}>
        {children}
      </button>
      <div
        className={cx(
          'w-10/12 border-b-2 transition-[width,border-color] group-hover:w-full',
          { 'border-blue-300': isOpen },
          { 'border-transparent': !isOpen }
        )}
      ></div>
    </div>
  );
};

export default IconButton;
