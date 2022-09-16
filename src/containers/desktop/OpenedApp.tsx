import React from 'react';
import Chrome from '../../apps/chrome';
import Window from '../../components/window/Window';
import { useStore } from '../../store';

const appComponents: {
  [key: string]: React.FC;
} = {
  chrome: Chrome,
};

const OpenedApp = () => {
  const { apps } = useStore((state) => ({ apps: state.apps }));

  return (
    <div className="h-full w-full">
      {Object.keys(apps).map((appName) => {
        const { isOpen } = apps[appName];
        const Component = appComponents[appName];

        if (isOpen) {
          return (
            <Window key={appName} name={appName}>
              {Component}
            </Window>
          );
        }
      })}
    </div>
  );
};

export default OpenedApp;
