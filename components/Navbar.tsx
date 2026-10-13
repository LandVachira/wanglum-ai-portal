'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  return (
    // แถบเมนูแบบลอยตัวอยู่ด้านบน (Fixed)
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 flex justify-center pointer-events-none">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-5xl flex items-center justify-between px-6 py-3 rounded-full bg-brand-glass border border-white/10 backdrop-blur-md shadow-lg pointer-events-auto"
      >
        {/* โลโก้และชื่อโรงเรียน */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg">
            WL
          </div>
          <span className="text-white font-medium text-lg hidden sm:block tracking-wide">
            วังหลุมวิทยาคาร
          </span>
        </div>

        {/* ลิงก์เมนูต่างๆ */}
        <div className="hidden md:flex items-center gap-8 text-sm font-light text-gray-300">
          <Link href="#" className="hover:text-white hover:text-shadow-glow transition-all">หน้าหลัก</Link>
          <Link href="#" className="hover:text-white hover:text-shadow-glow transition-all">หลักสูตร</Link>
          <Link href="#" className="hover:text-white hover:text-shadow-glow transition-all">กิจกรรม</Link>
          <Link href="#" className="hover:text-white hover:text-shadow-glow transition-all">ติดต่อเรา</Link>
        </div>

        {/* ปุ่มด้านขวา */}
        <button className="px-6 py-2 text-sm font-medium text-white bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-colors">
          บุคลากร
        </button>
      </motion.nav>
    </div>
  );
}