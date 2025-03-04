export function ChunkyText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={`chunky-text ${className ?? ''}`} data-text={children}>
      {children}
    </h1>
  );
}
