import React from 'react';
import Window from '../../components/window/Window';
import { useStore } from '../../store';
import { apps as appsConfig } from '../../apps';

const OpenedApp = () => {
  const { apps } = useStore((state) => ({ apps: state.apps }));

  return (
    <>
      {Object.keys(apps)
        .filter((appName) => apps[appName].isOpen)
        .map((appName) => (
          <Window key={appName} name={appName}>
            {appsConfig[appName].component}
          </Window>
        ))}
    </>
  );
};

export default OpenedApp;
