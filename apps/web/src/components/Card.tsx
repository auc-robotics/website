import { twMerge } from "tailwind-merge";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "w-full max-w-md overflow-hidden rounded-xl border border-slate-400 bg-slate-50 shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
