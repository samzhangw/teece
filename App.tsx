
import React, { useEffect, useState } from 'react';
import { Quote } from './types';
import { EXAM_INFO, EXAM_DATE, EXAM_END_DATE } from './constants';
import { getDailyQuote } from './data/quotes';
import CountdownTimer from './components/CountdownTimer';
import ScheduleSection from './components/ScheduleSection';
import ExamTimetable from './components/ExamTimetable';
import ExamNotice from './components/ExamNotice';
import SevenDayReminder from './components/SevenDayReminder';
import SidebarMenu from './components/SidebarMenu';
import PromotionSection from './components/PromotionSection';
import UpcomingMilestones from './components/UpcomingMilestones';
import Modal from './components/Modal';
import Fireworks from './components/Fireworks';

const App: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  
  // Modal states
  const [activeModal, setActiveModal] = useState<'notice' | 'timetable' | 'schedule' | 'contact' | 'privacy' | 'terms' | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    setQuote(getDailyQuote());
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Check if exam just ended (within 30 seconds of refreshing)
    const checkExamEnd = () => {
      const now = +new Date();
      const endTime = +new Date(EXAM_END_DATE);
      if (now >= endTime && now <= endTime + 30000) {
        setShowFireworks(true);
      }
    };
    checkExamEnd();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('tyctw.analyze@gmail.com');
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const triggerFireworksPreview = () => {
    setShowFireworks(true);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {showFireworks && <Fireworks onFinish={() => setShowFireworks(false)} />}
      <SevenDayReminder />
      <SidebarMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onTriggerFireworks={triggerFireworksPreview} 
      />
      
      {/* 導覽列 */}
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 flex justify-center p-4 ${scrolled ? 'pt-4' : 'pt-6'}`}>
        <div className={`flex items-center justify-between w-full max-w-5xl px-8 py-3 rounded-full transition-all duration-700 border ${scrolled ? 'glass-card shadow-2xl border-white/40 scale-95' : 'bg-transparent border-transparent'}`}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black shadow-lg transform rotate-3">116</div>
            <p className="font-black text-slate-800 tracking-tighter text-xl">統測倒數</p>
          </div>
          <button 
            onClick={() => setIsMenuOpen(true)}
            aria-label="開啟選單"
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-slate-900 hover:text-white transition-all active:scale-90"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4 8h16M4 16h16" strokeLinecap="round"/></svg>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
        {/* HERO SECTION */}
        <header className="relative min-h-[95vh] flex flex-col items-center justify-center pt-24">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-gradient-to-br from-indigo-500/10 to-rose-500/5 blur-[120px] rounded-full opacity-60"></div>
          
          <div className="relative text-center z-10 animate-up opacity-0" style={{ animationDelay: '50ms' }}>
            <div className="inline-flex items-center px-4 py-1 bg-slate-900 text-white rounded-full text-[10px] font-black tracking-[0.4em] uppercase mb-6 shadow-xl">
               Year 116 · Countdown
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter leading-none mb-2">
              統測倒數
            </h1>
            <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">四技二專統一入學測驗計時器</p>
          </div>

          <div className="w-full max-w-4xl z-10 animate-up opacity-0" style={{ animationDelay: '150ms' }}>
            <CountdownTimer />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8 animate-up opacity-0" style={{ animationDelay: '250ms' }}>
            <div className="glass-card px-8 py-4 rounded-[2rem] flex items-center gap-4 border-white/60 hover:shadow-lg transition-all hover:-translate-y-1 group">
               <span className="text-2xl" role="img" aria-label="Calendar">📅</span>
               <div className="text-left">
                  <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase">Exam Date</p>
                  <p className="text-base font-black text-slate-800 tracking-tight">2027.04.24 - 04.25</p>
               </div>
            </div>
            <div className="glass-card px-8 py-4 rounded-[2rem] flex items-center gap-4 border-white/60 hover:shadow-lg transition-all hover:-translate-y-1 group bg-slate-900 text-white shadow-xl">
               <span className="text-2xl" role="img" aria-label="Target">🎯</span>
               <div className="text-left">
                  <p className="text-[9px] font-black text-slate-500 tracking-widest uppercase">Target</p>
                  <p className="text-base font-black text-white tracking-tight">四技二專統一入學測驗</p>
               </div>
            </div>
          </div>
        </header>

        <section className="mb-32 animate-up opacity-0" style={{ animationDelay: '350ms' }}>
          <UpcomingMilestones />
        </section>

        <section className="mb-32 animate-up opacity-0" style={{ animationDelay: '400ms' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <button 
              onClick={() => setActiveModal('notice')}
              className="group glass-card p-10 rounded-[3rem] text-left border-white/80 hover:scale-[1.03] transition-all hover:shadow-2xl hover:bg-white"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:rotate-6 transition-transform">🛡️</div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">應試生存指南</h2>
              <p className="text-slate-400 font-medium leading-relaxed">116 統測文具清單、違禁品規範與最後叮嚀</p>
              <div className="mt-8 flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest">
                Explore Guide <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>

            <button 
              onClick={() => setActiveModal('timetable')}
              className="group glass-card p-10 rounded-[3rem] text-left border-white/80 hover:scale-[1.03] transition-all hover:shadow-2xl hover:bg-white"
            >
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:rotate-6 transition-transform">⚡</div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">考試節次概覽</h2>
              <p className="text-slate-400 font-medium leading-relaxed">統測兩天考試時程表、專業科目對照</p>
              <div className="mt-8 flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest">
                Check Schedule <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>

            <button 
              onClick={() => setActiveModal('schedule')}
              className="group glass-card p-10 rounded-[3rem] text-left border-white/80 hover:scale-[1.03] transition-all hover:shadow-2xl hover:bg-white"
            >
              <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:rotate-6 transition-transform">📅</div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">重要日程表</h2>
              <p className="text-slate-400 font-medium leading-relaxed">116 統測報名、准考證、成績公佈等關鍵時刻</p>
              <div className="mt-8 flex items-center gap-2 text-rose-600 font-black text-xs uppercase tracking-widest">
                View Timeline <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          </div>
        </section>

        <PromotionSection />

        <footer className="mt-64 pt-32 border-t border-slate-200/60 text-center">
          <div className="flex flex-col items-center gap-10">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center text-xl font-black shadow-2xl">116</div>
              <div className="text-left">
                <h4 className="text-2xl font-black text-slate-900 tracking-tighter">116 統測倒數神器</h4>
                <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">The Essential Study Companion</p>
              </div>
            </div>

            {/* SEO 關鍵字連結區 */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-2xl text-[11px] font-bold text-slate-400">
               <span className="hover:text-slate-600 cursor-default">#116統測倒數</span>
               <span className="hover:text-slate-600 cursor-default">#四技二專統一入學測驗</span>
               <span className="hover:text-slate-600 cursor-default">#116學測報名日期</span>
               <span className="hover:text-slate-600 cursor-default">#技專校院入學測驗中心</span>
               <span className="hover:text-slate-600 cursor-default">#統測文具清單</span>
            </div>

            <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black tracking-[0.4em] uppercase text-slate-400">
               <button onClick={() => setActiveModal('privacy')} className="hover:text-indigo-600 transition-colors">隱私權政策</button>
               <button onClick={() => setActiveModal('terms')} className="hover:text-indigo-600 transition-colors">使用條款</button>
               <button onClick={() => setActiveModal('contact')} className="hover:text-indigo-600 transition-colors">聯絡我們</button>
               <button 
                 onClick={triggerFireworksPreview} 
                 className="px-4 py-1.5 bg-slate-100 rounded-full hover:bg-slate-900 hover:text-white transition-all flex items-center gap-2 group"
               >
                 <span className="group-hover:rotate-12 transition-transform">🎆</span>
                 預覽煙火秀
               </button>
            </div>

            <div className="px-8 py-3 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black text-slate-400 tracking-widest flex items-center gap-3">
               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
               116統測倒數系統 v2.4 · ALL RIGHTS RESERVED
            </div>
          </div>
        </footer>
      </main>

      {/* Modals */}
      <Modal isOpen={activeModal === 'notice'} onClose={() => setActiveModal(null)} title="應試生存指南"><ExamNotice /></Modal>
      <Modal isOpen={activeModal === 'timetable'} onClose={() => setActiveModal(null)} title="考試節次概覽"><ExamTimetable /></Modal>
      <Modal isOpen={activeModal === 'schedule'} onClose={() => setActiveModal(null)} title="重要日程表"><ScheduleSection /></Modal>
      <Modal isOpen={activeModal === 'contact'} onClose={() => setActiveModal(null)} title="聯絡我們">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center text-5xl mb-8 shadow-inner">✉️</div>
          <h3 className="text-3xl font-black text-slate-900 mb-4">有任何問題或建議嗎？</h3>
          <p className="text-slate-500 font-medium mb-12 max-w-md">歡迎透過電子郵件與我們聯繫，協助我們讓 116 統測倒數神器變得更好。</p>
          <div className="w-full max-w-md p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1">Official Support Email</p>
              <p className="text-xl font-black text-slate-800 font-mono">tyctw.analyze@gmail.com</p>
            </div>
            <button onClick={handleCopyEmail} className={`px-8 py-4 rounded-2xl font-black text-sm transition-all active:scale-95 flex items-center gap-2 ${copySuccess ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-slate-900 text-white shadow-slate-200 hover:bg-slate-800'}`}>{copySuccess ? '已複製' : '複製郵件'}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
