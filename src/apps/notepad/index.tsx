import * as Menubar from '@radix-ui/react-menubar';
import NotepadIcon from '../../components/icons/NotepadIcon';
import WindowCloseIcon from '../../components/icons/WindowCloseIcon';
import { useStore } from '../../store';

const appName = 'notepad';

const menuConfig: { [key: string]: { name: string; shortcut?: string }[] } = {
  File: [
    { name: 'New', shortcut: 'Ctrl+N' },
    { name: 'New Window', shortcut: 'Ctrl+Shift+N' },
    { name: 'Open', shortcut: 'Ctrl+O' },
    { name: 'Save', shortcut: 'Ctrl+S' },
  ],
  Edit: [
    { name: 'Undo', shortcut: 'Ctrl+Z' },
    { name: 'Cut', shortcut: 'Ctrl+X' },
    { name: 'Copy', shortcut: 'Ctrl+C' },
    { name: 'Paste', shortcut: 'Ctrl+P' },
    { name: 'Delete', shortcut: 'Del' },
  ],
  Format: [{ name: 'Word wrap' }],
  Help: [{ name: 'View help' }, { name: 'About Notepad' }],
};

export default function Notepad() {
  const { close, doubleClickTitlebar } = useStore();

  return (
    <div className="flex h-full select-none flex-col border border-gray-600">
      <div className="flex bg-gray-100">
        <div
          className={`flex grow items-center pl-1.5 ${appName}-drag-handle`}
          onDoubleClick={() => doubleClickTitlebar(appName)}
        >
          <NotepadIcon className="h-5 w-5" />
          <div className="ml-1 text-xs">Untitled - Notepad</div>
        </div>
        <div>
          <button
            className="group cursor-default px-3.5 py-1.5 hover:bg-red-600"
            onTouchEnd={() => close(appName)}
            onClick={() => close(appName)}
          >
            <WindowCloseIcon className="h-[1.125rem] w-[1.125rem] text-gray-500 group-hover:text-gray-200" />
          </button>
        </div>
      </div>
      <Menubar.Root className="select-none bg-gray-100 text-xs">
        {Object.keys(menuConfig).map((name) => (
          <Menubar.Menu key={name}>
            <Menubar.Trigger className="cursor-default border border-gray-100 py-[0.1rem] px-1.5 hover:border-blue-200 hover:bg-blue-100">
              {name}
            </Menubar.Trigger>
            <Menubar.Portal>
              <Menubar.Content className="flex select-none flex-col border border-gray-300 bg-gray-200 p-0.5 text-xs shadow-[1px_1px_0px_0px] shadow-gray-700">
                {menuConfig[name].map((item) => (
                  <Menubar.Item
                    className="inline-flex min-w-[120px] justify-between py-0.5 pl-2 pr-4 hover:bg-blue-300"
                    key={item.name}
                  >
                    <span className="px-4">{item.name}</span>
                    <span>{item.shortcut}</span>
                  </Menubar.Item>
                ))}
              </Menubar.Content>
            </Menubar.Portal>
          </Menubar.Menu>
        ))}
      </Menubar.Root>
      <textarea
        className="grow overflow-y-scroll border-t-2 bg-gray-50 px-0.5 outline-none"
        autoFocus
      />
    </div>
  );
}
