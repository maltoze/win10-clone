import * as ContextMenu from '@radix-ui/react-context-menu';
import WinSearch from '../components/icons/WinSearch';
import Clock from '../components/taskbar/Clock';
import ChromeIcon from '../components/icons/ChromeIcon';
import { useStore } from '../store';
import IconButton from '../components/taskbar/IconButton';
import { config as appsConfig } from '../apps';
import useHydration from '../hooks/hydration';
import StartMenu from './StartMenu';
import ContextMenuContent from '../components/base/ContextMenuContent';

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

  return (
    <ContextMenu.Root modal={false}>
      <ContextMenu.Trigger asChild={true}>
        <div
          className="z-40 flex h-11 w-full justify-between border-b border-transparent bg-zinc-900 pr-2.5"
          data-testid="taskbar"
        >
          <div className="flex">
            <StartMenu />
            {hydrated &&
              taskbarApps.map((app, index) => (
                <IconButton
                  key={index}
                  isOpen={app.name ? apps[app.name]?.isOpen ?? false : false}
                  onClick={() => app.name && handleOnClick(app.name)}
                  data-testid={`taskbar-btn-${app.name}`}
                >
                  {app.name ? appsConfig[app.name].taskbarIcon : app.component}
                </IconButton>
              ))}
            {hydrated &&
              Object.keys(apps)
                .filter((name) => apps[name].isOpen)
                .filter(
                  (name) => !taskbarApps.map((item) => item.name).includes(name)
                )
                .map((name, index) => (
                  <IconButton
                    key={index}
                    isOpen={apps[name]?.isOpen ?? false}
                    onClick={() => handleOnClick(name)}
                  >
                    {appsConfig[name].taskbarIcon}
                  </IconButton>
                ))}
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
