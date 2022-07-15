import React from "react";

const TaskbarIconWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="group px-3.5 h-full hover:bg-zinc-800 flex items-center">
      {children}
    </div>
  );
};

export default TaskbarIconWrapper;
