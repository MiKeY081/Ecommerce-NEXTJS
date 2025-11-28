import Link from 'next/link';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  className?: string;
  activeClassName?: string;
  children?: React.ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(({ href, className, activeClassName, children, ...props }, ref) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} ref={ref as any} className={cn(className, isActive && activeClassName)} {...props}>
      {children}
    </Link>
  );
});

NavLink.displayName = 'NavLink';

export { NavLink };
