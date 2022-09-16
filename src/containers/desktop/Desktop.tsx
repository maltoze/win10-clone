import { useCallback, useState } from 'react';
import useHydration from '../../hooks/hydration';
import ContextMenu from '../../components/base/ContextMenu';
import OpenedApp from './OpenedApp';

const Desktop = () => {
  const hydrated = useHydration();

  const menuItems = [
    [
      {
        label: 'View',
        disabled: true,
        submenus: [
          { label: 'Large icons' },
          { label: 'Medium icons' },
          { label: 'Small icons' },
        ],
      },
      {
        label: 'Sort by',
        disabled: true,
        submenus: [
          { label: 'Name' },
          { label: 'Size' },
          { label: 'Item type' },
          { label: 'Date modified' },
        ],
      },
      { label: 'Refresh' },
    ],
    [
      { label: 'Paste', disabled: true },
      { label: 'Paste shortcut', disabled: true },
    ],
    [{ label: 'Display settings' }, { label: 'Personalize', disabled: true }],
  ];

  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const containerRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setTrigger(node);
    }
  }, []);

  return (
    <>
      <div ref={containerRef} className="flex-grow" data-testid="desktop">
        {hydrated && <OpenedApp />}
      </div>
      <ContextMenu menuItems={menuItems} trigger={trigger} />
    </>
  );
};

export default Desktop;
