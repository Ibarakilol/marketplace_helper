import type { ReactNode } from 'react';

export interface NavbarItemProps {
  children: ReactNode;
  buttonProps?: {
    onClick: () => void;
  };
  linkProps?: {
    isExternal?: boolean;
    url: string;
  };
  tooltipText: string;
}
