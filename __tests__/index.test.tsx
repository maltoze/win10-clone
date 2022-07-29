import { fireEvent, render, screen } from '@testing-library/react';
import Home from '../src/pages';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('Home', () => {
  window.ResizeObserver = ResizeObserver;
  it('should show context menu on desktop', () => {
    render(<Home />);
    const desktop = screen.getByTestId('desktop');
    fireEvent.contextMenu(desktop);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.queryAllByRole('menuitem')).toHaveLength(7);
  });

  it('should show context menu on taskbar', () => {
    render(<Home />);
    const taskbar = screen.getByTestId('taskbar');
    fireEvent.contextMenu(taskbar);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.queryAllByRole('menuitem')).toHaveLength(11);
  });
});
