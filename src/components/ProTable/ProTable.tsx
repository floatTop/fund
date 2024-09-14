import { get } from "lodash";
import { Key } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TableColumn } from "./type";

export default function ProTable<
  T extends Record<string, unknown> = NonNullable<unknown>
>({
  title,
  description,
  columns,
  dataSource,
  rowKey,
}: {
  title?: string;
  description?: string;
  columns: TableColumn<T>[];
  dataSource: T[];
  rowKey: (value: T) => Key;
}) {
  return (
    <Card>
      {!!title && (
        <CardHeader className="px-7">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((item) => {
                return (
                  <TableHead key={`tableHead_${String(item.dataIndex)}`}>
                    {item.title}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>

          <TableBody>
            {dataSource.map((item, index) => {
              return (
                <TableRow
                  key={rowKey ? rowKey(item) : (item["id"] as Key)}
                >
                  {columns.map((col) => {
                    return (
                      <TableCell key={String(col.dataIndex)}>
                        <>
                          {!!col.render
                            ? col.render(item, index)
                            : col.dataIndex === "operation"
                            ? ""
                            : get(item, col.dataIndex)}
                        </>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
