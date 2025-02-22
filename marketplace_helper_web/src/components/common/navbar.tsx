import { observer } from 'mobx-react-lite';

import NavbarItem from '@/components/common/navbar-item';
import ExitIcon from '@/assets/icons/exit.svg';
import WildberriesIcon from '@/assets/icons/wildberries.svg';

import userStore from '@/stores/user-store';

import { AppRoute } from '@/constants';

const Navbar = observer(() => {
  const { logoutUser } = userStore;

  return (
    <nav className="[grid-area:navbar] bg-zinc-800 grid grid-rows-[1fr_max-content] justify-items-center pt-5 pb-6">
      <ul className="grid gap-5 content-start">
        <NavbarItem linkProps={{ url: AppRoute.WILDBERRIES_FEEDBACKS }} tooltipText="Wildberries">
          <WildberriesIcon />
        </NavbarItem>
      </ul>

      <ul className="grid gap-5 content-start pt-5 relative before:bg-zinc-500 before:content-[''] before:h-[1px] before:left-1/2 before:absolute before:w-5 before:-translate-x-1/2">
        <NavbarItem buttonProps={{ onClick: logoutUser }} tooltipText="Выход">
          <ExitIcon />
        </NavbarItem>
      </ul>
    </nav>
  );
});

export default Navbar;
