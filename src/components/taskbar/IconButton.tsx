import { IconButtonProps } from "../../types";

const IconButton = ({ icon, ...props }: IconButtonProps) => {
  return (
    <button
      className="group flex h-full cursor-default items-center px-3.5 hover:bg-zinc-800"
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;
