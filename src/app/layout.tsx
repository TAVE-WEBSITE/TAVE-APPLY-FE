import type { Metadata } from "next";
import localFont from "next/font/local";
import '@/styles/globals.css';
import Header from "@/components/layout/Header";

// 500, 600, 700 weight 만 사용하기에 fonts 폴더에 다운받아 사용 - 성능 최적화
const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Medium.subset.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.subset.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.subset.woff2",
      weight: "700", 
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

// appRouter 사용시, 컴포넌트 상단에 metadata 라는 이름으로 객체를 만들어놓으면 head 태그 내부로 삽입됨 - SEO 최적화
export const metadata: Metadata = {
  title: "TAVE 신규 지원",
  description: "해당 페이지는 TAVE 신규 회원들의 지원 안내에 관한 페이지입니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`antialiased ${pretendard.variable} bg-[#121212] text-white w-screen h-screen`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
