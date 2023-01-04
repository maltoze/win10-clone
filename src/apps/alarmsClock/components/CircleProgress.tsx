import cx from 'classnames';

type Props = {
  value: number;
  duration: number;
};

export default function CircleProgress({ value = 0, duration }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-1 -1 34 34"
      className="h-56 w-56 -rotate-90 fill-none"
    >
      <circle
        cx="16"
        cy="16"
        r="15.92"
        className="stroke-zinc-500 stroke-[1.8]"
      />
      <circle
        cx="16"
        cy="16"
        r="15.92"
        className={cx(
          'stroke-[1.8] transition-[stroke-dashoffset] ease-linear [stroke-dasharray:100,100] [stroke-linecap:round]',
          {
            'stroke-blue-500': value === 100,
            'stroke-sky-700': value !== 100 && value !== 0,
            'transition-none': value !== 100,
          }
        )}
        style={{
          strokeDashoffset: value,
          transitionDuration: `${duration}s`,
        }}
      />
    </svg>
  );
}
