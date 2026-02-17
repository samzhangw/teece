
import React from 'react';

const PromotionSection: React.FC = () => {
  const channels = [
    { title: '甄選入學', icon: '🎯' },
    { title: '聯合登記分發', icon: '📊' },
    { title: '繁星計畫', icon: '⭐' },
    { title: '技優甄審', icon: '🏆' }
  ];

  return (
    <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 shadow-3xl text-white overflow-hidden relative animate-up" style={{ animationDelay: '0.4s' }}>
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-600/30 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-violet-600/20 rounded-full blur-[80px]"></div>

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center px-4 py-1.5 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-black mb-6 tracking-[0.2em] uppercase border border-indigo-500/20">
              Admission Guide 116
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">升大學管道全攻略</h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium mb-8">
              考完統測只是開始，掌握各項招生管道與關鍵日程，才能精準錄取理想志願！
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              {channels.map((channel, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
                  <span className="text-lg">{channel.icon}</span>
                  <span className="text-sm font-bold text-slate-200">{channel.title}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <a 
              href="https://ceectw.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-white blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="bg-white text-slate-900 px-10 py-5 rounded-[2rem] font-black text-xl shadow-2xl hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
                查看日程與分析
                <span className="text-2xl group-hover:translate-x-1 transition-transform">↗</span>
              </div>
            </a>
            <p className="text-xs text-slate-500 mt-6 font-bold uppercase tracking-widest">Powered by CEEC Entrance Portal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionSection;
