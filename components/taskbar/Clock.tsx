import { useEffect, useState } from 'react';

type DateTimeType = {
  date: string;
  time: string;
};

const getCurrentDt = () => {
  const currDt = new Date();
  return {
    date: currDt.toLocaleDateString(),
    time: currDt.toLocaleTimeString(),
  };
};

const Clock = () => {
  const [dt, setDt] = useState<DateTimeType>();

  useEffect(() => {
    // NOTE: https://nextjs.org/docs/messages/react-hydration-error
    setDt(getCurrentDt);
    const interval = setInterval(() => {
      setDt(getCurrentDt);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex h-full cursor-default select-none flex-col items-center justify-center space-y-0.5 px-1.5 text-xs text-zinc-300 hover:bg-zinc-800">
      <div>{dt?.time}</div>
      <div>{dt?.date}</div>
    </div>
  );
};

export default Clock;
