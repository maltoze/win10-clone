import { SVGProps } from 'react';

export default function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m12 20l-1.425-1.4l5.6-5.6H4v-2h12.175l-5.6-5.6L12 4l8 8Z"
      ></path>
    </svg>
  );
}
