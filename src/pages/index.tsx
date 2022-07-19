import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import ContextMenu from '../components/base/ContextMenu';
import Desktop from '../components/desktop/Desktop';
import Taskbar from '../components/taskbar/Taskbar';

const Home: NextPage = () => {
  useEffect(() => {
    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleRightClick);
    return () => {
      document.removeEventListener('contextmenu', handleRightClick);
    };
  }, []);

  return (
    <div className="bg-bing flex h-screen flex-col">
      <Desktop />
      <Taskbar />
    </div>
  );
};

export default Home;
