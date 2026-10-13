import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import AIAssistant from "../components/AIAssistant"; // 1. นำเข้า Component AI

const kanit = Kanit({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["thai", "latin"],
  variable: '--font-kanit',
});

export const metadata: Metadata = {
  title: "โรงเรียนชุมชนวังหลุมวิทยาคาร | AI Portal",
  description: "ระบบเว็บไซต์ล้ำยุค ขับเคลื่อนด้วย AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${kanit.variable} font-sans bg-brand-navy text-white min-h-screen antialiased selection:bg-brand-gold selection:text-brand-navy`}>
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-burgundy/20 via-brand-navy to-brand-navy"></div>
        
        <Navbar />
        {children}
        
        {/* 2. แสดงวิดเจ็ต AI */}
        <AIAssistant />
        
      </body>
    </html>
  );
}