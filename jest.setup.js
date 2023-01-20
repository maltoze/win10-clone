import '@testing-library/jest-dom/extend-expect';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.DOMRect = {
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

window.ResizeObserver = ResizeObserver;
window.IntersectionObserver = mockIntersectionObserver;

jest.useFakeTimers();
