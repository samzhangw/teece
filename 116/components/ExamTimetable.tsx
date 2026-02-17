
import React from 'react';
import { EXAM_TIMETABLE } from '../constants';

const ExamTimetable: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {EXAM_TIMETABLE.map((day, dIdx) => (
          <div key={dIdx} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-slate-900 px-8 py-6 text-white flex justify-between items-center">
              <div>
                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-1">{day.dayOfWeek}</p>
                <h3 className="text-2xl font-black">{day.date}</h3>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">
                {dIdx === 0 ? '📅' : '🎯'}
              </div>
            </div>
            
            <div className="p-8 space-y-8">
              {day.sessions.map((session, sIdx) => (
                <div key={sIdx} className="relative pl-8 group/item">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-100 rounded-full group-hover/item:bg-indigo-100 transition-colors"></div>
                  <div className="absolute left-[-4px] top-1 w-3 h-3 rounded-full bg-indigo-600 border-2 border-white shadow-sm transition-transform group-hover/item:scale-125"></div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{session.sessionTitle}</span>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">預備：{session.prepTime}</span>
                    </div>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h4 className="text-xl font-black text-slate-800">{session.subject}</h4>
                      <span className="text-base font-mono text-indigo-500 font-bold">{session.examTime}</span>
                    </div>
                    <div className="mt-2 text-[11px] font-medium text-slate-500 bg-slate-50/50 p-3 rounded-xl border border-slate-100 leading-relaxed font-mono">
                      <span className="text-slate-400 block mb-1">群類別代碼：</span>
                      {session.categoryCodes}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-amber-50 border border-amber-100 rounded-[2rem] p-8 flex gap-6 items-center">
        <div className="w-14 h-14 bg-amber-400 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
          ⚠️
        </div>
        <div>
          <h4 className="text-amber-900 font-black mb-1">重要提示</h4>
          <p className="text-amber-800 font-medium text-sm leading-relaxed">
            進入試場須持 <strong>准考證正本</strong>。預備鈴響後請立即就座，保持肅靜並配合監試人員查驗。
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExamTimetable;
