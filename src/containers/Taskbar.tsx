import * as ContextMenu from '@radix-ui/react-context-menu';
import WinSearch from '../components/icons/WinSearch';
import Clock from '../components/taskbar/Clock';
import { useStore } from '../store';
import IconButton from '../components/taskbar/IconButton';
import { config as appsConfig } from '../apps';
import useHydration from '../hooks/hydration';
import StartMenu from './StartMenu';
import ContextMenuContent from '../components/base/ContextMenuContent';
import { useMemo } from 'react';

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

const taskbarApps = [
  {
    component: <WinSearch className="block h-6 w-6 fill-white" />,
  },
  {
    name: appsConfig.chrome.name,
  },
];

const Taskbar = () => {
  const { open, handleOnFocus, apps } = useStore();

  const hydrated = useHydration();

  const handleOnClick = (name: string) => {
    const app = apps[name];
    if (app?.isOpen) {
      handleOnFocus(name);
    } else {
      open(name);
    }
  };

  const sortedApps = useMemo(
    () =>
      Object.keys(apps)
        .filter((name) => apps[name].isOpen)
        .sort((a, b) => {
          const aLastFocusTime = apps[a].lastFocusTimestamp ?? 0;
          const bLastFocusTime = apps[b].lastFocusTimestamp ?? 0;
          if (aLastFocusTime > bLastFocusTime) {
            return -1;
          }
          if (aLastFocusTime < bLastFocusTime) {
            return 1;
          }
          return 0;
        }),
    [apps]
  );
  const focusApp = sortedApps.length > 0 ? sortedApps[0] : null;

  return (
    <ContextMenu.Root modal={false}>
      <ContextMenu.Trigger asChild={true}>
        <div
          className="z-40 flex h-11 w-full justify-between border-b border-transparent bg-zinc-900 pr-2.5"
          data-testid="taskbar"
        >
          <div className="flex space-x-[1px]">
            <StartMenu />
            {hydrated && [
              ...taskbarApps.map((app, index) => (
                <IconButton
                  key={`taskbar-app-${index}`}
                  isOpen={app.name ? apps[app.name]?.isOpen ?? false : false}
                  onClick={() => app.name && handleOnClick(app.name)}
                  data-testid={`taskbar-btn-${app.name}`}
                  isFocus={focusApp === app.name}
                >
                  {app.name ? appsConfig[app.name].taskbarIcon : app.component}
                </IconButton>
              )),

              ...Object.keys(apps)
                .filter((name) => apps[name].isOpen)
                .filter(
                  (name) => !taskbarApps.map((item) => item.name).includes(name)
                )
                .map((name, index) => (
                  <IconButton
                    key={`opened-app-${index}`}
                    isOpen={apps[name]?.isOpen ?? false}
                    onClick={() => handleOnClick(name)}
                    isFocus={focusApp === name}
                  >
                    {appsConfig[name].taskbarIcon}
                  </IconButton>
                )),
            ]}
          </div>
          <div>
            <Clock />
          </div>
        </div>
      </ContextMenu.Trigger>
      <ContextMenuContent menuItems={menuItems} />
    </ContextMenu.Root>
  );
};

export default Taskbar;
