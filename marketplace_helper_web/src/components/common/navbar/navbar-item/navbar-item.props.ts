import type { ReactNode } from 'react';

export interface NavbarItemProps {
  children: ReactNode;
  className?: string;
  buttonProps?: {
    onClick: () => void;
  };
  linkProps?: {
    isExternal?: boolean;
    url: string;
  };
  tooltipText: string;
}
