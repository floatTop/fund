'use client'
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 配置持久化策略
      // cacheTime: Infinity, // 设置查询缓存时间，Infinity表示永久缓存
      // staleTime: Infinity, // 设置查询结果的过期时间，Infinity表示永不过期
      refetchOnWindowFocus: false, // 窗口重新聚焦时不重新获取数据
      // refetchOnMount: false, // 组件挂载时不重新获取数据
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
