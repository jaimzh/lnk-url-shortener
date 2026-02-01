export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="relative flex flex-col items-center">
        <div className="w-12 h-12 border-t-2 border-accent rounded-full animate-spin"></div>
        <p className="mt-4 text-text-muted/40 text-[10px] uppercase tracking-[0.4em] font-medium animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
}
