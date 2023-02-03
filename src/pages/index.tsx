import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import Desktop from '../containers/desktop/Desktop';
import Taskbar from '../containers/Taskbar';

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
    <>
      <Head>
        <title>Windows 10</title>
      </Head>
      <div className="absolute inset-0 flex flex-col overflow-hidden">
        <Desktop />
        <Taskbar />
      </div>
    </>
  );
};

export default Home;
