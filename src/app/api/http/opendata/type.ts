export interface Market {
  QueryID: string;
  Result: Result[];
  ResultCode: string;
  ResultNum: string;
}

export interface Result {
  ClickNeed: string;
  DisplayData: DisplayData;
  OriginSrcID: string;
  RecoverCacheTime: string;
  ResultURL: string;
  Sort: string;
  SrcID: string;
  SubResNum: string;
  SubResult: unknown[];
  Weight: string;
}

export interface DisplayData {
  StdStg: string;
  StdStl: string;
  resultData: ResultData;
  strategy: Strategy;
}

export interface ResultData {
  extData: EXTData;
  tplData: TplData;
}

export interface EXTData {
  OriginQuery: string;
  resourceid: string;
  tplt: string;
}

export interface TplData {
  ResultURL: string;
  card_order: string;
  data_source: string;
  digits: string;
  disp_data_url_ex: DispDataURLEx;
  lyAxis: unknown[];
  maxPoints: string;
  sec: number;
  series: Series[];
  showDate: string;
  showTag: string;
  text: string;
  xAxis: string[];
}

export interface DispDataURLEx {
  aesplitid: string;
}

export interface Series {
  label: string[];
  name: string;
  value: string;
}

export interface Strategy {
  ctplOrPhp: string;
  hilightWord: string;
  precharge: string;
  tempName: string;
}
