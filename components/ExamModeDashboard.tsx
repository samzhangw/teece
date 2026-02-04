import React, { useState, useEffect } from 'react';
import { EXAM_SESSIONS, SCHEDULE_DATA } from '../constants';
import { TimeCard } from './TimeCard';
import { ExamSession, TimeLeft } from '../types';
import { PenTool, Coffee, Clock, AlertCircle, ChevronRight, Zap, Play, Search, CalendarDays } from 'lucide-react';

interface ExamModeDashboardProps {
  now: Date;
}

export const ExamModeDashboard: React.FC<ExamModeDashboardProps> = ({ now }) => {
  // 1. Determine Current Status
  const currentSession = EXAM_SESSIONS.find(
    session => now >= new Date(session.startTime) && now <= new Date(session.endTime)
  );

  const nextSession = EXAM_SESSIONS.find(
    session => new Date(session.startTime) > now
  );

  // Helper to calc diff
  const calculateDiff = (target: string): TimeLeft => {
    const targetDate = new Date(target);
    const diff = targetDate.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isPast: false
    };
  };

  // 3. Render Logic
  
  // Case A: Testing Now (Exam In Progress)
  if (currentSession) {
    const timeLeft = calculateDiff(currentSession.endTime);
    return (
      <article className="h-full relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-slate-700 shadow-2xl p-8 sm:p-12 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/40 via-slate-900 to-slate-900"></div>
        {/* Animated Pulse for "Live" feeling */}
        <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/50 backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <span className="text-rose-400 text-xs font-bold uppercase tracking-widest">考試進行中</span>
        </div>

        <div className="relative z-10 w-full">
            <h2 className="text-slate-400 font-medium mb-2 tracking-wide uppercase text-sm">Current Subject</h2>
            <div className="text-3xl sm:text-5xl font-black text-white mb-8 drop-shadow-lg flex items-center justify-center gap-3">
                <div className="p-3 bg-rose-500/20 rounded-2xl border border-rose-500/30">
                     <PenTool className="w-8 h-8 sm:w-10 sm:h-10 text-rose-500" />
                </div>
                {currentSession.title}
            </div>

            <p className="text-rose-300 font-bold mb-6 flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" /> 距離本節結束
            </p>

            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-6 sm:gap-6 mb-8">
                 <TimeCard value={timeLeft.hours} label="時" colorClass="text-rose-500" />
                 <div className="text-4xl text-slate-700 font-light -mt-8">:</div>
                 <TimeCard value={timeLeft.minutes} label="分" colorClass="text-rose-500" />
                 <div className="text-4xl text-slate-700 font-light -mt-8">:</div>
                 <TimeCard value={timeLeft.seconds} label="秒" colorClass="text-rose-500" />
            </div>

            {nextSession && (
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center">
                    <p className="text-slate-500 text-sm mb-1">下一科</p>
                    <div className="text-lg text-slate-300 font-medium flex items-center gap-2">
                        {nextSession.title} 
                        <span className="text-slate-500 text-xs font-mono font-bold bg-slate-800 px-2 py-1 rounded border border-slate-700">
                            {new Date(nextSession.startTime).toLocaleTimeString('zh-TW', {hour:'2-digit', minute:'2-digit'})}
                        </span>
                    </div>
                </div>
            )}
        </div>
      </article>
    );
  }

  // Case B: Break Time / Before Exam (Next Session Exists)
  if (nextSession) {
    const timeLeft = calculateDiff(nextSession.startTime);
    const isTomorrow = new Date(nextSession.startTime).getDate() !== now.getDate();
    
    return (
      <article className="h-full relative overflow-hidden rounded-[2.5rem] bg-white border border-white/60 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] p-8 sm:p-12 flex flex-col items-center justify-center text-center">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-cyan-500"></div>
        
        <div className="relative z-10 w-full">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold mb-8 border border-emerald-100">
                <Coffee className="w-4 h-4" />
                <span>{isTomorrow ? '今日考試結束' : '休息時間'}</span>
             </div>

             <h2 className="text-slate-400 font-medium mb-2 tracking-wide uppercase text-sm">Next Subject</h2>
             <div className="text-3xl sm:text-5xl font-black text-slate-800 mb-8 flex items-center justify-center gap-3">
                {nextSession.title}
             </div>

             <p className="text-slate-500 font-bold mb-6 flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" /> 距離{isTomorrow ? '明日' : '下節'}開始
             </p>

             <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-6 sm:gap-6 mb-8">
                 {timeLeft.days > 0 && (
                     <>
                        <TimeCard value={timeLeft.days} label="天" colorClass="text-emerald-600" />
                        <div className="hidden sm:block text-4xl text-slate-300 font-light -mt-8">:</div>
                     </>
                 )}
                 <TimeCard value={timeLeft.hours} label="時" colorClass="text-emerald-600" />
                 
                 {/* Break line on mobile if days present */}
                 {timeLeft.days > 0 && <div className="basis-full h-0 sm:hidden"></div>}

                 <div className="hidden sm:block text-4xl text-slate-300 font-light -mt-8">:</div>
                 <TimeCard value={timeLeft.minutes} label="分" colorClass="text-emerald-600" />
                 <div className="hidden sm:block text-4xl text-slate-300 font-light -mt-8">:</div>
                 <TimeCard value={timeLeft.seconds} label="秒" colorClass="text-emerald-600" />
             </div>

             <div className="mt-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 inline-block w-full max-w-sm shadow-inner">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">進場時間</span>
                    <span className="font-bold text-slate-800 text-xl font-mono">
                        {new Date(nextSession.startTime).toLocaleTimeString('zh-TW', {hour:'2-digit', minute:'2-digit'})}
                    </span>
                </div>
             </div>
        </div>
      </article>
    );
  }

  // Case C: All Exams Finished -> Show Score Announcement Countdown
  const scoreQueryEvent = SCHEDULE_DATA.find(item => item.id === 'score-query');
  const scoreDateStr = scoreQueryEvent ? scoreQueryEvent.startDate : '2026-05-14T14:00:00';
  const scoreTimeLeft = calculateDiff(scoreDateStr);

  return (
    <article className="h-full relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 shadow-2xl p-8 sm:p-12 flex flex-col items-center justify-center text-center text-white border border-white/10 group">
        
        {/* Background Decorative Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

        <div className="relative z-10 w-full">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-bold mb-8 border border-indigo-500/30 ring-1 ring-inset ring-indigo-500/20">
                <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                <span>考試圓滿結束</span>
            </div>

            <h2 className="text-indigo-300 font-bold mb-3 tracking-widest uppercase text-xs">NEXT MILESTONE</h2>
            <div className="text-3xl sm:text-5xl font-black text-white mb-4 drop-shadow-xl tracking-tight">
                統測成績公佈
            </div>
            <p className="text-slate-400 font-medium mb-10 flex items-center justify-center gap-2 text-sm">
                <CalendarDays className="w-4 h-4" /> 
                <time dateTime={scoreDateStr}>{new Date(scoreDateStr).toLocaleDateString('zh-TW', {year:'numeric', month:'long', day:'numeric'})} 下午 2:00</time>
            </p>

            {scoreTimeLeft.isPast ? (
                <div className="py-8">
                    <div className="text-2xl font-bold text-white mb-6">成績已開放查詢</div>
                    <a 
                        href="https://www.tcte.edu.tw/NetServer/forward_score.php"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-indigo-900 font-black hover:bg-indigo-50 transition-all hover:scale-105 shadow-lg shadow-indigo-500/20"
                    >
                        <Search className="w-5 h-5" />
                        立即查詢成績
                    </a>
                </div>
            ) : (
                <>
                    <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-6 sm:gap-6 mb-10">
                        <TimeCard value={scoreTimeLeft.days} label="天" colorClass="text-indigo-400" />
                        <div className="text-4xl text-slate-700 font-light -mt-8">:</div>
                        <TimeCard value={scoreTimeLeft.hours} label="時" colorClass="text-indigo-400" />
                        
                        {/* Break line on mobile */}
                        <div className="basis-full h-0 sm:hidden"></div>

                        <div className="hidden sm:block text-4xl text-slate-700 font-light -mt-8">:</div>
                        <TimeCard value={scoreTimeLeft.minutes} label="分" colorClass="text-indigo-400" />
                        <div className="hidden sm:block text-4xl text-slate-700 font-light -mt-8">:</div>
                        <TimeCard value={scoreTimeLeft.seconds} label="秒" colorClass="text-indigo-400" />
                    </div>

                    <a 
                        href="https://www.tcte.edu.tw/NetServer/forward_score.php"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-all border border-white/10 backdrop-blur-sm"
                    >
                        <Search className="w-4 h-4" />
                        預先收藏查詢頁面
                    </a>
                </>
            )}
        </div>
    </article>
  );
};