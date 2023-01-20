import { fireEvent, render, screen } from '@testing-library/react';
import Home from '../src/pages';

describe('Home', () => {
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
    expect(chromeBtn).toHaveClass('bg-zinc-800');
  });
});
