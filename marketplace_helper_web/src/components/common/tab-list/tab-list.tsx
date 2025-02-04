import Tab from '@/components/ui/tab';

import type { TabListProps } from './tab-list.props';

import './tab-list.scss';

const TabList = ({ tabs }: TabListProps) => {
  return (
    <ul className="tab-list">
      {tabs.map(({ link, title }) => (
        <li key={title} className="tab-list__item">
          <Tab link={link} title={title} />
        </li>
      ))}
    </ul>
  );
};

export default TabList;
