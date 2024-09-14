export interface Gethomeinfo {
  QueryID: string;
  ResultCode: string;
  Result: Result;
}

export interface Result {
  stock: Stock[];
  index: unknown[];
  recommend_stock: Stock[];
  recommend_info: RecommendInfo;
  recommend_stock_info: RecommendInfo;
  deal_status: string;
  stock_status: StockStatus;
  refresh_time: string;
  labelMap: LabelMap[];
  isNew: string;
  follow_num: string;
}

export interface LabelMap {
  text: string;
  ename: string;
}

export interface RecommendInfo {
  title: string;
  desc: string;
  btnText: string;
}

export interface Stock {
  code: string;
  market: Market;
  type: Type;
  summary?: Summary;
  amount: string;
  exchange: string;
  name: string;
  price: string;
  increase: string;
  ratio: string;
  amplitudeRatio: string;
  turnoverRatio: string;
  holdingAmount: string;
  volume: string;
  capitalization: string;
  stockStatus?: string;
  status: string;
  stockStatusInfo: string;
  src_loc: SrcLOC;
  peRate: string;
  pbRate: string;
  subType: SrcLOC;
  sf_url: string;
  outMarketInfo?: OutMarketInfo;
  ctime?: string;
  mtime?: string;
}

export type Market = "us" | "ab";

export interface OutMarketInfo {
  price: string;
  increase: string;
  ratio: string;
  text: string;
}

export type SrcLOC = "--";

export type Summary = "新股上市" | "高涨幅牛股" | "广东板块热股";

export type Type = "stock" | "fund" | "index";

export interface StockStatus {
  is_trend: string;
  time_sort: string;
}
