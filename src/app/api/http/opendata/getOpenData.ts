import request from "../request";
import { Market } from "./type";

export const getOpenData = async (code: string) => {
  return request<Market>({
    url: "https://gushitong.baidu.com/opendata",
    method: "GET",
    params: {
      resource_id: "5824",
      query: code,
      new_need_di: "1",
      m: "12",
      t: "nvl",
      finClientType: "pc",
    },
    headers: {
      cookie:
        "BAIDUID=027805516417B6A82C9F443A4E820C78:FG=1; BAIDUID_BFESS=027805516417B6A82C9F443A4E820C78:FG=1",
    },
  });
};
