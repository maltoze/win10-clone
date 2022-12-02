import WinLogo from '../components/icons/WinLogo';
import WinSearch from '../components/icons/WinSearch';
import Clock from '../components/taskbar/Clock';
import ChromeIcon from '../components/icons/ChromeIcon';
import { useCallback, useState } from 'react';
import ContextMenu from '../components/base/ContextMenu';
import { useStore } from '../store';
import IconButton from '../components/taskbar/IconButton';
import { apps as appsConfig } from '../constants';
import useHydration from '../hooks/hydration';
import StartMenu from './StartMenu';

const Taskbar = () => {
  const { openApp, appsState } = useStore((state) => ({
    openApp: state.open,
    appsState: state.apps,
  }));

  const apps = [
    {
      component: <WinSearch className="block h-6 w-6 fill-white" />,
    },
    {
      name: appsConfig.chrome.name,
      component: <ChromeIcon className="block h-6 w-6" />,
      onClick: () => openApp(appsConfig.chrome.name),
    },
  ];

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

  const hydrated = useHydration();

  return (
    <>
      <div
        className="z-40 flex h-11 w-full justify-between border-b border-transparent bg-zinc-900 pr-2.5"
        ref={tbRef}
        data-testid="taskbar"
      >
        <div className="flex">
          <StartMenu />
          {hydrated &&
            apps.map((app, index) => (
              <IconButton
                isOpen={app.name ? appsState[app.name]?.isOpen ?? false : false}
                key={index}
                onClick={app.onClick}
                icon={app.component}
                data-testid={`taskbar-btn-${app.name}`}
              />
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
