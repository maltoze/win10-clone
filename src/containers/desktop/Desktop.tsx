import useHydration from '../../hooks/hydration';
import * as ContextMenu from '@radix-ui/react-context-menu';
import OpenedApp from './OpenedApp';
import { MenuItem } from '../../types';
import ContextMenuContent from '../../components/base/ContextMenuContent';
import Image from 'next/future/image';

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
    <ContextMenu.Root modal={false}>
      <ContextMenu.Trigger asChild={true}>
        <div className="relative flex-grow" data-testid="desktop">
          <Image
            src="https://bing.biturl.top/?resolution=1920&format=image&index=0"
            alt="bg-bing"
            fill={true}
            className="pointer-events-none object-cover select-none"
            quality={100}
          />
          {hydrated && <OpenedApp />}
        </div>
      </ContextMenu.Trigger>
      <ContextMenuContent menuItems={menuItems} compact={true} />
    </ContextMenu.Root>
  );
};

export default Desktop;
