import React, { Fragment, useState } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import WinLogo from '../components/icons/WinLogo';
import SettingsIcon from '../components/icons/SettingsIcon';
import ShutdownIcon from '../components/icons/ShutdownIcon';
import MenuIcon from '../components/icons/MenuIcon';
import PictureIcon from '../components/icons/PictureIcon';
import FileIcon from '../components/icons/FileIcon';
import GenderNeutralUserIcon from '../components/icons/GenderNeutralUserIcon';
import { useStore } from '../store';
import { config as appsConfig } from '../apps';
import Image from 'next/future/image';
import fileFolderIcon from '../assets/icons/icons8-file-folder-96.png';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import cx from 'classnames';

const leftSideBtns = [
  { icon: FileIcon, label: 'Documents' },
  { icon: PictureIcon, label: 'Pictures' },
  { icon: SettingsIcon, label: 'Settings' },
  { icon: ShutdownIcon, label: 'Power' },
];

type AppList = { name: string; type: string; apps?: string[] }[];

const apps: {
  [key: string]: AppList;
} = {
  A: [{ name: 'alarmsClock', type: 'app' }],
  W: [{ type: 'folder', name: 'Windows Accessories', apps: ['notepad'] }],
};

const StartMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openApp } = useStore((state) => ({
    openApp: state.open,
  }));

  const handleOpenApp = (name: string) => {
    openApp(name);
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="group flex h-full cursor-default items-center px-3.5 outline-none hover:bg-zinc-800"
        onMouseUp={() => setIsOpen(!isOpen)}
        onContextMenu={(e) => e.preventDefault()}
      >
        <WinLogo className="block h-5 w-5 fill-white group-hover:fill-blue-500" />
      </button>
      <Transition
        show={isOpen}
        enter="transition ease-in-out duration-150 transform"
        enterTo="translate-y-0"
        enterFrom="translate-y-3"
        leave="transition ease-in-out duration-75 transform"
        leaveFrom="translate-y-0"
        leaveTo="translate-y-1"
        as={Fragment}
      >
        <Dialog
          onClose={() => setIsOpen(false)}
          className="absolute bottom-11"
          onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
        >
          <Dialog.Panel className="h-[576px] w-80 bg-zinc-800 shadow">
            <div className="start-leftbar z-20">
              <div>
                <button className="start-left-btn outline-none">
                  <span>
                    <MenuIcon className="h-5 w-5 fill-zinc-100" />
                  </span>
                  <span className="px-4 font-bold">START</span>
                </button>
              </div>
              <div>
                <button className="start-left-btn">
                  <span className="rounded-full bg-zinc-300 p-1">
                    <GenderNeutralUserIcon className="h-3 w-3 fill-zinc-600" />
                  </span>
                  <span className="px-4">Guest</span>
                </button>
                {leftSideBtns.map((btn, idx) => (
                  <button className="start-left-btn" key={idx}>
                    <span>
                      <btn.icon className="h-5 w-5 fill-zinc-100" />
                    </span>
                    <span className="px-4">{btn.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="pl-14 pt-1.5 text-xs text-zinc-100">
              {(Object.keys(apps) as Array<keyof typeof apps>).map(
                (category) => (
                  <div key={category}>
                    <button className="w-full pl-3 pt-3 pb-1.5 text-left hover:bg-zinc-700">
                      {category}
                    </button>
                    {apps[category].map((app) =>
                      app.type === 'folder' ? (
                        <Disclosure key={app.name}>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="group relative z-10 flex h-10 w-full items-center justify-between py-1 pl-0.5 pr-2 hover:bg-zinc-700">
                                <div className="inline-flex items-center group-active:scale-[0.96]">
                                  <Image
                                    src={fileFolderIcon}
                                    alt={app.name}
                                    width="32"
                                    height="32"
                                  />
                                  <span className="pl-1.5">{app.name}</span>
                                </div>
                                <div>
                                  <ChevronDownIcon
                                    className={cx(
                                      'h-3.5 w-3.5 transition-transform duration-75',
                                      {
                                        'rotate-180': open,
                                      }
                                    )}
                                  />
                                </div>
                              </Disclosure.Button>
                              <Transition
                                enter="transition duration-300 ease-out"
                                enterFrom="transform -translate-y-3"
                                enterTo="transform translate-y-0"
                              >
                                <Disclosure.Panel className="relative z-0">
                                  {app.apps?.map((name) => (
                                    <button
                                      className="inline-flex w-full items-center py-1 pl-4 hover:bg-zinc-700"
                                      key={name}
                                    >
                                      {appsConfig[name].icon}
                                      <span className="pl-1.5">
                                        {appsConfig[name].label}
                                      </span>
                                    </button>
                                  ))}
                                </Disclosure.Panel>
                              </Transition>
                            </>
                          )}
                        </Disclosure>
                      ) : (
                        <button
                          className="group inline-flex w-full items-center py-1 pl-0.5 hover:bg-zinc-700"
                          onClick={() => handleOpenApp('alarmsClock')}
                          key={app.name}
                        >
                          <div className="inline-flex items-center group-active:scale-[0.96]">
                            {appsConfig[app.name].icon}
                            <span className="pl-1.5">
                              {appsConfig[app.name].label}
                            </span>
                          </div>
                        </button>
                      )
                    )}
                  </div>
                )
              )}
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </>
  );
};
export default StartMenu;
