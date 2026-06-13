type TravelerFigureProps = {
  className?: string;
};

/** Light-blue human figure — the end user traveling the journey. */
export function TravelerFigure({ className = '' }: TravelerFigureProps) {
  return (
    <div
      className={`traveler-size relative flex items-center justify-center rounded-full border-2 border-cyan-200/55 bg-[#0c1018] shadow-[0_0_0_3px_rgba(34,211,238,0.12),0_0_20px_rgba(34,211,238,0.35)] ${className}`}
    >
      <svg aria-hidden viewBox="0 0 24 36" className="h-[55%] w-[42%]" fill="none">
        <circle cx="12" cy="6" r="4.5" fill="rgb(165 243 252)" />
        <path
          d="M12 10.5V18M6.5 14H17.5M6.5 14L4 22M17.5 14L20 22M12 18L8 28M12 18L16 28M7 28H9M15 28H17"
          stroke="rgb(165 243 252)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
