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
} from '@floating-ui/react-dom-interactions';
import {
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

type Props = {
  label?: string;
  nested?: boolean;
  targetEl?: HTMLElement | null;
};

// eslint-disable-next-line react/display-name
const ContextMenu = forwardRef<any, Props & HTMLProps<HTMLButtonElement>>(
  ({ children, targetEl, className }, ref) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [open, setOpen] = useState(false);

    const listItemsRef = useRef<Array<HTMLButtonElement | null>>([]);
    const listContentRef = useRef(
      Children.map(children, (child) =>
        isValidElement(child) ? child.props.label : null
      ) as Array<string | null>
    );

    const { x, y, reference, floating, strategy, refs, update, context } =
      useFloating({
        open,
        onOpenChange: setOpen,
        middleware: [
          offset({ mainAxis: 5, alignmentAxis: 4 }),
          flip(),
          shift(),
        ],
        placement: 'right-start',
      });

    const { getFloatingProps, getItemProps } = useInteractions([
      useRole(context, { role: 'menu' }),
      useDismiss(context),
      useListNavigation(context, {
        listRef: listItemsRef,
        activeIndex,
        onNavigate: setActiveIndex,
        focusItemOnOpen: false,
      }),
      useTypeahead(context, {
        enabled: open,
        listRef: listContentRef,
        onMatch: setActiveIndex,
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

      targetEl?.addEventListener('contextmenu', onContextMenu);
      return () => {
        targetEl?.removeEventListener('contextmenu', onContextMenu);
      };
    }, [mergedReferenceRef, targetEl]);

    useEffect(() => {
      if (open) {
        refs.floating.current?.focus();
      }
    }, [open, refs.floating]);

    return (
      <FloatingPortal>
        {open && (
          <FloatingOverlay>
            <FloatingFocusManager context={context} preventTabbing>
              <div
                className={className}
                {...getFloatingProps({
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
                        ref(node: HTMLButtonElement) {
                          listItemsRef.current[index] = node;
                        },
                      })
                    )
                )}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    );
  }
);

export default ContextMenu;
