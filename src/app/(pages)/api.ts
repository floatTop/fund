import request from "@/utils/request";
import { FundList } from "../api/list/type";

export function initFund() {
  return request({
    url: "/api/init",
    method: "POST",
  });
}

export function getFundList() {
  return request<FundList[]>({
    url: "/api/list",
    method: "get",
    timeout: 10000
  });
}

export function market() {
  return request({
    url: "/api/market",
    method: "get",
  });
}
