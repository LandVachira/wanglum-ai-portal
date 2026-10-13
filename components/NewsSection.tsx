'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function NewsSection() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // URL API ตัวเดิมของคุณ
  const API_URL = "https://script.google.com/macros/s/AKfycbxna-k9dwhgB6Yr9HoR_nG1ioI62f6mqXplzLEbDXzu-zftSZW34PnvoVyIM_VyRQcJ/exec?action=news";

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setNewsList(data.data.reverse()); // เรียงข่าวล่าสุดขึ้นก่อน
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching news:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="relative w-full max-w-6xl px-6 py-20 z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          ข่าวสารและ <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">ประกาศโรงเรียน</span>
        </h2>
        <p className="text-gray-400">อัปเดตความเคลื่อนไหวและกิจกรรมสำคัญของโรงเรียนชุมชนวังหลุมวิทยาคาร</p>
      </motion.div>

      {loading ? (
        <div className="text-center text-gray-400 py-10">กำลังโหลดข้อมูลข่าวสาร... ⏳</div>
      ) : newsList.length === 0 ? (
        <div className="text-center text-gray-400 py-10 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
          ยังไม่มีประกาศข่าวสารในขณะนี้ สามารถเพิ่มข้อมูลได้ผ่าน Google Sheets ครับ
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsList.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, borderColor: "rgba(6,182,212,0.5)" }}
              className="bg-brand-glass border border-white/10 p-6 rounded-2xl backdrop-blur-md flex flex-col justify-between transition-all shadow-xl"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full border border-cyan-500/30">
                    {item.Category || 'ประชาสัมพันธ์'}
                  </span>
                  <span className="text-xs text-gray-400">{item.Date}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 leading-snug">{item.Title}</h3>
                <p className="text-gray-300 text-sm font-light line-clamp-3 mb-6">{item.Content}</p>
              </div>
              <button className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors flex items-center gap-1 self-start">
                อ่านเพิ่มเติม →
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}