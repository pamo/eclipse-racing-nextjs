export function ChunkyText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={`mb-2 text-4xl font-black uppercase tracking-wide ${className}`}>
      <span className="relative">
        <span className="absolute -inset-0.5 -z-10 translate-x-2 translate-y-2 transform text-black">
          {children}
        </span>
        <span className="text-stroke relative z-10">{children}</span>
      </span>
    </h1>
  );
}
