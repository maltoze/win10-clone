import { Tab } from "@headlessui/react";
import WindowCloseButton from "../../components/base/buttons/WindowCloseButton";
import AddressBar from "./components/AddressBar";

const ChromePreview = () => {
  return (
    <Tab.Group as="div" className="flex h-full flex-col">
      <div className="flex bg-zinc-900">
        <Tab.List className="h-10 grow  px-2 pt-2 text-xs text-zinc-100">
          <Tab className="relative h-full w-60 cursor-default rounded-t-lg bg-zinc-700 pl-4 pr-2 text-left outline-0">
            <span className="absolute bottom-0 -left-2 block h-4 w-2 bg-zinc-700"></span>
            <span className="absolute -bottom-0 -left-2 block h-4 w-2 rounded-br-lg bg-zinc-900"></span>
            <span className="absolute bottom-0 -right-2 block h-4 w-2 bg-zinc-700"></span>
            <span className="absolute -bottom-0 -right-2 block h-4 w-2 rounded-bl-lg bg-zinc-900"></span>
            New Tab
          </Tab>
        </Tab.List>
        <div>
          <WindowCloseButton />
        </div>
      </div>
      <Tab.Panels  className="grow">
        <Tab.Panel className="h-full">
          <div className="flex h-full flex-col bg-zinc-700">
            <AddressBar />
            <div className="grow border-t border-zinc-500 bg-zinc-800"></div>
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
