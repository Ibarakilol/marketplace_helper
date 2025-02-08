import { observer } from 'mobx-react-lite';

import TabList from '../tab-list';

import globalAppStore from '@/stores/global-app-store';

import type { HeaderProps } from './header.props';

const Header = observer(({ tabs, title }: HeaderProps) => {
  const { user } = globalAppStore;
  const subtitle = `Здравствуйте, ${user.name}!`;

  return (
    <header className="grid items-center bg-white border-solid border-b border-b-zinc-200 grid-flow-col justify-between px-8 [grid-area:header]">
      <div className="grid self-center">
        <h1 className="font-bold text-sm">{title}</h1>
        {subtitle && <p className="text-xs">{subtitle}</p>}
      </div>
      <div className="grid gap-7 grid-flow-col">{tabs && <TabList tabs={tabs} />}</div>
    </header>
  );
});

export default Header;
