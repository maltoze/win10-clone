import React from 'react';
import Window from '../../components/window/Window';
import { useStore } from '../../store';
import { config as appsConfig } from '../../apps';

const OpenedApp = () => {
  const { apps } = useStore((state) => ({ apps: state.apps }));

  return (
    <>
      {Object.keys(apps)
        .filter((name) => apps[name].isOpen)
        .sort((a, b) => {
          const aLastFocusTime = apps[a].lastFocusTimestamp ?? 0;
          const bLastFocusTime = apps[b].lastFocusTimestamp ?? 0;
          if (aLastFocusTime > bLastFocusTime) {
            return 1;
          }
          if (aLastFocusTime < bLastFocusTime) {
            return -1;
          }
          return 0;
        })
        .map((name) => (
          <Window key={name} name={name}>
            {appsConfig[name].component}
          </Window>
        ))}
    </>
  );
};

export default OpenedApp;
