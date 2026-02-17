
import React from 'react';
import { SCHEDULE_ITEMS } from '../constants';

const UpcomingMilestones: React.FC = () => {
  const now = new Date();
  
  const milestones = SCHEDULE_ITEMS
    .filter(item => item.isoDate && new Date(item.isoDate) > now)
    .sort((a, b) => new Date(a.isoDate!).getTime() - new Date(b.isoDate!).getTime())
    .slice(0, 3); // 僅顯示最近的 3 個

  const getDaysDiff = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getCategoryIcon = (category?: string) => {
    switch(category) {
      case 'exam': return '📝';
      case 'result': return '📊';
      case 'admission': return '🎓';
      default: return '📅';
    }
  };

  return (
    <div className="space-y-8 animate-up" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">即將到來重要日程</h2>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Next Milestones</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {milestones.map((item, idx) => {
          const daysLeft = getDaysDiff(item.isoDate!);
          return (
            <div 
              key={idx} 
              className="glass-card p-6 rounded-[2rem] relative overflow-hidden group transition-all hover:scale-[1.02] border border-white/60"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-6xl">{getCategoryIcon(item.category)}</span>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {item.isConfirmed ? '已確認' : '預計'}
                  </span>
                </div>
                
                <h3 className="text-lg font-black text-slate-800 mb-1 leading-tight">{item.event}</h3>
                <p className="text-slate-400 text-sm font-bold mb-6">{item.date}</p>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-indigo-600 font-mono tracking-tighter">{daysLeft}</span>
                  <span className="text-sm font-bold text-slate-500">DAYS LEFT</span>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 h-1 bg-indigo-600 transition-all duration-500" style={{ width: `${Math.max(10, 100 - (daysLeft / 2))} %` }}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingMilestones;
