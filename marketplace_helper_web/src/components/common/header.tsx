import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TabList from './tab-list';

import userStore from '@/stores/user-store';

import { useToast } from '@/hooks/use-toast';
import type { ITab } from '@/interfaces';

interface HeaderProps {
  tabs?: ITab[];
  title: string;
}

const Header = observer(({ tabs, title }: HeaderProps) => {
  const { toast } = useToast();
  const { user, isProcessing, updateUserProfile } = userStore;
  const [wbApiKey, setWbApiKey] = useState<string>('');
  const [wbSupplierName, setWbSupplierName] = useState<string>(user?.wbSupplierName || '');

  const handleUpdateUserProfile = async () => {
    const isSuccess = await updateUserProfile({ wbApiKey, wbSupplierName });

    if (isSuccess) {
      toast({
        title: 'Настройки успешно обновлены',
      });
    } else {
      toast({
        title: 'Ошибка при обновлении настроек',
        description: 'Попробуйте ещё раз',
        variant: 'destructive',
      });
    }
  };

  return (
    <header className="grid items-center bg-white border-solid border-b border-b-zinc-200 grid-cols-[1fr_auto_1fr] justify-between px-8 [grid-area:header]">
      <h1 className="font-bold">{title}</h1>
      {tabs && <TabList tabs={tabs} />}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-fit justify-self-end" variant="outline">
            Настройки
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Настройки</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-[96px_1fr] items-center gap-4">
              <Label htmlFor="wbSupplierName">Название поставщика</Label>
              <Input
                id="wbSupplierName"
                disabled={isProcessing}
                value={wbSupplierName}
                onChange={(e) => setWbSupplierName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-[96px_1fr] items-center gap-4">
              <Label htmlFor="wbApiKey">API ключ Wildberries</Label>
              <Input
                id="wbApiKey"
                disabled={isProcessing}
                value={wbApiKey}
                onChange={(e) => setWbApiKey(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button disabled={isProcessing} type="submit" onClick={handleUpdateUserProfile}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
});

export default Header;
