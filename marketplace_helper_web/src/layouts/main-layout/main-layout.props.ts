import type { ReactNode } from 'react';

import type { ITab } from '@/interfaces';

export interface MainLayoutProps {
  children: ReactNode;
  className?: string;
  tabs?: ITab[];
  title: string;
}
