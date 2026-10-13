'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState<any[]>([]); 
  
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'สวัสดีครับ ผมคือผู้ช่วย AI ประจำโรงเรียนชุมชนวังหลุมวิทยาคาร มีข้อมูลส่วนไหนต้องการสอบถามไหมครับ?' }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // URL API ที่คุณสร้างไว้
  const API_URL = "https://script.google.com/macros/s/AKfycbxna-k9dwhgB6Yr9HoR_nG1ioI62f6mqXplzLEbDXzu-zftSZW34PnvoVyIM_VyRQcJ/exec";

  // ดึงข้อมูล + แจ้งเตือนสถานะ
  useEffect(() => {
    if (isOpen && knowledgeBase.length === 0) {
      // 1. ส่งข้อความบอกผู้ใช้ว่ากำลังดึงข้อมูล
      setMessages(prev => [...prev, { role: 'ai', text: 'กำลังซิงค์ข้อมูลกับฐานข้อมูลโรงเรียน... ⏳' }]);
      
      fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          if (data.status === "success") {
            setKnowledgeBase(data.data);
            // 2. ลบข้อความ "กำลังซิงค์" ออก แล้วแทนที่ด้วยข้อความสำเร็จ
            setMessages(prev => {
              const newMsgs = prev.slice(0, prev.length - 1);
              return [...newMsgs, { role: 'ai', text: `✅ เชื่อมต่อข้อมูลสำเร็จ! AI อ่านข้อมูลความรู้มาได้ ${data.data.length} เรื่อง พร้อมตอบคำถามครับ` }];
            });
          } else {
            setMessages(prev => [...prev, { role: 'ai', text: '❌ โครงสร้างข้อมูลจาก Sheets ไม่ถูกต้อง' }]);
          }
        })
        .catch(err => {
          console.error("Fetch error:", err);
          setMessages(prev => [...prev, { role: 'ai', text: '❌ ไม่สามารถดึงข้อมูลได้ โปรดตรวจสอบการตั้งค่า Sheet' }]);
        });
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      let aiResponse = "ขออภัยครับ ตอนนี้ผมยังไม่มีข้อมูลในเรื่องนี้ ลองใช้คำค้นหาอื่นดูนะครับ";
      
      // 3. ปรับปรุง Logic การค้นหาให้ยืดหยุ่นมากขึ้น (กันพิมพ์เล็ก/ใหญ่ผิด)
      const foundItem = knowledgeBase.find(item => {
        // หา Key ที่ชื่อว่า Keyword แบบไม่สนใจตัวพิมพ์เล็ก/ใหญ่
        const keyName = Object.keys(item).find(k => k.trim().toLowerCase() === 'keyword');
        if (keyName && item[keyName]) {
          const keywordStr = String(item[keyName]).toLowerCase();
          return userText.toLowerCase().includes(keywordStr);
        }
        return false;
      });

      if (foundItem) {
        // ดึงข้อมูล Content ออกมาตอบ
        const contentKey = Object.keys(foundItem).find(k => k.trim().toLowerCase() === 'content');
        if (contentKey) {
          aiResponse = foundItem[contentKey];
        }
      }

      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[320px] sm:w-[380px] bg-brand-navy/95 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex justify-between items-center shadow-md z-10">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <h3 className="text-white font-medium">AI ประจำโรงเรียน</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white/80 hover:text-white transition-colors cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
              >
                ✕
              </button>
            </div>
            
            {/* Chat Area */}
            <div className="p-4 h-[350px] overflow-y-auto flex flex-col gap-4 text-sm bg-black/20 scrollbar-thin scrollbar-thumb-white/20">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`max-w-[85%] p-3 rounded-2xl shadow-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white self-end rounded-tr-sm' 
                      : 'bg-white/10 text-gray-200 self-start rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              
              {isLoading && (
                <div className="bg-white/10 text-gray-200 p-3 rounded-2xl rounded-tl-sm self-start max-w-[85%] flex gap-1 items-center">
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-black/40 flex gap-2">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="พิมพ์ข้อความที่นี่..." 
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all text-sm"
              />
              <button 
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ➤
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer relative z-10"
      >
        <motion.div 
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }} 
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} 
          className="absolute inset-0 bg-cyan-400 rounded-full -z-10"
        />
        <span className="text-3xl drop-shadow-md">🧠</span>
      </motion.button>
    </div>
  );
}