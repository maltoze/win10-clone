import { SVGProps } from 'react';

export default function ShutdownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      viewBox="0 0 32 32"
      {...props}
    >
      <path d="M15 4v12h2V4h-2zm-3 .688C7.346 6.338 4 10.788 4 16c0 6.617 5.383 12 12 12s12-5.383 12-12c0-5.213-3.346-9.662-8-11.313v2.157C23.526 8.39 26 11.91 26 16c0 5.514-4.486 10-10 10S6 21.514 6 16c0-4.09 2.474-7.61 6-9.156V4.687z"></path>
    </svg>
  );
}
