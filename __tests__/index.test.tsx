import { fireEvent, render, screen } from '@testing-library/react';
import Home from '../src/pages';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

(global as any).DOMRect = {
  fromRect: () => ({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
  }),
};

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});

describe('Home', () => {
  window.ResizeObserver = ResizeObserver;
  window.IntersectionObserver = mockIntersectionObserver;

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

  it('should have bottom border on opened app', () => {
    const chromeBtn = screen.getByTestId('taskbar-btn-chrome');
    fireEvent.click(chromeBtn);
    expect(chromeBtn).toHaveClass('border-blue-300');
  });
});
