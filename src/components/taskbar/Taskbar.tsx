import WinLogo from '../icons/WinLogo';
import IconWrapper from './IconWrapper';
import WinSearch from '../icons/WinSearch';
import Clock from './Clock';
import ChromeIcon from '../icons/ChromeIcon';
import { useCallback, useState } from 'react';
import ContextMenu from '../base/ContextMenu';

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
  const menuItems = [
    [{ label: 'Toolbars', disabled: true }],
    [
      {
        label: 'Search',
        disabled: true,
        submenus: [{ label: 'Hidden' }, { label: 'Show search icon' }],
      },
      { label: 'News and interests', disabled: true },
      { label: 'Show cortana button', disabled: true },
      { label: 'Show task view button' },
      { label: 'Show people on taskbar' },
    ],
    [
      { label: 'Cascade windows', disabled: true },
      { label: 'Show window stacked', disabled: true },
      { label: 'Show the desktop' },
    ],
    [{ label: 'Lock all taskbars' }, { label: 'Taskbar settings' }],
  ];

  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const tbRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setTrigger(node);
    }
  }, []);

  return (
    <>
      <div
        className="flex h-11 w-full justify-between bg-zinc-900 pr-2.5"
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
      </div>
      <ContextMenu menuItems={menuItems} trigger={trigger} compact={false} />
    </>
  );
};

export default Taskbar;
