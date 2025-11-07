import RichText from "@/notion/layout/components/base/RichText";
import {
  RichTextItemResponse,
  BlockObjectResponse,
  TableRowBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export default function Table({
  block,
  blockChildren,
  className,
}: {
  block: BlockObjectResponse;
  blockChildren: BlockObjectResponse[] | undefined;
  className: string;
}) {
  if (!blockChildren || block.type !== "table") return null;
  const table = block.table;
  const rows = blockChildren;

  let headerRow;
  let bodyRows = rows;
  if (table.has_column_header) {
    headerRow = rows[0];
    bodyRows = rows.slice(1);
  }

  return (
    <table className={className}>
      {headerRow && (
        <thead className="border-b font-bold border-gray">
          <Row row={headerRow as TableRowBlockObjectResponse} />
        </thead>
      )}
      <tbody>
        {bodyRows.map((row, index) => (
          <Row key={index} row={row as TableRowBlockObjectResponse} />
        ))}
      </tbody>
    </table>
  );
}

function Row({ row }: { row: TableRowBlockObjectResponse }) {
  return (
    <tr className="border-x-2 border-background">
      {row.table_row.cells.map((cell, index) => (
        <Cell key={index} cell={cell} />
      ))}
    </tr>
  );
}

function Cell({ cell }: { cell: RichTextItemResponse[] }) {
  return (
    <td className="border-x align-top border-gray py-2 px-4">
      <RichText richText={cell} />
    </td>
  );
}
