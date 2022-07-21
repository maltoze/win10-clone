import WindowCloseIcon from '../../icons/WindowCloseIcon';

const WindowCloseButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <button
      className="cursor-default px-3.5 py-1.5 hover:bg-red-700"
      {...props}
    >
      <WindowCloseIcon className="h-[1.125rem] w-[1.125rem] text-zinc-300" />
    </button>
  );
};

export default WindowCloseButton;
