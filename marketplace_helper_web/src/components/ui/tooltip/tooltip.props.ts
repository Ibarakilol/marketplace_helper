export interface TooltipStyle {
  left?: string;
  right?: string;
  top: string;
  transform?: string;
}

export interface TooltipProps {
  isUnmounting?: boolean;
  style: TooltipStyle;
  text: string;
  theme?: 'dark' | 'light';
  onAnimationEnd?: () => void;
}
