
import React, { useState } from 'react';
import { generateStudyPlan } from '../services/geminiService';
import { StudyPlanItem } from '../types';

interface Props {
  subject: string;
  daysLeft: number;
}

const SubjectCard: React.FC<Props> = ({ subject, daysLeft }) => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<StudyPlanItem | null>(null);

  const handleGetPlan = async () => {
    setLoading(true);
    try {
      const data = await generateStudyPlan(subject, daysLeft);
      setPlan(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">{subject}</h3>
        {!plan && (
          <button
            onClick={handleGetPlan}
            disabled={loading}
            className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium hover:bg-indigo-100 disabled:opacity-50 transition-colors"
          >
            {loading ? '生成中...' : '獲取 AI 攻略'}
          </button>
        )}
      </div>

      {plan ? (
        <div className="space-y-2 animate-fade-in">
          <div className="flex items-start gap-2">
            <span className="text-xs font-bold text-indigo-600 mt-1">目標:</span>
            <p className="text-sm text-gray-600 leading-relaxed">{plan.goal}</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-xs font-bold text-green-600 mt-1">建議:</span>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">{plan.advice}</p>
          </div>
          <button
            onClick={() => setPlan(null)}
            className="text-[10px] text-gray-400 mt-2 underline"
          >
            重新產生
          </button>
        </div>
      ) : (
        <p className="text-xs text-gray-400">點擊按鈕獲取針對目前的備考建議。</p>
      )}
    </div>
  );
};

export default SubjectCard;
