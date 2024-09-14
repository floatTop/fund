import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { getOpenData } from "../http/opendata/getOpenData";
import ResultResponse from "../utils/ResultResponse";

export async function GET() {
  const prisma = new PrismaClient();
  const data = await prisma.position.findMany();

  const res = await Promise.all(
    data
      .filter((item) => item.exchange === "FD")
      .map((item) => getOpenData(item.symbol))
  );

  const marketResultList = res.map((item, index) => {
    const marketList =
      item.Result[0].DisplayData.resultData.tplData.series[0].value.split(";");
    const lastMarket = marketList.at(-1)?.split(",");
    const marketTime = lastMarket![0];
    const price = lastMarket![1];
    const increase = lastMarket![2];
    return {
      marketTime: dayjs(marketTime).format(),
      price,
      increase,
      symbol: data[index].symbol,
    };
  });

  const ma = await prisma.market.createManyAndReturn({
    data: marketResultList,
  });
  return ResultResponse(ma);
}
