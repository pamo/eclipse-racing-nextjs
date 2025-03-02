import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

interface PushButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}
interface PushLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
}
const baseStyles =
  'relative rounded-full border-2 border-black px-4 py-1 text-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow active:shadow-none disabled:cursor-not-allowed disabled:opacity-50';

export function PushButton({ children, className, ...props }: PushButtonProps) {
  return (
    <button className={`${className} ${baseStyles}`} {...props}>
      {children}
    </button>
  );
}

export function PushLink({ children, className, ...props }: PushLinkProps) {
  return (
    <a className={`${className} ${baseStyles} no-underline`} {...props}>
      {children}
    </a>
  );
}
