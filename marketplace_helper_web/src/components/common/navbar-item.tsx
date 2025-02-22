import type { MouseEvent, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface NavbarItemProps {
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

const NavbarItem = ({ children, buttonProps, linkProps, tooltipText }: NavbarItemProps) => {
  const renderInnerElement = () => {
    if (buttonProps) {
      const { onClick } = buttonProps;

      const handleButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        onClick();
      };

      return (
        <button className="navbar-item" aria-label={tooltipText} onClick={handleButtonClick}>
          {children}
        </button>
      );
    }

    if (linkProps) {
      const { isExternal, url } = linkProps;

      if (isExternal) {
        return (
          <a className="navbar-item" aria-label={tooltipText} href={url}>
            {children}
          </a>
        );
      }

      return (
        <NavLink className="navbar-item" aria-label={tooltipText} to={url}>
          {children}
        </NavLink>
      );
    }

    return children;
  };

  return (
    <li>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{renderInnerElement()}</TooltipTrigger>
          <TooltipContent>{tooltipText}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </li>
  );
};

export default NavbarItem;
