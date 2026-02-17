
import React from 'react';
import { STATIONERY_GUIDE, PROHIBITED_ITEMS, EXAM_PRECAUTIONS } from '../constants';

const ExamNotice: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stationery Section */}
        <div className="bg-white/50 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group border border-slate-100">
          <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-emerald-50 rounded-full opacity-50"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner">✔</div>
              <h3 className="text-2xl font-black text-slate-800">{STATIONERY_GUIDE.title}</h3>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {STATIONERY_GUIDE.items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 p-4 bg-white/60 rounded-2xl border border-white font-bold text-slate-600">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-emerald-50/50 p-6 rounded-[1.5rem] border border-emerald-100">
              <p className="text-sm text-emerald-800 font-bold leading-relaxed">
                <span className="text-lg mr-2">💡</span>{STATIONERY_GUIDE.warning}
              </p>
            </div>
          </div>
        </div>

        {/* Prohibited Items Section */}
        <div className="bg-white/50 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group border border-slate-100">
          <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-rose-50 rounded-full opacity-50"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner">✘</div>
              <h3 className="text-2xl font-black text-slate-800">{PROHIBITED_ITEMS.title}</h3>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {PROHIBITED_ITEMS.items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 p-4 bg-white/60 rounded-2xl border border-white font-bold text-slate-600">
                  <span className="w-2 h-2 bg-rose-400 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-rose-50/50 p-6 rounded-[1.5rem] border border-rose-100">
              <p className="text-sm text-rose-800 font-bold leading-relaxed">
                <span className="text-lg mr-2">⚠️</span>{PROHIBITED_ITEMS.warning}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Precautions Section */}
      <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-black flex items-center gap-4 mb-10">
            <span className="text-amber-400 text-3xl">✦</span> 考前最後叮嚀
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXAM_PRECAUTIONS.map((tip, idx) => (
              <div key={idx} className="flex gap-4 p-5 bg-white/5 rounded-[1.5rem] border border-white/5 group">
                <span className="text-indigo-400 font-black text-xl italic opacity-50 group-hover:opacity-100 transition-opacity">{String(idx + 1).padStart(2, '0')}</span>
                <p className="text-slate-300 leading-relaxed font-bold text-sm group-hover:text-white transition-colors">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamNotice;
