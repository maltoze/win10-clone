import { IconButtonProps } from '../../types';
import cx from 'classnames';

type Props = {
  isOpen: boolean;
} & IconButtonProps;

const IconButton = ({ icon, isOpen, ...rest }: Props) => {
  return (
    <button
      className={cx(
        'group flex h-full cursor-default items-center border-b-2 px-3.5 transition-[border-color] hover:bg-zinc-800',
        { 'border-blue-300': isOpen },
        { 'border-transparent': !isOpen }
      )}
      {...rest}
    >
      {icon}
    </button>
  );
};

export default IconButton;
