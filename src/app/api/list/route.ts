import { getMarket } from "@prisma/client/sql";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { prisma } from "../global";
import ResultResponse from "../utils/ResultResponse";

dayjs.extend(utc);

// : Promise<Result<FundList[]>>
export async function GET() {
  const start = dayjs.utc().startOf("day");
  const end = dayjs.utc().endOf("day");

  const data = await prisma.$queryRawTyped(
    getMarket(start.toDate(), end.toDate())
  );
  console.log(data);
  return ResultResponse(data);
}
