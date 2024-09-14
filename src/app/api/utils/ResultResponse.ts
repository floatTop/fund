import { NextResponse } from "next/server";

export type Result<T> = NextResponse<{
  code: number;
  data: T;
}>;

export default function ResultResponse<T>(data: T): Result<T> {
  return NextResponse.json({
    code: 200,
    data: data,
  });
}
