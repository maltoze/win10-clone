import { Tab } from '@headlessui/react';
import { forwardRef } from 'react';
import WindowCloseButton from '../../components/base/buttons/WindowCloseButton';
import { useStore } from '../../store';
import AddressBar from './components/AddressBar';
import ChromeTab from './components/ChromeTab';

export const appName = 'chrome';

type Props = {
  preview?: boolean;
};

const Chrome = forwardRef<HTMLDivElement, Props>(function ChromePanelWithRef(
  {},
  ref
) {
  const { close, doubleClickTitlebar } = useStore();

  return (
    <Tab.Group
      as="div"
      className="flex h-full flex-col"
      data-testid="chrome-window"
    >
      <div
        className={`flex bg-zinc-900 ${appName}-drag-handle`}
        onDoubleClick={() => doubleClickTitlebar(appName)}
      >
        <Tab.List className="h-10 grow px-2 pt-2 text-xs text-zinc-100">
          <ChromeTab>New Tab</ChromeTab>
        </Tab.List>
        <div>
          <WindowCloseButton
            onTouchEnd={() => close(appName)}
            onClick={() => close(appName)}
          />
        </div>
      </div>
      <Tab.Panels className="grow" ref={ref} tabIndex={-1}>
        <Tab.Panel className="h-full" tabIndex={-1}>
          <div className="flex h-full flex-col bg-zinc-700">
            <AddressBar />
            <div
              className="grow border-t border-zinc-500 bg-zinc-800 bg-opacity-70"
              tabIndex={-1}
            ></div>
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
});

export default Chrome;
