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

const Taskbar = () => {
  const { openApp, appStore } = useStore((state) => ({
    openApp: state.open,
    appStore: state.apps,
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

  const hydrated = useHydration();

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
              apps.map((app, index) => (
                <ContextMenu.Root key={index} modal={false}>
                  <ContextMenu.Trigger>
                    <IconButton
                      isOpen={
                        app.name ? appStore[app.name]?.isOpen ?? false : false
                      }
                      onClick={app.onClick}
                      data-testid={`taskbar-btn-${app.name}`}
                    >
                      {app.component}
                    </IconButton>
                  </ContextMenu.Trigger>
                </ContextMenu.Root>
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
