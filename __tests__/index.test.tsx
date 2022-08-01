import { fireEvent, render, screen } from '@testing-library/react';
import Home from '../src/pages';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('Home', () => {
  window.ResizeObserver = ResizeObserver;

  beforeEach(() => {
    render(<Home />);
  });

  it('should show context menu on desktop', () => {
    const desktop = screen.getByTestId('desktop');
    fireEvent.contextMenu(desktop);
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('should show context menu on taskbar', () => {
    const taskbar = screen.getByTestId('taskbar');
    fireEvent.contextMenu(taskbar);
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('should show chrome window', () => {
    const chromeBtn = screen.getByTestId('taskbar-btn-chrome');
    fireEvent.click(chromeBtn);
    expect(screen.getByTestId('chrome-window')).toBeInTheDocument();
  });
});
