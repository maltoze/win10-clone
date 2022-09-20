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
    <>
      {Object.keys(apps).map((appName) => {
        const Component = appComponents[appName];

        return (
          <Window key={appName} name={appName}>
            {Component}
          </Window>
        );
      })}
    </>
  );
};

export default OpenedApp;
