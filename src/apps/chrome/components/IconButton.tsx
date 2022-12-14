const IconButton = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="cursor-default rounded-full p-1 hover:bg-zinc-600 disabled:bg-zinc-700"
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
