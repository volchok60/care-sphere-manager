
import React from 'react';
import { useRouter } from '@/contexts/RouterContext';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string | ((props: { isActive: boolean }) => string);
  end?: boolean;
  onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({ 
  to, 
  children, 
  className, 
  end = false,
  onClick 
}) => {
  const { currentPath, navigate } = useRouter();
  
  const isActive = end 
    ? currentPath === to 
    : currentPath.startsWith(to);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
    onClick?.();
  };

  const computedClassName = typeof className === 'function' 
    ? className({ isActive }) 
    : className;

  return (
    <a href={to} onClick={handleClick} className={computedClassName}>
      {children}
    </a>
  );
};
