import { useState, useEffect } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from 'lucide-react';
import { DataTableViewOptions } from './DataTableViewOptions';
import { DataTableFacetedFilter } from './DataTableFacetedFilter';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onPaginationChange?: (pageIndex: number, pageSize: number) => void;
  totalCount?: number;
  serverPagination?: boolean;
  currentPage?: number;
  pageSize?: number;
  searchColumn?: string;
  filterableColumns?: {
    id: string;
    title: string;
    options: {
      label: string;
      value: string;
      icon?: React.ReactNode;
    }[];
  }[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onPaginationChange,
  totalCount,
  serverPagination = false,
  currentPage = 0,
  pageSize = 10,
  searchColumn,
  filterableColumns = [],
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pageIndex, setPageIndex] = useState(currentPage);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [searchValue, setSearchValue] = useState('');
  
  // Reset pagination when data changes
  useEffect(() => {
    if (serverPagination) {
      setPageIndex(currentPage);
      setRowsPerPage(pageSize);
    }
  }, [currentPage, pageSize, serverPagination]);
  
  const table = useReactTable({
    data,
    columns,
    pageCount: serverPagination && totalCount ? Math.ceil(totalCount / rowsPerPage) : undefined,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: {
        pageIndex,
        pageSize: rowsPerPage,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: serverPagination,
    manualFiltering: serverPagination,
  });
  
  // Handle pagination changes
  useEffect(() => {
    if (serverPagination && onPaginationChange) {
      onPaginationChange(pageIndex, rowsPerPage);
    }
  }, [pageIndex, rowsPerPage, serverPagination, onPaginationChange]);
  
  // Handle search box input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
    if (searchColumn) {
      if (serverPagination) {
        // For server-side, we update filters but don't directly filter the table
        // The parent component will handle fetching the filtered data
        setColumnFilters(value.length > 0 
          ? [...columnFilters.filter(filter => filter.id !== searchColumn), { id: searchColumn, value }]
          : columnFilters.filter(filter => filter.id !== searchColumn)
        );
        
        if (onPaginationChange) {
          setPageIndex(0); // Reset to first page
          onPaginationChange(0, rowsPerPage);
        }
      } else {
        // For client-side, we directly update the table's filter
        table.getColumn(searchColumn)?.setFilterValue(value);
      }
    }
  };
  
  // Handle page change
  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
  };
  
  // Handle rows per page change
  const handleRowsPerPageChange = (value: string) => {
    const newPageSize = parseInt(value);
    setRowsPerPage(newPageSize);
    setPageIndex(0); // Reset to first page
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {searchColumn && (
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearch}
                className="pl-8"
              />
            </div>
          )}
          {filterableColumns.map((column) => (
            <DataTableFacetedFilter
              key={column.id}
              column={table.getColumn(column.id)}
              title={column.title}
              options={column.options}
            />
          ))}
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            Rows per page
          </p>
          <Select
            value={String(rowsPerPage)}
            onValueChange={handleRowsPerPageChange}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={rowsPerPage} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex-1 text-sm text-muted-foreground">
            {serverPagination && totalCount
              ? `Page ${pageIndex + 1} of ${Math.ceil(totalCount / rowsPerPage)}, ${totalCount} items total`
              : `Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}, ${table.getFilteredRowModel().rows.length} items total`}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(0)}
            disabled={pageIndex === 0}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(pageIndex + 1)}
            disabled={
              serverPagination
                ? totalCount
                  ? (pageIndex + 1) * rowsPerPage >= totalCount
                  : true
                : !table.getCanNextPage()
            }
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              if (serverPagination && totalCount) {
                handlePageChange(Math.ceil(totalCount / rowsPerPage) - 1);
              } else {
                handlePageChange(table.getPageCount() - 1);
              }
            }}
            disabled={
              serverPagination
                ? totalCount
                  ? (pageIndex + 1) * rowsPerPage >= totalCount
                  : true
                : !table.getCanNextPage()
            }
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}