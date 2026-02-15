"use no memo";

import type { Id } from "@/shared/model/common";
import type { TranslationSegment } from "@/shared/model/translation";
import { Table } from "@mantine/core";
import { type Table as TableType } from "@tanstack/react-table";
import {
  useWindowVirtualizer,
  type VirtualItem,
} from "@tanstack/react-virtual";
import { useEffectEvent, useLayoutEffect } from "react";
import { ROW_HEIGHT } from "../../constants/table";
import { TableRow } from "../TableRow/TableRow";

interface TableBodyProps {
  table: TableType<TranslationSegment>;
  selectedSegment: Id | null;
}

export const TableBody = (props: TableBodyProps) => {
  const { table, selectedSegment } = props;
  const { rows } = table.getRowModel();

  const virtualizer = useWindowVirtualizer({
    count: rows.length,
    useFlushSync: false,
    estimateSize: () => ROW_HEIGHT,
  });

  const strollToSegment = useEffectEvent((segmentId: Id) => {
    const segmentIndex = rows.findIndex((row) => row.id === segmentId);
    const virtualIndexes = virtualizer.getVirtualIndexes();

    if (segmentIndex !== -1 && !virtualIndexes.includes(segmentIndex)) {
      virtualizer.scrollToIndex(segmentIndex, { align: "center" });
    }
  });

  useLayoutEffect(() => {
    if (selectedSegment) {
      strollToSegment(selectedSegment);
    }
  }, [selectedSegment]);

  const renderRow = (virtualRow: VirtualItem) => {
    const { index } = virtualRow;
    const row = rows[index];

    return (
      row && (
        <TableRow
          row={row}
          key={row.id}
          virtualRow={virtualRow}
          selected={row.getIsSelected()}
          ref={virtualizer.measureElement}
          data-testid={`TranslationTable.TableRow.${index}`}
        />
      )
    );
  };

  return (
    <Table.Tbody
      style={{ height: virtualizer.getTotalSize() }}
      data-testid="TranslationTable.TableBody"
    >
      {virtualizer.getVirtualItems().map(renderRow)}
    </Table.Tbody>
  );
};
