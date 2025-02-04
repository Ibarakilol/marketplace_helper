import type React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import TooltipTrigger from '@/components/ui/tooltip-trigger';

import type { NavbarItemProps } from './navbar-item.props';

import './navbar-item.scss';

function NavbarItem({ children, className, buttonProps, linkProps, tooltipText }: NavbarItemProps) {
  const renderInnerElement = () => {
    if (buttonProps) {
      const { onClick } = buttonProps;

      const handleButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        onClick();
      };

      return (
        <button
          className="navbar-item__button"
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
          <a className="navbar-item__link" aria-label={tooltipText} href={url}>
            {children}
          </a>
        );
      }

      return (
        <NavLink
          className={({ isActive }) =>
            clsx('navbar-item__link', isActive && 'navbar-item__link_active')
          }
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
    <li className={clsx('navbar-item', className)}>
      <TooltipTrigger text={tooltipText}>{renderInnerElement()}</TooltipTrigger>
    </li>
  );
}

export default NavbarItem;
