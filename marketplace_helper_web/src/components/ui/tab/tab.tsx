import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import type { TabProps } from './tab.props';

import './tab.scss';

const Tab = ({ className, link, title }: TabProps) => {
  return (
    <NavLink
      className={({ isActive }) => clsx('tab', isActive && 'tab_active', className)}
      to={link}
    >
      <span className="tab__title">{title}</span>
    </NavLink>
  );
};

export default Tab;
