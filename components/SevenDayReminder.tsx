
import React, { useState, useEffect } from 'react';
import { EXAM_DATE } from '../constants';

const SevenDayReminder: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const diff = +new Date(EXAM_DATE) - +new Date();
    const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    // If it's 7 days or less before the exam, and haven't dismissed this session
    if (daysLeft <= 7 && daysLeft >= 0) {
      const dismissed = sessionStorage.getItem('7dayReminderDismissed');
      if (!dismissed) {
        setShow(true);
      }
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem('7dayReminderDismissed', 'true');
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-indigo-600 p-6 text-center text-white relative">
          <div className="text-5xl mb-2">🔥</div>
          <h2 className="text-2xl font-black">最後衝刺！</h2>
          <p className="text-indigo-100 mt-1">統測倒數最後 7 天</p>
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-8">
          <p className="text-gray-600 mb-6 leading-relaxed">
            這是一場耐力賽的最後一哩路。請務必再次檢查您的<strong>應試文具</strong>與<strong>准考證</strong>。保持充足睡眠，最好的狀態就是你最強大的武器！
          </p>
          <button 
            onClick={handleClose}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
          >
            收到，我準備好了！
          </button>
        </div>
      </div>
    </div>
  );
};

export default SevenDayReminder;
