import { useEffect, useState } from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isProcessing: boolean;
  onProcessFeedbacks: (selectedFeedbacks: TData[]) => Promise<void>;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  isProcessing,
  onProcessFeedbacks,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedFeedbacks, setSelectedFeedbacks] = useState<TData[]>([]);

  useEffect(() => {
    const selectedFeedbacks = data.filter((_, idx) => rowSelection[idx]);

    setSelectedFeedbacks(selectedFeedbacks);
  }, [data, rowSelection]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();

  const handleProcessFeedback = async () => {
    await onProcessFeedbacks(selectedFeedbacks);
  };

  return (
    <div className="grid gap-4 p-8">
      <div className="grid grid-cols-[1fr_160px] justify-between items-center">
        <Input
          className="max-w-80"
          placeholder="Фильтр по SKU"
          value={(table.getColumn('sku')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('sku')?.setFilterValue(event.target.value)}
        />
        <Button
          disabled={!selectedFeedbacks.length || isProcessing}
          onClick={handleProcessFeedback}
        >
          {isProcessing ? 'Обрабатывается...' : 'Обработать отзывы'}
        </Button>
      </div>
      <Table className="border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                Нет результатов.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {(canPreviousPage || canNextPage) && (
        <div className="grid grid-flow-col items-center justify-center gap-2 py-4">
          {canPreviousPage && (
            <Button size="sm" variant="outline" onClick={table.previousPage}>
              Предыдущая
            </Button>
          )}
          {canNextPage && (
            <Button size="sm" variant="outline" onClick={table.nextPage}>
              Следующая
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default DataTable;
