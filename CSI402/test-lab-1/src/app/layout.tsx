import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LAB1-CREATE APP ROUTER PROJECT",
  description:
    "Project การพัฒนาโปรแกรมส่วนหน้าด้วย Next JS แบบ App Router สัดส่วนคะแนน 5% ตรวจและเก็บคะแนนในชั้นเรียน พร้อมแจ้ง URL ของ Github เพื่อใช้ตรวจสอบ โดยอ้างอิงเวลาตาม Commit ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-slate-100 h-[100dvh] w-[100dvw] flex flex-col justify-start items-center ">
          {children}
        </div>
      </body>
    </html>
  );
}
