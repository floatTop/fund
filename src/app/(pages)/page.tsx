import RootTable from "@/components/page/root/table";
import { getFundList } from "./api";

export default async function Page() {
  console.log('getFundList')
  const res = await getFundList().catch((e) => {
    console.log("catch", e);
    return [];
  });
  console.log("res", res);
  return <RootTable fundList={res}></RootTable>;
}
