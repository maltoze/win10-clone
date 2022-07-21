import { IconButtonProps } from '../../../types';

const IconButton = ({ icon, ...props }: IconButtonProps) => {
  return (
    <button
      className="cursor-default rounded-full p-1 hover:bg-zinc-600 disabled:bg-zinc-700"
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;
