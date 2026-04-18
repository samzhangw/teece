
import React, { useState, useEffect } from 'react';
import { TimeLeft } from '../types';
import { EXAM_DATE } from '../constants';

const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(EXAM_DATE) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative py-4 md:py-8 group">
      <div className="relative flex flex-col items-center justify-center">
        
        {/* 背景巨型數字 (Ghost Numbers) - 稍微縮小以騰出空間 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] transition-all duration-1000 group-hover:opacity-[0.06]">
          <span className="text-[15rem] md:text-[25rem] font-black font-mono leading-none tracking-tighter tabular-nums">
            {timeLeft.days.toString().padStart(3, '0')}
          </span>
        </div>

        {/* 主要顯示區域 */}
        <div className="relative z-10 flex flex-col items-center">
          
          {/* 天數單元 - 核心衝擊 */}
          <div className="flex flex-col items-center mb-6 md:mb-10">
            <div className="relative inline-flex items-baseline gap-2 md:gap-4">
              <span className="text-8xl md:text-[14rem] font-black font-mono tracking-tighter text-slate-900 leading-none drop-shadow-2xl">
                {timeLeft.days}
              </span>
              <div className="flex flex-col mb-4 md:mb-8">
                 <span className="text-lg md:text-3xl font-black text-indigo-600 tracking-widest uppercase">Days</span>
                 <div className="h-1 w-full bg-indigo-600/20 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-indigo-600 w-1/3 animate-pulse"></div>
                 </div>
              </div>
            </div>
          </div>

          {/* 子時間單元 - 更精緻、更細長的條狀設計 */}
          <div className="flex items-center gap-3 md:gap-8 px-6 py-4 md:px-12 md:py-6 bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-white/60 shadow-xl group-hover:shadow-2xl transition-all duration-700">
            {/* Hours */}
            <div className="flex flex-col items-center min-w-[50px] md:min-w-[80px]">
              <span className="text-3xl md:text-5xl font-black font-mono text-slate-800 tabular-nums">
                {timeLeft.hours.toString().padStart(2, '0')}
              </span>
              <span className="text-[8px] md:text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">Hrs</span>
            </div>

            <div className="text-xl md:text-3xl font-black text-slate-300 animate-pulse">:</div>

            {/* Minutes */}
            <div className="flex flex-col items-center min-w-[50px] md:min-w-[80px]">
              <span className="text-3xl md:text-5xl font-black font-mono text-slate-800 tabular-nums">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </span>
              <span className="text-[8px] md:text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">Min</span>
            </div>

            <div className="text-xl md:text-3xl font-black text-slate-300 animate-pulse">:</div>

            {/* Seconds */}
            <div className="flex flex-col items-center min-w-[50px] md:min-w-[80px]">
              <span className="text-3xl md:text-5xl font-black font-mono text-rose-500 tabular-nums animate-ticking">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </span>
              <span className="text-[8px] md:text-[10px] font-black text-rose-400 tracking-[0.3em] uppercase">Sec</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ticking {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        .animate-ticking {
          animation: ticking 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default CountdownTimer;
