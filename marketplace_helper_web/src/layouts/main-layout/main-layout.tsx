import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import Navbar from '@/components/common/navbar';

import type { MainLayoutProps } from './main-layout.props';

import './main-layout.scss';

const MainLayout = observer(({ children, className }: MainLayoutProps) => {
  return (
    <div className={clsx('main-layout', className)}>
      <Navbar />
      <div className="main-layout__content scrollbar">{children}</div>
    </div>
  );
});

export default MainLayout;
