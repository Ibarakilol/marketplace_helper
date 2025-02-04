import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import Header from '@/components/common/header';
import Navbar from '@/components/common/navbar';

import type { MainLayoutProps } from './main-layout.props';

import './main-layout.scss';

const MainLayout = observer(({ children, className, tabs, title }: MainLayoutProps) => {
  return (
    <div className={clsx('main-layout', className)}>
      <Navbar />
      <Header tabs={tabs} title={title} />
      <div className="main-layout__content scrollbar">{children}</div>
    </div>
  );
});

export default MainLayout;
