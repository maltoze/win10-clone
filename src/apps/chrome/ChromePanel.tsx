import { Tab } from '@headlessui/react';
import { forwardRef } from 'react';
import { ConnectDragSource } from 'react-dnd';
import { appName } from '.';
import WindowCloseButton from '../../components/base/buttons/WindowCloseButton';
import { useStore } from '../../store';
import AddressBar from './components/AddressBar';
import ChromeTab from './components/ChromeTab';

type Props = {
  dragRef?: ConnectDragSource;
  preview?: boolean;
};

const ChromePanel = forwardRef<HTMLDivElement, Props>(
  function ChromePanelWithRef({ dragRef }, ref) {
    const close = useStore((state) => state.close);

    return (
      <Tab.Group as="div" className="flex h-full flex-col">
        <div className="flex bg-zinc-900" ref={dragRef}>
          <Tab.List className="h-10 grow  px-2 pt-2 text-xs text-zinc-100">
            <ChromeTab>New Tab</ChromeTab>
          </Tab.List>
          <div>
            <WindowCloseButton
              onClick={() => close(appName)}
              onMouseDown={(event) => event.preventDefault()}
            />
          </div>
        </div>
        <Tab.Panels className="grow" ref={ref}>
          <Tab.Panel className="h-full">
            <div className="flex h-full flex-col bg-zinc-700">
              <AddressBar />
              <div className="grow border-t border-zinc-500 bg-zinc-800"></div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    );
  }
);

export default ChromePanel;
