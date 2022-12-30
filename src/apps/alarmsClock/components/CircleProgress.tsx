export default function CircleProgress() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-1 -1 34 34"
      className="h-56 w-56 -rotate-90 fill-none"
    >
      <circle cx="16" cy="16" r="15" className="stroke-zinc-500 stroke-[1.8]" />
      <circle
        cx="16"
        cy="16"
        r="15"
        className="stroke-blue-500 stroke-[1.8] [stroke-dasharray:100,100] [stroke-dashoffset:40] [stroke-linecap:round]"
      />
    </svg>
  );
}
