import { fireEvent, render, screen } from '@testing-library/react';
import AlarmsClock from '../src/apps/alarmsClock';
import { act } from 'react-dom/test-utils';

describe('AlarmsClock', () => {
  beforeEach(() => {
    render(<AlarmsClock />);
  });

  it('should show Alarms&Clock window', () => {
    expect(screen.getAllByText(/Alarms & Clock/).length).toBeGreaterThanOrEqual(
      1
    );
  });

  it('should start timer', () => {
    render(<AlarmsClock />);
    const toggleBtn = screen.getAllByTitle('Start');
    act(() => {
      fireEvent.click(toggleBtn[0]);
    });
    expect(screen.getAllByTestId('timer-circle')[0]).toHaveClass(
      'stroke-blue-500'
    );
  });

  it('should reset and continue', () => {
    const resetBtn = screen.getAllByTitle('Reset');
    act(() => {
      fireEvent.click(resetBtn[0]);
    });
    const timerCircleEl = screen.getAllByTestId('timer-circle')[0];
    expect(timerCircleEl).toHaveClass('stroke-blue-500');
    expect(timerCircleEl.getAttribute('stroke-dashoffset')).toEqual('0');
  });

  it('should pause timer', () => {
    const toggleBtn = screen.getAllByTitle('Pause');
    act(() => {
      jest.advanceTimersByTime(1000);
      fireEvent.click(toggleBtn[0]);
    });
    const timerCircleEl = screen.getAllByTestId('timer-circle')[0];
    expect(timerCircleEl).toHaveClass('stroke-sky-600');
  });

  it('should reset timer', () => {
    const resetBtn = screen.getAllByTitle('Reset');
    act(() => {
      fireEvent.click(resetBtn[0]);
    });
    const timerCircleEl = screen.getAllByTestId('timer-circle')[0];
    expect(timerCircleEl).not.toHaveClass('stroke-blue-500', 'stroke-sky-600');
    expect(timerCircleEl.getAttribute('stroke-dashoffset')).toEqual('0');
  });
});
