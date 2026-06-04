import {
  selectResourceSegments,
  useTranslationStore,
  type TranslationSegment,
} from "@/entities/translation";
import {
  selectSelectedResource,
  selectSelectedSegment,
  setSessionSelectedSegment,
  useSessionStore,
} from "@/shared/model/sessionStore";
import { Table } from "@mantine/core";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useIntlayer } from "react-intlayer";
import { TableBody } from "../TableBody/TableBody";
import { TableHead } from "../TableHead/TableHead";
import classes from "./TranslationTable.module.css";

const columnHelper = createColumnHelper<TranslationSegment>();

export const TranslationTable = () => {
  const content = useIntlayer("TranslationTable");
  const selectedSegment = useSessionStore(selectSelectedSegment);
  const selectedResource = useSessionStore(selectSelectedResource);
  const segments = useTranslationStore(
    selectResourceSegments(selectedResource),
  );

  const rowSelection = selectedSegment ? { [selectedSegment]: true } : {};

  const table = useReactTable({
    columns: [
      columnHelper.display({
        id: "index",
        header: "#",
        cell: ({ row }) => row.index + 1,
      }),
      columnHelper.accessor("originalText", {
        header: content.originalTextLabel,
      }),
      columnHelper.accessor("machineTranslation", {
        header: content.machineTranslationLabel,
      }),
      columnHelper.accessor("manualTranslation", {
        header: content.manualTranslationLabel,
      }),
    ],
    data: segments,
    getRowId: ({ id }) => id,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    enableMultiRowSelection: false,
    state: { rowSelection },
    onRowSelectionChange: (updater) => {
      const value =
        updater instanceof Function ? updater(rowSelection) : updater;
      const [selectedSegment] = Object.keys(value);

      setSessionSelectedSegment(selectedSegment ?? null);
    },
  });

  return (
    <Table
      classNames={classes}
      withColumnBorders
      withRowBorders
      highlightOnHover
      data-testid="TranslationTable"
    >
      <TableHead table={table} />
      <TableBody table={table} selectedSegment={selectedSegment} />
    </Table>
  );
};
