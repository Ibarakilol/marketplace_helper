import type React from 'react';
import { NavLink } from 'react-router-dom';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import type { NavbarItemProps } from './navbar-item.props';

const NavbarItem = ({ children, buttonProps, linkProps, tooltipText }: NavbarItemProps) => {
  const renderInnerElement = () => {
    if (buttonProps) {
      const { onClick } = buttonProps;

      const handleButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        onClick();
      };

      return (
        <button
          className="grid items-center rounded-lg text-white h-9 justify-items-center w-9 hover:bg-zinc-600 duration-150"
          aria-label={tooltipText}
          onClick={handleButtonClick}
        >
          {children}
        </button>
      );
    }

    if (linkProps) {
      const { isExternal, url } = linkProps;

      if (isExternal) {
        return (
          <a
            className="grid items-center rounded-lg text-white h-9 justify-items-center w-9 hover:bg-zinc-600 duration-150"
            aria-label={tooltipText}
            href={url}
          >
            {children}
          </a>
        );
      }

      return (
        <NavLink
          className="grid items-center rounded-lg text-white h-9 justify-items-center w-9 hover:bg-zinc-600 duration-150"
          aria-label={tooltipText}
          to={url}
        >
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
