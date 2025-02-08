import { observer } from 'mobx-react-lite';

import Header from '@/components/common/header';
import Navbar from '@/components/common/navbar';

import type { MainLayoutProps } from './main-layout.props';

const MainLayout = observer(({ children, tabs, title }: MainLayoutProps) => {
  return (
    <div className="grid grid-cols-[48px_1fr] grid-rows-[72px_1fr] [grid-template-areas:'navbar_header''navbar_.'] h-screen w-full">
      <Navbar />
      <Header tabs={tabs} title={title} />
      <div className="overflow-y-auto">{children}</div>
    </div>
  );
});

export default MainLayout;
