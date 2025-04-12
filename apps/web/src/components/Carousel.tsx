export default function Carousel({ children }: { children: React.ReactNode }) {
  return (
    <div className="group overflow-hidden">
      <div className="animate-infinite-slide flex w-max gap-2">
        {children}
        {children}
      </div>
    </div>
  );
}
