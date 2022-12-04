import useHydration from '../../hooks/hydration';
import * as ContextMenu from '@radix-ui/react-context-menu';
import OpenedApp from './OpenedApp';
import { MenuItem } from '../../types';
import ContextMenuContent from '../../components/base/ContextMenuContent';

const Desktop = () => {
  const hydrated = useHydration();

  const menuItems: MenuItem[][] = [
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

  return (
    <div className="flex-grow" data-testid="desktop">
      <ContextMenu.Root modal={false}>
        <ContextMenu.Trigger asChild={true}>
          <div className="absolute inset-0"></div>
        </ContextMenu.Trigger>
        <ContextMenuContent menuItems={menuItems} compact={true} />
      </ContextMenu.Root>
      {hydrated && <OpenedApp />}
    </div>
  );
};

export default Desktop;
