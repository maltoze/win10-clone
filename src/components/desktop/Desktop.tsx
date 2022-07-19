import { useCallback, useState } from 'react';
import ContextMenu from '../base/ContextMenu';

const Desktop = () => {
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
  ];

  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const containerRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setTrigger(node);
    }
  }, []);
  return (
    <>
      <div ref={containerRef} className="flex-grow"></div>
      <ContextMenu menuItems={menuItems} trigger={trigger} />
    </>
  );
};

export default Desktop;
