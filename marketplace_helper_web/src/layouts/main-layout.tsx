import type { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';

import Header from '@/components/common/header';
import Navbar from '@/components/common/navbar';

import type { ITab } from '@/interfaces';

interface MainLayoutProps {
  children: ReactNode;
  tabs?: ITab[];
  title: string;
}

const MainLayout = observer(({ children, tabs, title }: MainLayoutProps) => {
  return (
    <div className="grid grid-cols-[48px_1fr] grid-rows-[72px_1fr] [grid-template-areas:'navbar_header''navbar_.'] h-screen w-full">
      <Navbar />
      <Header tabs={tabs} title={title} />
      {children}
    </div>
  );
});

export default MainLayout;
