import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import Taskbar from '../components/taskbar/Taskbar';

const Home: NextPage = () => {
  const rootElRef = useRef<HTMLDivElement>(null);

  const handleRightClick = (e: MouseEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const rootEl = rootElRef.current;
    if (rootEl) {
      rootEl.addEventListener('contextmenu', handleRightClick);
      return () => {
        rootEl.removeEventListener('contextmenu', handleRightClick);
      };
    }
  }, []);

  return (
    <div className="bg-bing h-screen" ref={rootElRef}>
      <Taskbar />
    </div>
  );
};

export default Home;
