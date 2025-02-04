import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import Tooltip, { type TooltipStyle } from '@/components/ui/tooltip';

import useUnmountAnimation from '@/hooks/use-unmount-animation';
import { Position } from '@/constants';
import type { TooltipTriggerProps } from './tooltip-trigger.props';

const AVERAGE_LETTER_WIDTH_PX = 8;
const AVERAGE_TOOLTIP_HEIGHT = 28;
const DEFAULT_TOOLTIP_Y_OFFSET = 2;
const DEFAULT_TOOLTIP_X_OFFSET = 12;
const TOOLTIP_HORIZONTAL_PADDING = 10;

const TooltipTrigger = ({
  children,
  className,
  isHideOnScroll = true,
  shouldShowOnHover = true,
  shouldShowTooltip,
  text,
  theme,
  tooltipXOffset = DEFAULT_TOOLTIP_X_OFFSET,
  tooltipYOffset = DEFAULT_TOOLTIP_Y_OFFSET,
  tooltipPosition = Position.BOTTOM,
}: TooltipTriggerProps) => {
  const tooltipTriggerRef = useRef<HTMLDivElement | null>(null);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [tooltipStyle, setTooltipStyle] = useState<TooltipStyle>({ left: '', top: '' });

  const handleTooltipEnter = () => {
    if (!shouldShowOnHover) {
      return;
    }

    setIsShown(true);
  };

  const hideTooltip = useCallback(() => {
    setIsShown(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (shouldShowOnHover && isShown) {
      hideTooltip();
    }
  }, [isShown, shouldShowOnHover, hideTooltip]);

  const { isUnmounting, onAnimationEnd, unmountComponent } = useUnmountAnimation(hideTooltip);

  useEffect(() => {
    if (isHideOnScroll) {
      if (isShown) {
        window.addEventListener('scroll', unmountComponent, true);
      } else {
        window.removeEventListener('scroll', unmountComponent, true);
      }
    }

    return () => {
      if (isHideOnScroll) {
        window.removeEventListener('scroll', unmountComponent, true);
      }
    };
  }, [unmountComponent, isHideOnScroll, isShown]);

  useEffect(() => {
    if (shouldShowOnHover) {
      return;
    }

    if (shouldShowTooltip && !isShown) {
      setIsShown(true);
    } else if (!shouldShowTooltip && isShown) {
      unmountComponent();
    }
  }, [isShown, shouldShowOnHover, shouldShowTooltip, unmountComponent]);

  useEffect(() => {
    const calcTooltipPosition = () => {
      const averageTooltipWidth =
        text.length * AVERAGE_LETTER_WIDTH_PX +
        TOOLTIP_HORIZONTAL_PADDING * 2 +
        DEFAULT_TOOLTIP_Y_OFFSET;

      if (tooltipTriggerRef.current) {
        const { bottom, left, height, right, width, top } =
          tooltipTriggerRef.current.getBoundingClientRect();
        const isLeftScreenEdge = left + width / 2 - averageTooltipWidth < 0;
        const isHalfLeftScreenEdge = left + width / 2 - averageTooltipWidth / 2 < 0;
        const isRightScreenEdge = right - width / 2 + averageTooltipWidth > window.innerWidth;
        const isHalfRightScreenEdge =
          right - width / 2 + averageTooltipWidth / 2 > window.innerWidth;
        const isTopScreenEdge = top < AVERAGE_TOOLTIP_HEIGHT;
        const isBottomScreenEdge = bottom + AVERAGE_TOOLTIP_HEIGHT > window.innerHeight;
        let leftPxPos, tooltipTransform, tooltipTransformX, tooltipTransformY, topPxPos;

        switch (tooltipPosition) {
          case 'left':
            leftPxPos = isLeftScreenEdge ? `${left + width + tooltipXOffset}px` : `${left}px`;
            tooltipTransform = isLeftScreenEdge
              ? 'translate(0, -50%)'
              : `translate(calc(-100% - ${tooltipXOffset}px), -50%)`;

            setTooltipStyle({
              left: leftPxPos,
              top: `${top + height / 2}px`,
              transform: tooltipTransform,
            });

            break;
          case 'right':
            leftPxPos = isRightScreenEdge ? `${left}px` : `${left + width}px`;
            tooltipTransform = isRightScreenEdge
              ? `translate(calc(-100% - ${tooltipYOffset}px), -50%)`
              : `translate(${tooltipXOffset}px, -50%)`;

            setTooltipStyle({
              left: leftPxPos,
              top: `${top + height / 2}px`,
              transform: tooltipTransform,
            });

            break;
          case 'bottom':
            leftPxPos = isLeftScreenEdge
              ? `${left}px`
              : isHalfRightScreenEdge
                ? `${right}px`
                : `${left + width / 2}px`;
            topPxPos = isBottomScreenEdge ? `${top}px` : `${bottom}px`;
            tooltipTransformX = isLeftScreenEdge ? `0` : isHalfRightScreenEdge ? `-100%` : `-50%`;
            tooltipTransformY = isBottomScreenEdge
              ? `calc(-100% - ${tooltipYOffset}px)`
              : `${tooltipYOffset}px`;

            setTooltipStyle({
              left: leftPxPos,
              top: topPxPos,
              transform: `translate(${tooltipTransformX}, ${tooltipTransformY})`,
            });

            break;
          case 'top':
            leftPxPos = isHalfLeftScreenEdge
              ? `${left}px`
              : isHalfRightScreenEdge
                ? `${right}px`
                : `${left + width / 2}px`;
            topPxPos = isTopScreenEdge ? `${bottom}px` : `${top}px`;
            tooltipTransformX = isHalfLeftScreenEdge
              ? `0`
              : isHalfRightScreenEdge
                ? `-100%`
                : `-50%`;
            tooltipTransformY = isTopScreenEdge
              ? `${tooltipYOffset}px`
              : `calc(-100% - ${tooltipYOffset}px)`;

            setTooltipStyle({
              left: leftPxPos,
              top: topPxPos,
              transform: `translate(${tooltipTransformX}, ${tooltipTransformY})`,
            });

            break;
          default:
            break;
        }
      }
    };

    if (isShown) {
      calcTooltipPosition();
    }
  }, [isShown, text, tooltipXOffset, tooltipYOffset, tooltipPosition, tooltipTriggerRef]);

  return (
    <div
      className={clsx('tooltip-trigger', className)}
      ref={tooltipTriggerRef}
      onMouseEnter={handleTooltipEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isShown && (
        <Tooltip
          isUnmounting={isUnmounting}
          text={text}
          theme={theme}
          style={tooltipStyle}
          onAnimationEnd={onAnimationEnd}
        />
      )}

      {children}
    </div>
  );
};

export default TooltipTrigger;
