import { PrismaClient } from "@prisma/client";
import { getSug } from "../http/sug/getSug";
import ResultResponse from "../utils/ResultResponse";
// : Promise<Result<FundList[]>>
export async function GET() {
  const prisma = new PrismaClient();
  const data = await prisma.position.findMany();

  const res = await Promise.all(
    data
      .filter((item) => item.exchange === "FD")
      .map((item) => getSug(item.symbol))
  );

  return ResultResponse(
    (res || []).map((item) => {
      const info = item.Result.stock.find((item) =>
        data.find((el) => el.symbol === item.code && el.sname === item.name)
      );
      return {
        symbol: info?.code || "",
        sname: info?.name || "",
        ratio: info?.ratio || "",
      };
    })
  );
}
