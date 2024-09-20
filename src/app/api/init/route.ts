import { prisma } from "../global";
import request from "../http/request";
import ResultResponse from "../utils/ResultResponse";
import { Gethomeinfo } from "./httpType";

export async function POST() {
  const { Result: data } = await request<Gethomeinfo>({
    url: "https://finance.pae.baidu.com/selfselect/gethomeinfo",
    method: "GET",
    params: {
      market: "",
      type: "",
      skipLogin: 0,
      finClientType: "pc",
    },
    headers: {
      accept: "application/vnd.finance-web.v1+json",
      "accept-language": "en,zh-CN;q=0.9,zh;q=0.8",
      "acs-token":
        "1726066906682_1726138107906_7TE0QXTPpz1U8Ygg8hDB/fR4mHkglwFaeK9hRAi92wGccB5K4HmPfrwyOSxlSTcissKcie1xP5H/BLE4IAd+3N3fFjLykfr4gV5QMmKh88BrAmsdDsCP0iyb6eseTdm/5zgKMQUknLq+7L3HyLApZRB7vaQWMGrDsAqszvvkOJhPk0qLtDmJStHUQY7rfiiOvptVvC0cHa8QkNfff8HOTZ6R21hnRU+fydDcP2y3v99NmDIwxkGTqbQcvckpz+vBaRudcpdNPmpHVdt0ISU+JPtaf0EaqZEgaZ0fEB+Aqqt/Rg+RAGSgr3pUJb3zzI3lzQJuM+BwXwrfVDgSyqrpJqZyMr9XFpX+k4HaSFlOp/hhDkgAdpo/d1o45vOsJGixL5IGLqG5JWLT1ppFqVnOausG1whrQM1CZ4mJ7OTVlhyF9C7Y8YNrRzpQxnQkIkDPYo1wW0MNWchxI6zO+L9z7iQJfRupljAEG65u+5yMgHZOKT7stKaU/hEXSU7gHFvt9/L+0nYHS6lVCP/JbiYZO5XDkdC4EFPE9PIFk6Ncqrg=",
      cookie:
        'BIDUPSID=5D4E9B99B7A0347BA6FA7DCDFB6D4AFC; PSTM=1707823334; BAIDUID=98735FFBA573556C521A85A135DAFA56:FG=1; BDUSS=pUMDVXTEJOWHJObWsxVnM0cW9oYX5xSjk3fmwtSW9Hcll1eVE3UXh5Wi1BdDFtSVFBQUFBJCQAAAAAAAAAAAEAAAAj6xJR6rxtZQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH51tWZ-dbVmR0; BDUSS_BFESS=pUMDVXTEJOWHJObWsxVnM0cW9oYX5xSjk3fmwtSW9Hcll1eVE3UXh5Wi1BdDFtSVFBQUFBJCQAAAAAAAAAAAEAAAAj6xJR6rxtZQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH51tWZ-dbVmR0; BAIDUID_BFESS=98735FFBA573556C521A85A135DAFA56:FG=1; ZFY=HPZVHofrPueeOpan59:BSsIZ2y3lmLueJOonCURF6v8Q:C; __bid_n=18db04fc6f898245d77426; H_PS_PSSID=60273_60678_60682_60692_60724_60360_60748; H_WISE_SIDS=60273_60678_60682_60692_60724_60360_60748; H_WISE_SIDS_BFESS=60273_60678_60682_60692_60724_60360_60748; RT="z=1&dm=baidu.com&si=19006541-d12f-43a3-9eb9-bff462243b1f&ss=m0wdqod8&sl=0&tt=0&bcn=https%3A%2F%2Ffclog.baidu.com%2Flog%2Fweirwood%3Ftype%3Dperf&ld=5t&ul=1nhpa&hd=1nhpt"; MCITY=-179%3A; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; delPer=0; PSINO=5; BA_HECTOR=00ah20208k0lah012gah0k0131crf41je5ega1u; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; ab_sr=1.0.1_NDRmNDkyMmY0YTUxMjQ0ODFhNzg1YThkYjgwNjE0NTg3YzlkMDJmMDZkYmExN2NlN2UyNDQ0ZWE4YmZlYjAwNTYxMWQwYTczNTNlZjg1ZWY4MDIzYTFmMzVhYjMzNzg4N2RiMmQ2M2NiMGFkMzRhYzk4ZGYzMjYzMmQ1ZmRiNzE3NTA2MTIxMDNhNTc1N2M1MmQ4ZjdjYWJhMDllODE3ZA==',
      origin: "https://gushitong.baidu.com",
      priority: "u=1, i",
      referer: "https://gushitong.baidu.com/",
      "sec-ch-ua":
        '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    },
  });

  const existingRecords = await prisma.position.findMany({
    where: {
      symbol: {
        in: data.stock.map((user) => user.code),
      },
    },
  });

  const createMany = await prisma.position.createManyAndReturn({
    data: data.stock
      .filter((item) => !existingRecords.find((el) => el.symbol === item.code))
      .map((item) => ({
        symbol: item.code,
        sname: item.name,
        exchange: item.exchange,
      })),
  });

  return ResultResponse(createMany);
}
