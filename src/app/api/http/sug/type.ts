interface StockInfo {
  code: string;
  type: string;
  market: string;
  follow_status: string;
  status: string;
  name: string;
  exchange: string;
  price: string;
  ratio: string;
  capitalization: string;
  increase: string;
  volume: string;
  turnoverRatio: string;
  amplitudeRatio: string;
  src_loc: string;
  amount: string;
  peRate: string;
  pbRate: string;
  stockStatusInfo: string;
  holdingAmount: string;
  subType: string;
  sf_url: string;
  pv: string;
  CNYPrice: string;
}

interface LabelMap {
  text: string;
  ename: string;
}

interface Result {
  stock: StockInfo[];
  index: unknown[];
  deal_status: string;
  stock_status: {
    is_trend: string;
    time_sort: string;
  };
  refresh_time: string;
  labelMap: LabelMap[];
  isNew: string;
  follow_num: string;
}

export interface RootObject {
  QueryID: string;
  ResultCode: string;
  Result: Result;
}