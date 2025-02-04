import { observer } from 'mobx-react-lite';

import TabList from '../tab-list';

import globalAppStore from '@/stores/global-app-store';

import type { HeaderProps } from './header.props';

import './header.scss';

const Header = observer(({ tabs, title }: HeaderProps) => {
  const { user } = globalAppStore;
  const subtitle = `Здравствуйте, ${user.name}!`;

  return (
    <header className="header">
      <div className="header__intro">
        <h1 className="header__title">{title}</h1>
        {subtitle && <p className="header__subtitle">{subtitle}</p>}
      </div>
      <div className="header__content">{tabs && <TabList tabs={tabs} />}</div>
    </header>
  );
});

export default Header;
