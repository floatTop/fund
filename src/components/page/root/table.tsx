"use client";
import { getFundList, initFund, market } from "@/app/(pages)/api";
import { FundList } from "@/app/api/list/type";
import ProTable from "@/components/ProTable/ProTable";
import { TableColumn } from "@/components/ProTable/type";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

export default function RootTable({ fundList }: { fundList: FundList[] }) {
  const { data } = useQuery({
    queryKey: ["getFundList"],
    queryFn: () => getFundList(),
    initialData: fundList,
  });
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
        render: (value) => renderItem(value.symbol, value.increase),
      },
      {
        title: "name",
        dataIndex: "sname",
        render: (value) => renderItem(value.sname, value.increase),
      },
      {
        title: "positionCost",
        dataIndex: "positionCost",
        render: (value) => {
          return !!value?.positionCost && !!value?.price
            ? (
                ((Number(value?.price) - value?.positionCost) /
                  value?.positionCost) *
                100
              ).toFixed(2) + "%"
            : 0;
        },
      },
      {
        title: "",
        dataIndex: "",
        render: (value) => {
          return !!value?.positionCost && !!value?.price
            ? value.balance / value?.positionCost * Number()
            : 0;
        },
      },
      {
        title: "ratio",
        dataIndex: "ratio",
        render: (value) => renderItem(value.increase, value.increase),
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
      ----
      <ProTable
        title="我的自选"
        columns={columns}
        dataSource={data}
        rowKey={(value: FundList) => value.symbol}
      ></ProTable>
    </>
  );
}
