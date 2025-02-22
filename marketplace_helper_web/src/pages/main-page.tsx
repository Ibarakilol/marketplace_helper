import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import DataTable from '@/components/common/data-table';
import { columns } from '@/components/common/feedback-columns';

import wildberriesStore from '@/stores/wildberries-store';

const MainPage = observer(() => {
  const { isLoading, feedbacks, isProcessing, processFeedbacks } = wildberriesStore;

  useEffect(() => {
    wildberriesStore.fetchFeedbacks();
  }, []);

  return (
    <div className="h-full">
      {isLoading ? (
        <div className="grid h-full items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={feedbacks}
          isProcessing={isProcessing}
          onProcessFeedbacks={processFeedbacks}
        />
      )}
    </div>
  );
});

export default MainPage;
