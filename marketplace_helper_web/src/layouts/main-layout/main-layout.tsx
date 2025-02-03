import { observer } from 'mobx-react-lite';

import type { MainLayoutProps } from './main-layout.props';

import './main-layout.scss';

const MainLayout = observer(({ children }: MainLayoutProps) => {
  return <div className="main-layout">{children}</div>;
});

export default MainLayout;
