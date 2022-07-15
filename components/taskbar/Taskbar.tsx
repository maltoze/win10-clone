import WinLogo from '../icons/WinLogo';
import IconWrapper from './IconWrapper';
import WinSearch from '../icons/WinSearch';
import Clock from './Clock';
import ChromeIcon from '../icons/ChromeIcon';
import { useCallback, useEffect, useRef } from 'react';
import ContextMenu from '../base/ContextMenu';
import useVisible from '../../hooks/visible';

const apps = [
  {
    component: (
      <WinLogo className="block h-5 w-5 fill-white group-hover:fill-blue-500" />
    ),
  },
  {
    component: <WinSearch className="block h-6 w-6 fill-white" />,
  },
  {
    component: <ChromeIcon className="block h-6 w-6" />,
  },
];

const Taskbar = () => {
  const tbRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className="absolute bottom-0 flex h-11 w-full justify-between bg-zinc-900 pr-2.5"
        ref={tbRef}
      >
        <div className="flex">
          {apps.map((app, index) => (
            <IconWrapper key={index}>{app.component}</IconWrapper>
          ))}
        </div>
        <div>
          <Clock />
        </div>

        <ContextMenu className="flex flex-col border border-zinc-500 py-2 text-xs outline-none dark:bg-zinc-800 dark:text-zinc-100">
          <button className="px-4 py-2 outline-none">Lock all taskbars</button>
          <button className="px-4 py-2 outline-none">Lock all taskbars</button>
          <button className="px-4 py-2 outline-none">Lock all taskbars</button>
          <button className="px-4 py-2 outline-none">Lock all taskbars</button>
        </ContextMenu>
      </div>
    </>
  );
};

export default Taskbar;
