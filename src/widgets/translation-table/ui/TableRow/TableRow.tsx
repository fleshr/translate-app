import type { TranslationSegment } from "@/entities/translation";
import type { BaseProps } from "@/shared/model/component";
import { Table } from "@mantine/core";
import { flexRender, type Row } from "@tanstack/react-table";
import type { VirtualItem } from "@tanstack/react-virtual";
import { type Ref } from "react";

interface TableRowProps {
  ref?: Ref<HTMLTableRowElement>;
  row: Row<TranslationSegment>;
  virtualRow: VirtualItem;
  selected: boolean;
}

export const TableRow = (props: BaseProps<TableRowProps>) => {
  const {
    ref,
    row,
    virtualRow,
    selected,
    "data-testid": dataTestId = "TableRow",
  } = props;

  return (
    <Table.Tr
      ref={ref}
      data-selected={selected}
      data-index={virtualRow.index}
      data-row-even={virtualRow.index % 2 === 0}
      onClick={row.getToggleSelectedHandler()}
      style={{ transform: `translateY(${virtualRow.start}px)` }}
      data-testid={dataTestId}
    >
      {row.getAllCells().map((cell) => (
        <Table.Td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </Table.Td>
      ))}
    </Table.Tr>
  );
};
