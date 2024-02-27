import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    VisibilityState,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { useState } from 'react'; // Import useState hook

import styles from "./FetchTable.module.css"


// Example data array
// const publications = [
//     {
//       paper_id: "551026419a115dbf2b546795ca0bc93e00fe8cde",
//       title: "Toward a Formal Science of Economics",
//       venue: "",
//       year: 1990,
//       authors: "[{\"authorId\": \"71582388\", \"name\": \"B. Stigum\"}]",
//       abstract: "Toward a Formal Science of Economics provides a unifying way...",
//       citation_count: 41,
//     },
//     {
//       paper_id: "551026419a115dbf2b546795ca0bc93e00fe8cde",
//       title: "Toward a Formal Science of Economics",
//       venue: "",
//       year: 1990,
//       authors: "[{\"authorId\": \"71582388\", \"name\": \"B. Stigum\"}]",
//       abstract: "Toward a Formal Science of Economics provides a unifying way...",
//       citation_count: 41,
//     },
//     {
//       paper_id: "551026419a115dbf2b546795ca0bc93e00fe8cde",
//       title: "Toward a Formal Science of Economics",
//       venue: "",
//       year: 1990,
//       authors: "[{\"authorId\": \"71582388\", \"name\": \"B. Stigum\"}]",
//       abstract: "Toward a Formal Science of Economics provides a unifying way...",
//       citation_count: 41,
//     },
//     {
//       paper_id: "551026419a115dbf2b546795ca0bc93e00fe8cde",
//       title: "Toward a Formal Science of Economics",
//       venue: "",
//       year: 1990,
//       authors: "[{\"authorId\": \"71582388\", \"name\": \"B. Stigum\"}]",
//       abstract: "Toward a Formal Science of Economics provides a unifying way...",
//       citation_count: 41,
//     },
//     {
//       paper_id: "551026419a115dbf2b546795ca0bc93e00fe8cde",
//       title: "Toward a Formal Science of Economics",
//       venue: "",
//       year: 1990,
//       authors: "[{\"authorId\": \"71582388\", \"name\": \"B. Stigum\"}]",
//       abstract: "Toward a Formal Science of Economics provides a unifying way...",
//       citation_count: 41,
//     },
//     {
//       paper_id: "551026419a115dbf2b546795ca0bc93e00fe8cde",
//       title: "Toward a Formal Science of Economics",
//       venue: "",
//       year: 1990,
//       authors: "[{\"authorId\": \"71582388\", \"name\": \"B. Stigum\"}]",
//       abstract: "Toward a Formal Science of Economics provides a unifying way...",
//       citation_count: 41,
//     },
//     {
//       paper_id: "551026419a115dbf2b546795ca0bc93e00fe8cde",
//       title: "Toward a Formal Science of Economics",
//       venue: "",
//       year: 1990,
//       authors: "[{\"authorId\": \"71582388\", \"name\": \"B. Stigum\"}]",
//       abstract: "Toward a Formal Science of Economics provides a unifying way...",
//       citation_count: 41,
//     },
//     {
//       paper_id: "551026419a115dbf2b546795ca0bc93e00fe8cde",
//       title: "Toward a Formal Science of Economics",
//       venue: "",
//       year: 1990,
//       authors: "[{\"authorId\": \"71582388\", \"name\": \"B. Stigum\"}]",
//       abstract: "Toward a Formal Science of Economics provides a unifying way...",
//       citation_count: 41,
//     },
//     {
//       paper_id: "551026419a115dbf2b546795ca0bc93e00fe8cde",
//       title: "Toward a Formal Science of Economics",
//       venue: "",
//       year: 1990,
//       authors: "[{\"authorId\": \"71582388\", \"name\": \"B. Stigum\"}]",
//       abstract: "Toward a Formal Science of Economics provides a unifying way...",
//       citation_count: 41,
//     },
//     {
//       paper_id: "551026419a115dbf2b546795ca0bc93e00fe8cde",
//       title: "Toward a Formal Science of Economics",
//       venue: "",
//       year: 1990,
//       authors: "[{\"authorId\": \"71582388\", \"name\": \"B. Stigum\"}]",
//       abstract: "Toward a Formal Science of Economics provides a unifying way...",
//       citation_count: 41,
//     },
//     {
//       paper_id: "551026419a115dbf2b546795ca0bc93e00fe8cde",
//       title: "Toward a Formal Science of Economics",
//       venue: "",
//       year: 1990,
//       authors: "[{\"authorId\": \"71582388\", \"name\": \"B. Stigum\"}]",
//       abstract: "Toward a Formal Science of Economics provides a unifying way...",
//       citation_count: 41,
//     },
//     {
//       paper_id: "551026419a115dbf2b546795ca0bc93e00fe8cde",
//       title: "Toward a Formal Science of Economics",
//       venue: "",
//       year: 2990,
//       authors: "[{\"authorId\": \"71582388\", \"name\": \"B. Stigum\"}]",
//       abstract: "Toward a Formal Science of Economics provides a unifying way...",
//       citation_count: 41,
//     },
//     {
//       paper_id: "551026419a115dbf2b546795ca0bc93e00fe8cde",
//       title: "test",
//       venue: "",
//       year: 2990,
//       authors: "[{\"authorId\": \"71582388\", \"name\": \"B. Stigum\"}]",
//       abstract: "Toward a Formal Science of Economics provides a unifying way...",
//       citation_count: 41,
//     },
//     // Add more publication objects here...
//   ];

// Define columns based on your data structure
const columns = [
    {
      accessorKey: 'paper_id',
      header: 'Paper ID',
    },
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'venue',
      header: 'Venue',
    },
    {
      accessorKey: 'year',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Year
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'authors',
      header: 'Authors',
      cell: info => JSON.parse(info.getValue()).map(author => author.name).join(", "),
    },
    {
      accessorKey: 'abstract',
      header: 'Abstract',
    },
    {
      accessorKey: 'citation_count',
      header: 'Citation Count',
    },
  ];

const FetchTable=({publications})=>{
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] =useState({})
    const table = useReactTable({
        data:publications,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
          sorting,
          columnFilters,
          columnVisibility,
        },
      })

    return (
    <div>
        <div className={styles.table_top_controls}>
            <div className="flex items-center py-4">
                <Input
                placeholder="Filter title..."
                value={(table.getColumn("title").getFilterValue()) || ""}
                onChange={(event) =>
                    table.getColumn("title").setFilterValue(event.target.value)
                }
                className="max-w-sm"
                />
            </div>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                Columns
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {table
                .getAllColumns()
                .filter(
                    (column) => column.getCanHide()
                )
                .map((column) => {
                    return (
                    <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                        }
                    >
                        {column.id}
                    </DropdownMenuCheckboxItem>
                    )
                })}
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
    <div className="rounded-md border">
        <Table>
        <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                    {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                    )}
                </TableHead>
                ))}
            </TableRow>
            ))}
        </TableHeader>
        <TableBody>
            {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
                ))}
            </TableRow>
            ))}
        </TableBody>
        </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
    <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
    >
        Previous
    </Button>
    <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
    >
        Next
    </Button>
    </div>
    </div>
    );
}

export default FetchTable