
import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onTriggerFireworks?: () => void;
}

const SidebarMenu: React.FC<Props> = ({ isOpen, onClose, onTriggerFireworks }) => {
  const externalLinks = [
    { name: '會考倒數', url: 'https://tyctw.github.io/115clock/', icon: '🏫', desc: '國中升學關鍵點' },
    { name: '學測倒數', url: 'https://ceecc.vercel.app/', icon: '🎓', desc: '高中升大學門檻' },
    { name: '分科倒數', url: 'https://uactw.vercel.app/', icon: '🧪', desc: '精進科目的挑戰' },
    { name: '國考倒數', url: '#', icon: '⚖️', desc: '各類國家考試資訊' },
    { name: '證照考試', url: '#', icon: '📜', desc: '專業技能認證' },
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar Container */}
      <div 
        className={`fixed top-4 right-4 bottom-4 w-80 bg-white/90 backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.3)] z-[70] rounded-[2.5rem] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col overflow-hidden ${isOpen ? 'translate-x-0' : 'translate-x-[110%]'}`}
      >
        {/* Fixed Header */}
        <div className="p-8 pb-4 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-black text-slate-800">選單</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Cross Platforms</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-900 hover:text-white rounded-full transition-all text-slate-500 active:scale-90"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-8 py-4 custom-scrollbar">
          
          {/* 特色測試區塊 */}
          <div className="mb-10">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">互動體驗</h3>
            <button
              onClick={onTriggerFireworks}
              className="w-full flex items-center gap-4 p-5 rounded-[1.5rem] bg-slate-900 text-white hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 hover:shadow-indigo-200 group"
            >
              <span className="text-3xl group-hover:rotate-12 group-hover:scale-110 transition-transform">🎆</span>
              <div className="text-left">
                <span className="block font-black text-sm">煙火秀測試</span>
                <span className="block text-[10px] text-slate-400 group-hover:text-indigo-100 font-bold uppercase tracking-tight">Preview Celebration</span>
              </div>
              <span className="ml-auto opacity-50 group-hover:translate-x-1 transition-all">→</span>
            </button>
          </div>

          <div className="mb-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">其它平台</h3>
            <nav className="space-y-4 mb-8">
              {externalLinks.map((link) => (
                <a
                  key={link.name + link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-[1.5rem] bg-slate-50/50 hover:bg-indigo-600 transition-all border border-slate-100 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-200"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">{link.icon}</span>
                    <div>
                      <span className="block font-black text-slate-800 group-hover:text-white transition-colors">{link.name}</span>
                      <span className="block text-xs text-slate-400 group-hover:text-indigo-100 transition-colors font-medium">{link.desc}</span>
                    </div>
                    <span className="ml-auto text-slate-300 group-hover:text-white/50 group-hover:translate-x-1 transition-all">↗</span>
                  </div>
                </a>
              ))}
            </nav>
          </div>

          <div className="p-6 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-[1.5rem] border border-indigo-100/50 mb-4">
            <p className="text-xs text-indigo-700/80 leading-relaxed font-bold">
              集結所有重大升學考試倒數，助你掌握最後衝刺的每一刻。金榜題名，從規律生活開始。
            </p>
          </div>
        </div>

        {/* Tiny Footer Decor */}
        <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 text-center shrink-0">
          <p className="text-[9px] font-black text-slate-300 tracking-[0.2em] uppercase">
            Navigation System v2.0
          </p>
        </div>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #e2e8f0;
            border-radius: 20px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #cbd5e1;
          }
        `}</style>
      </div>
    </>
  );
};

export default SidebarMenu;
