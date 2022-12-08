import * as ContextMenu from '@radix-ui/react-context-menu';
import cx from 'classnames';
import { MenuItem } from '../../types';

type Props = {
  menuItems: MenuItem[][];
  compact?: boolean;
};

export default function ContextMenuContent({
  menuItems,
  compact = false,
}: Props) {
  return (
    <ContextMenu.Portal>
      <ContextMenu.Content
        className={cx('menu', { 'menu-compact': compact })}
      >
        {menuItems.map((group, gIdx) => [
          ...group.map((item, idx) =>
            item.submenus ? (
              <ContextMenu.Sub key={idx}>
                <ContextMenu.SubTrigger className="menu-item inline-flex justify-between pr-2">
                  {item.label}
                  <span>{'>'}</span>
                </ContextMenu.SubTrigger>
                <ContextMenu.Portal>
                  <ContextMenu.SubContent
                    className={cx('menu', { 'menu-compact': compact })}
                  >
                    {item.submenus.map((sub, sidx) => (
                      <ContextMenu.Item
                        key={sidx}
                        className="menu-item"
                        disabled={sub.disabled ?? false}
                      >
                        {sub.label}
                      </ContextMenu.Item>
                    ))}
                  </ContextMenu.SubContent>
                </ContextMenu.Portal>
              </ContextMenu.Sub>
            ) : (
              <ContextMenu.Item
                key={idx}
                disabled={item.disabled ?? false}
                className="menu-item"
              >
                {item.label}
              </ContextMenu.Item>
            )
          ),
          <div className="w-full px-2 py-1 last:hidden" key={`divider-${gIdx}`}>
            <span className="block w-full border-b border-zinc-500"></span>
          </div>,
        ])}
      </ContextMenu.Content>
    </ContextMenu.Portal>
  );
}
