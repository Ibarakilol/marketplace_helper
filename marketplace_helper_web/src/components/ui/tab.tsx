import { NavLink } from 'react-router-dom';

import { buttonVariants } from './button';

interface TabProps {
  link: string;
  title: string;
}

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
