
import React from 'react';
import { SCHEDULE_ITEMS } from '../constants';

const ScheduleSection: React.FC = () => {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">項目名稱</th>
              <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">重要日程</th>
              <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 text-center">狀態</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {SCHEDULE_ITEMS.map((item, index) => (
              <tr 
                key={index} 
                className={`group hover:bg-indigo-50/30 transition-all duration-300 ${item.isConfirmed ? 'bg-indigo-50/10' : ''}`}
              >
                <td className="px-8 py-6">
                  <p className="text-base font-black text-slate-800">{item.event}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{item.category || 'General'}</p>
                </td>
                <td className="px-8 py-6">
                  <span className={`text-sm font-mono font-bold ${item.isConfirmed ? 'text-indigo-600' : 'text-slate-500'}`}>
                    {item.date}
                  </span>
                </td>
                <td className="px-8 py-6 text-center">
                  {item.isConfirmed ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700 uppercase tracking-wider">
                      Confirmed
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black bg-slate-100 text-slate-400 uppercase tracking-wider">
                      Estimated
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-6 bg-slate-50/50 border-t border-slate-100">
        <p className="text-xs text-center text-slate-400 font-bold leading-relaxed">
          註：具體日期將於 116 學年度簡章公布後更新，請隨時關注技專校院入學測驗中心最新消息。
        </p>
      </div>
    </div>
  );
};

export default ScheduleSection;
