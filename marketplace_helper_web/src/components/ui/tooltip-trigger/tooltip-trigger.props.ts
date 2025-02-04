import type { ReactNode } from 'react';

import type { Position } from '@/constants';

export interface TooltipTriggerProps {
  children: ReactNode;
  className?: string;
  isHideOnScroll?: boolean;
  shouldShowOnHover?: boolean;
  shouldShowTooltip?: boolean;
  text: string;
  theme?: 'dark' | 'light';
  tooltipPosition?: Position;
  tooltipXOffset?: number;
  tooltipYOffset?: number;
  withTail?: boolean;
}
