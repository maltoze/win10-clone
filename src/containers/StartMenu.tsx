import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import WinLogo from '../components/icons/WinLogo';
import SettingsIcon from '../components/icons/SettingsIcon';
import ShutdownIcon from '../components/icons/ShutdownIcon';
import MenuIcon from '../components/icons/MenuIcon';
import PictureIcon from '../components/icons/PictureIcon';
import FileIcon from '../components/icons/FileIcon';
import GenderNeutralUserIcon from '../components/icons/GenderNeutralUserIcon';
import Image from 'next/future/image';
import alarmsClockPic from '../assets/icons/alarms-clock.png';

const folders = [
  { icon: FileIcon, label: 'Documents' },
  { icon: PictureIcon, label: 'Pictures' },
  { icon: SettingsIcon, label: 'Settings' },
  { icon: ShutdownIcon, label: 'Power' },
];

const StartMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        <Dialog onClose={() => setIsOpen(false)} className="absolute bottom-11">
          <Dialog.Panel className="h-[576px] w-80 bg-zinc-800  shadow">
            <div className="start-leftbar">
              <div>
                <button className="start-left-btn">
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
                {folders.map((folder, idx) => (
                  <button className="start-left-btn" key={idx}>
                    <span>
                      <folder.icon className="h-5 w-5 fill-zinc-100" />
                    </span>
                    <span className="px-4">{folder.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="pl-14 text-xs text-zinc-100">
              <div>
                <button className="w-full pl-3.5 pt-2.5 pb-1.5 text-left hover:bg-zinc-700">
                  A
                </button>
                <div>
                  <button className="inline-flex w-full items-center py-1 pl-0.5 hover:bg-zinc-700">
                    <Image
                      src={alarmsClockPic}
                      quality={100}
                      alt="Alarms & Clock"
                      className="h-8 w-8"
                    />
                    <span className="pl-1.5">Alarms & Clock</span>
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </>
  );
};
export default StartMenu;
