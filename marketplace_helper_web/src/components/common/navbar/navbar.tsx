import { observer } from 'mobx-react-lite';

import NavbarItem from './navbar-item';
import CatalogIcon from '@/assets/icons/catalog.svg';
import ExitIcon from '@/assets/icons/exit.svg';
import SettingsIcon from '@/assets/icons/settings.svg';

import globalAppStore from '@/stores/global-app-store';

import { AppRoute } from '@/constants';

import './navbar.scss';

const Navbar = observer(() => (
  <nav className="navbar">
    <ul className="navbar__menu">
      <NavbarItem linkProps={{ url: AppRoute.WILDBERRIES }} tooltipText="Wildberries">
        <CatalogIcon />
      </NavbarItem>
    </ul>

    <ul className="navbar__menu navbar__menu_bottom">
      <NavbarItem linkProps={{ url: AppRoute.SETTINGS }} tooltipText="Настройки">
        <SettingsIcon />
      </NavbarItem>

      <NavbarItem buttonProps={{ onClick: globalAppStore.logout }} tooltipText="Выход">
        <ExitIcon />
      </NavbarItem>
    </ul>
  </nav>
));

export default Navbar;
