"use no memo";

import type { TranslationSegment } from "@/entities/translation";
import { Table } from "@mantine/core";
import { flexRender, type Table as TableType } from "@tanstack/react-table";

interface TableHeadProps {
  table: TableType<TranslationSegment>;
}

export const TableHead = (props: TableHeadProps) => {
  const { table } = props;

  return (
    <Table.Thead data-testid="TranslationTable.TableHead">
      <Table.Tr>
        {table.getFlatHeaders().map((header) => (
          <Table.Th key={header.id}>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </Table.Th>
        ))}
      </Table.Tr>
    </Table.Thead>
  );
};
