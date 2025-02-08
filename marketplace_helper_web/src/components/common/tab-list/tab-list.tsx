import Tab from '@/components/ui/tab';

import type { TabListProps } from './tab-list.props';

const TabList = ({ tabs }: TabListProps) => {
  return (
    <ul className="grid gap-3 grid-flow-col">
      {tabs.map(({ link, title }) => (
        <li key={title}>
          <Tab link={link} title={title} />
        </li>
      ))}
    </ul>
  );
};

export default TabList;
