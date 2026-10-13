'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AddNewsForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('ประชาสัมพันธ์');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // URL API ตัวเดิมของคุณ (ใช้ตัวเดียวกับตอนดึงข้อมูล)
  const API_URL = "https://script.google.com/macros/s/AKfycbxna-k9dwhgB6Yr9HoR_nG1ioI62f6mqXplzLEbDXzu-zftSZW34PnvoVyIM_VyRQcJ/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setMessage('⚠️ กรุณากรอกหัวข้อและรายละเอียดข่าวให้ครบถ้วน');
      return;
    }

    setIsSubmitting(true);
    setMessage('กำลังบันทึกข้อมูล...');

    const currentDate = new Date().toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    const payload = {
      title,
      category,
      date: currentDate,
      content
    };

    try {
      // ส่งข้อมูลแบบ POST ไปยัง Google Apps Script API
      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors', // ป้องกันปัญหา CORS ตอนยิงข้ามโดเมน
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      setMessage('✅ บันทึกข่าวสารสำเร็จ! (รีเฟรชหน้าเว็บเพื่อดูประกาศใหม่)');
      setTitle('');
      setContent('');
    } catch (err) {
      console.error("Error posting news:", err);
      setMessage('❌ เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-3xl mx-auto my-16 p-8 bg-brand-glass border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl relative z-10"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">📝 เพิ่มข่าวสาร / ประกาศใหม่</h3>
        <p className="text-gray-400 text-sm">สำหรับเจ้าหน้าที่หรือคุณครูกลุ่มงานสารสนเทศเพื่อเผยแพร่ประชาสัมพันธ์</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm text-gray-300 mb-2">หัวข้อประกาศ / ข่าวสาร</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="เช่น กำหนดการสอบปลายภาคเรียน..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-gray-300 mb-2">หมวดหมู่ข่าว</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-brand-navy border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all text-sm"
            >
              <option value="ประชาสัมพันธ์">ประชาสัมพันธ์</option>
              <option value="วิชาการ">วิชาการ</option>
              <option value="กิจกรรมนักเรียน">กิจกรรมนักเรียน</option>
              <option value="จัดซื้อจัดจ้าง">จัดซื้อจัดจ้าง</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">รายละเอียดเนื้อหาข่าว</label>
          <textarea 
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="พิมพ์รายละเอียดเนื้อหาประกาศที่นี่..."
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all text-sm resize-none"
          />
        </div>

        {message && (
          <div className="text-center text-sm font-medium py-2 px-4 rounded-xl bg-white/5 border border-white/10 text-cyan-300">
            {message}
          </div>
        )}

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? 'กำลังส่งข้อมูล...' : '🚀 เผยแพร่ประกาศทันที'}
        </button>
      </form>
    </motion.div>
  );
}