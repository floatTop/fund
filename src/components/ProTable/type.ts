import React from "react";

export type TableColumn<
  T extends Record<string, unknown> = NonNullable<unknown>
> = {
  title: string;
  dataIndex: keyof T | string | "operation";
  render?: (value: T, index: number) => React.ReactNode;
};
