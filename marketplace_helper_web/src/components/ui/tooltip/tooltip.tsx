import { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';

import type { TooltipProps } from './tooltip.props';

import './tooltip.scss';

const Component = ({ isUnmounting, style, text, theme, onAnimationEnd }: TooltipProps) => (
  <div
    className={clsx('tooltip', `tooltip_${theme}`, isUnmounting && 'tooltip_unmounting')}
    style={style}
    onAnimationEnd={onAnimationEnd}
  >
    <p className="tooltip__text">{text}</p>
  </div>
);

const Tooltip = ({ isUnmounting, style, text, theme = 'dark', onAnimationEnd }: TooltipProps) => {
  const el = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    document.body.appendChild(el);

    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  return ReactDOM.createPortal(
    <Component
      isUnmounting={isUnmounting}
      style={style}
      text={text}
      theme={theme}
      onAnimationEnd={onAnimationEnd}
    />,
    el
  );
};

export default Tooltip;
