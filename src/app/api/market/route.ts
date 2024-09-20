import dayjs from "dayjs";
import { prisma } from "../global";
import { getOpenData } from "../http/opendata/getOpenData";
import ResultResponse from "../utils/ResultResponse";

export async function GET() {
  const data = await prisma.position.findMany();

  const FDData = data.filter((item) => item.exchange === "FD");

  const res = await Promise.all(FDData.map((item) => getOpenData(item.symbol)));

  const marketResultList = res.map((item, index) => {
    const marketList =
      item.Result[0].DisplayData.resultData.tplData.series[0].value.split(";");
    const lastMarket = marketList.at(-1)?.split(",");
    const marketTime = lastMarket![0];
    const price = lastMarket![1];
    const increase = lastMarket![2];
    return {
      market_time: dayjs(marketTime).format(),
      price,
      increase,
      symbol: FDData[index].symbol,
    };
  });
  const ma = await prisma.market.createManyAndReturn({
    data: marketResultList,
  });
  console.log(ma)
  return ResultResponse(ma);
}
