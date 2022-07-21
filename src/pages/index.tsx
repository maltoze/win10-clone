import type { NextPage } from 'next';
import { useEffect } from 'react';
import Apps from '../apps';
import Desktop from '../components/desktop/Desktop';
import Taskbar from '../components/taskbar/Taskbar';
import useHydration from '../hooks/hydration';

const Home: NextPage = () => {
  const hydrated = useHydration();

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
      {hydrated && <Apps />}
    </div>
  );
};

export default Home;
