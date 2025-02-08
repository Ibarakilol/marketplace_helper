import { NavLink } from 'react-router-dom';

import { buttonVariants } from '../button';

import type { TabProps } from './tab.props';

const Tab = ({ link, title }: TabProps) => {
  return (
    <NavLink
      className={({ isActive }) => buttonVariants({ variant: isActive ? 'default' : 'outline' })}
      to={link}
    >
      {title}
    </NavLink>
  );
};

export default Tab;
