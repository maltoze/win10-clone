import cx from 'classnames';
import { AnimationControls, motion } from 'framer-motion';
import React from 'react';
import { useEffect } from 'react';

type Props = {
  isRunning: boolean;
  controls: AnimationControls;
} & React.ComponentProps<'svg'>;

const CircleProgress = (props: Props) => {
  const { isRunning, className, controls, strokeDashoffset } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-1 -1 34 34"
      className={cx('-rotate-90 fill-none', className)}
    >
      <circle
        cx="16"
        cy="16"
        r="15.92"
        className="stroke-zinc-500 stroke-[1.8]"
      />
      <motion.circle
        cx="16"
        cy="16"
        r="15.92"
        className={cx(
          'stroke-[1.8] [stroke-dasharray:100,100] [stroke-linecap:round]',
          {
            'stroke-blue-500': isRunning,
            'stroke-sky-600':
              strokeDashoffset && strokeDashoffset > 0 && !isRunning,
          }
        )}
        strokeDashoffset={strokeDashoffset}
        animate={controls}
        data-testid="timer-circle"
      />
    </svg>
  );
};

export default CircleProgress;
