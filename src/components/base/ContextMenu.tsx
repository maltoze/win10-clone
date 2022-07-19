/* eslint-disable react/display-name */
import {
  flip,
  FloatingOverlay,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useListNavigation,
  useTypeahead,
  autoUpdate,
  FloatingFocusManager,
  useFloatingTree,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useHover,
  useClick,
  safePolygon,
  FloatingNode,
  FloatingTree,
} from '@floating-ui/react-dom-interactions';
import React, {
  Children,
  forwardRef,
  HTMLProps,
  isValidElement,
  useRef,
  useState,
  useEffect,
  useMemo,
  cloneElement,
} from 'react';
import { mergeRefs } from 'react-merge-refs';
import cx from 'classnames';
import classNames from 'classnames';

type Props = {
  label?: string;
  nested?: boolean;
  trigger?: HTMLElement | null;
  compact?: boolean;
} & HTMLProps<HTMLButtonElement>;

const defaultTrigger = typeof window !== 'undefined' ? document.body : null;

const ContextMenuBase = forwardRef<any, Props>(
  (
    { children, trigger = defaultTrigger, className, label, compact, ...props },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [open, setOpen] = useState(false);
    const [allowHover, setAllowHover] = useState(false);

    const listItemsRef = useRef<Array<HTMLElement | null>>([]);
    const listContentRef = useRef(
      Children.map(children, (child) =>
        isValidElement(child) ? child.props.label : null
      ) as Array<string | null>
    );

    const tree = useFloatingTree();
    const nodeId = useFloatingNodeId();
    const parentId = useFloatingParentNodeId();
    const nested = parentId != null;

    const { x, y, reference, floating, strategy, refs, update, context } =
      useFloating<HTMLButtonElement>({
        open,
        onOpenChange: setOpen,
        middleware: [
          offset({ mainAxis: nested ? 0 : 5, alignmentAxis: nested ? 0 : 4 }),
          flip(),
          shift(),
        ],
        placement: 'right-start',
        nodeId,
        // whileElementsMounted: autoUpdate,
      });

    const { getFloatingProps, getItemProps, getReferenceProps } =
      useInteractions([
        useHover(context, {
          handleClose: safePolygon({ restMs: 25 }),
          enabled: nested && allowHover,
          delay: { open: 75 },
        }),
        useClick(context, {
          toggle: !nested,
          pointerDown: true,
          ignoreMouse: nested,
        }),

        useRole(context, { role: 'menu' }),
        useDismiss(context),
        useListNavigation(context, {
          listRef: listItemsRef,
          activeIndex,
          nested,
          onNavigate: setActiveIndex,
        }),
        useTypeahead(context, {
          listRef: listContentRef,
          onMatch: open ? setActiveIndex : undefined,
          activeIndex,
        }),
      ]);

    useEffect(() => {
      if (open && refs.reference.current && refs.floating.current) {
        return autoUpdate(
          refs.reference.current,
          refs.floating.current,
          update
        );
      }
    }, [open, update, refs.reference, refs.floating]);

    const mergedReferenceRef = useMemo(
      () => mergeRefs([ref, reference]),
      [reference, ref]
    );

    useEffect(() => {
      function onContextMenu(e: MouseEvent) {
        e.preventDefault();
        mergedReferenceRef({
          getBoundingClientRect() {
            return {
              x: e.clientX,
              y: e.clientY,
              width: 0,
              height: 0,
              top: e.clientY,
              right: e.clientX,
              bottom: e.clientY,
              left: e.clientX,
            };
          },
        });
        setOpen(true);
      }

      if (!nested) {
        trigger?.addEventListener('contextmenu', onContextMenu);
        return () => {
          trigger?.removeEventListener('contextmenu', onContextMenu);
        };
      }
    }, [mergedReferenceRef, trigger, nested]);

    useEffect(() => {
      if (open && !nested) {
        refs.floating.current?.focus();
      }
    }, [open, refs.floating, nested]);

    useEffect(() => {
      function onTreeClick() {
        setOpen(false);
      }

      tree?.events.on('click', onTreeClick);
      return () => {
        tree?.events.off('click', onTreeClick);
      };
    }, [parentId, tree, refs]);

    // Determine if "hover" logic can run based on the modality of input. This
    // prevents unwanted focus synchronization as menus open and close with
    // keyboard navigation and the cursor is resting on the menu.
    useEffect(() => {
      function onPointerMove() {
        setAllowHover(true);
      }

      function onKeyDown() {
        setAllowHover(false);
      }

      window.addEventListener('pointermove', onPointerMove, {
        once: true,
        capture: true,
      });
      window.addEventListener('keydown', onKeyDown, true);
      return () => {
        window.removeEventListener('pointermove', onPointerMove, {
          capture: true,
        });
        window.removeEventListener('keydown', onKeyDown, true);
      };
    }, [allowHover]);

    return (
      <FloatingNode id={nodeId}>
        <button
          {...getReferenceProps({
            ...props,
            ref: mergedReferenceRef,
            onClick(event) {
              event.stopPropagation();
              (event.currentTarget as HTMLButtonElement).focus();
            },
            ...(nested
              ? {
                  className: cx('menu-item inline-flex justify-between pr-2', {
                    'menu-item-open': open,
                    'menu-item-compact': compact,
                  }),
                  role: 'menuitem',
                  onKeyDown(event) {
                    // Prevent more than one menu from being open.
                    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                      setOpen(false);
                    }
                  },
                }
              : {
                  className: 'hidden',
                }),
          })}
        >
          {label} {nested && <span>{'>'}</span>}
        </button>

        <FloatingPortal>
          {open && (
            <FloatingOverlay lockScroll>
              <FloatingFocusManager
                context={context}
                preventTabbing
                modal={!nested}
                order={['reference', 'content']}
              >
                <div
                  {...getFloatingProps({
                    className,
                    ref: floating,
                    style: {
                      position: strategy,
                      top: y ?? 0,
                      left: x ?? 0,
                    },
                  })}
                >
                  {Children.map(
                    children,
                    (child, index) =>
                      isValidElement(child) &&
                      cloneElement(
                        child,
                        getItemProps({
                          role: 'menuitem',
                          ref(node: HTMLElement) {
                            listItemsRef.current[index] = node;
                          },
                          onClick() {
                            tree?.events.emit('click');
                          },
                          // By default `focusItemOnHover` uses `mousemove` to sync focus,
                          // but when a menu closes we want this to sync it on `enter`
                          // even if the cursor didn't move. NB: Safari does not sync in
                          // this case.
                          onPointerEnter() {
                            if (allowHover) {
                              setActiveIndex(index);
                            }
                          },
                        })
                      )
                  )}
                </div>
              </FloatingFocusManager>
            </FloatingOverlay>
          )}
        </FloatingPortal>
      </FloatingNode>
    );
  }
);

const MenuItem = forwardRef<
  HTMLButtonElement,
  { label: string; disabled?: boolean } & HTMLProps<HTMLButtonElement>
>(({ label, disabled, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      role="menuitem"
      disabled={disabled}
      type="button"
    >
      {label}
    </button>
  );
});

export const NestedContextMenu = forwardRef<
  any,
  Props & HTMLProps<HTMLButtonElement>
>((props, ref) => {
  const parentId = useFloatingParentNodeId();

  if (parentId == null) {
    return (
      <FloatingTree>
        <ContextMenuBase {...props} ref={ref} />
      </FloatingTree>
    );
  }

  return <ContextMenuBase {...props} ref={ref} />;
});

type MenuItemsType = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  submenus?: MenuItemsType[];
};

type ContextMenuProps = {
  menuItems: MenuItemsType[][];
  trigger?: HTMLElement | null;
  compact?: boolean;
};

const ContextMenuDivider = forwardRef(() => (
  <button className="w-full px-2 py-1" disabled>
    <span className="block w-full border-b border-zinc-500"></span>
  </button>
));

const ContextMenu = ({
  menuItems,
  trigger,
  compact = true,
}: ContextMenuProps) => {
  return (
    <NestedContextMenu className="menu" trigger={trigger}>
      {menuItems.map((group, gIdx) => [
        ...group.map((item, idx) => {
          return item.submenus && item.submenus?.length > 0 ? (
            <NestedContextMenu
              label={item.label}
              className="menu"
              compact={compact}
            >
              {item.submenus?.map((menu, sIdx) => (
                <MenuItem
                  className={cx('menu-item pr-16', {
                    'menu-item-compact': compact,
                  })}
                  label={menu.label}
                  key={sIdx}
                ></MenuItem>
              ))}
            </NestedContextMenu>
          ) : (
            <MenuItem
              className={cx('menu-item', { 'menu-item-compact': compact })}
              disabled={item.disabled}
              key={`menuitem-${gIdx}-${idx}`}
              label={item.label}
            />
          );
        }),
        gIdx !== menuItems.length - 1 && <ContextMenuDivider />,
      ])}
    </NestedContextMenu>
  );
};

export default ContextMenu;
