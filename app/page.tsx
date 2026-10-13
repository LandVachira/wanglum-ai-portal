'use client';
import { motion } from 'framer-motion';

export default function Home() {
  // ข้อมูลจำลองระบบต่างๆ ของโรงเรียน
  const schoolSystems = [
    { title: "ระบบบันทึกการรับ-จ่ายนม", desc: "ระบบจัดการและบันทึกข้อมูลนมโรงเรียนประจำวัน", icon: "🥛" },
    { title: "บันทึกการใช้บริการงานอนามัย", desc: "บันทึกประวัติสุขภาพและการเข้าใช้บริการพยาบาล", icon: "🏥" },
    { title: "ระบบคลังเอกสารอัจฉริยะ", desc: "จัดเก็บ ค้นหา และจัดการสิทธิ์ไฟล์เอกสารออนไลน์", icon: "📁" },
    { title: "ระบบทดสอบออนไลน์", desc: "แบบทดสอบออนไลน์พร้อมระบบจับเวลาและเฉลย", icon: "⏱️" }
  ];

  return (
    <main className="relative flex flex-col items-center w-full overflow-hidden">
      
      {/* ================= SECTION 1: HERO (หน้าแรกสุด) ================= */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center p-6">
        {/* Glow Effects */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 2 }}
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-burgundy rounded-full mix-blend-screen filter blur-[150px] animate-pulse"
        />
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600 rounded-full mix-blend-screen filter blur-[150px] animate-pulse"
        />

        {/* Glassmorphism Box */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-4xl p-10 md:p-16 rounded-3xl bg-brand-glass border border-white/10 backdrop-blur-xl shadow-2xl text-center hover:border-white/20 transition-all duration-300"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 font-light mb-4"
          >
            โรงเรียนเทคโนโลยีแห่งอนาคต
          </motion.h2>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 tracking-tight mb-8"
          >
            SHAPING THE FUTURE<br />
            <span className="text-4xl md:text-6xl mt-2 block">WITH AI & INNOVATION</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}
            className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            โรงเรียนชุมชนวังหลุมวิทยาคาร ขับเคลื่อนการศึกษาด้วยเทคโนโลยีล้ำสมัย 
            หน้าเว็บสะอาดตา มินิมอลแต่ทรงพลัง พร้อมผู้ช่วย AI ประจำโรงเรียน
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group w-full sm:w-auto cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative px-8 py-4 bg-white rounded-full leading-none flex items-center justify-center">
                <span className="text-brand-navy font-bold text-lg">เริ่มต้นใช้งาน AI Assistant</span>
              </div>
            </motion.button>
            <motion.button whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }} whileTap={{ scale: 0.95 }} className="px-8 py-4 rounded-full border border-white/30 text-white font-semibold text-lg transition-all duration-200 w-full sm:w-auto cursor-pointer">
              เข้าสู่ระบบนักเรียน
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ================= SECTION 2: ระบบปฏิบัติการ (แสดงผลเมื่อเลื่อนจอลงมา) ================= */}
      <section className="relative w-full max-w-6xl px-6 py-24 z-10">
        
        {/* หัวข้อ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }} // ทำงานเมื่อเลื่อนมาเห็น
          viewport={{ once: true, amount: 0.3 }} // ทำงานครั้งเดียวเมื่อเห็นพื้นที่ 30%
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            ระบบบริการ <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-300">อิเล็กทรอนิกส์</span>
          </h2>
          <p className="text-gray-400 text-lg">ศูนย์รวมแอปพลิเคชันและบริการภายในของโรงเรียนเพื่อความรวดเร็ว</p>
        </motion.div>

        {/* Grid แสดงการ์ดระบบต่างๆ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {schoolSystems.map((sys, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.15 }} // หน่วงเวลาให้ลอยขึ้นมาทีละอัน
              whileHover={{ y: -10, borderColor: "rgba(255,215,0,0.5)" }} // เมื่อเมาส์ชี้ให้เด้งขึ้นและขอบสีทอง
              className="bg-brand-glass border border-white/10 p-8 rounded-2xl backdrop-blur-md hover:shadow-[0_0_30px_rgba(255,215,0,0.1)] transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {sys.icon}
              </div>
              <h3 className="text-xl font-medium text-white mb-3 leading-tight">{sys.title}</h3>
              <p className="text-sm text-gray-400 font-light">{sys.desc}</p>
            </motion.div>
          ))}
        </div>

      </section>

    </main>
  );
}