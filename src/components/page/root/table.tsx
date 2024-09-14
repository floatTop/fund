"use client";
import { initFund, market } from "@/app/(pages)/api";
import { FundList } from "@/app/api/list/type";
import ProTable from "@/components/ProTable/ProTable";
import { TableColumn } from "@/components/ProTable/type";
import { Button } from "@/components/ui/button";
import { useCallback, useMemo } from "react";

export default async function RootTable({
  fundList,
}: {
  fundList: FundList[];
}) {
  const renderItem = useCallback((text: React.ReactNode, ratio: string) => {
    const color =
      Number(ratio.replace("%", "")) > 0
        ? `text-[var(--up-color)]`
        : `text-[--down-color]`;
    return <div className={color}>{text}</div>;
  }, []);

  const columns: TableColumn<FundList>[] = useMemo(() => {
    return [
      {
        title: "code",
        dataIndex: "symbol",
        render: (value) => renderItem(value.symbol, value.ratio),
      },
      {
        title: "name",
        dataIndex: "sname",
        render: (value) => renderItem(value.sname, value.ratio),
      },
      {
        title: "ratio",
        dataIndex: "ratio",
        render: (value) => renderItem(value.ratio, value.ratio),
      },
    ];
  }, [renderItem]);
  return (
    <>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            initFund();
          }}
        >
          init
        </Button>
        <Button
          onClick={() => {
            market();
          }}
        >
          add market
        </Button>
      </div>

      <ProTable
        title="我的自选"
        columns={columns}
        dataSource={fundList}
        rowKey={(value: FundList) => value.symbol}
      ></ProTable>
    </>
  );
}
