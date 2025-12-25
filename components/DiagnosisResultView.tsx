
import React from 'react';
import { DiagnosisResult } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DiagnosisResultViewProps {
  result: DiagnosisResult;
  onReset: () => void;
}

const DiagnosisResultView: React.FC<DiagnosisResultViewProps> = ({ result, onReset }) => {
  const getRiskColor = (level: number) => {
    if (level <= 3) return 'bg-green-500';
    if (level <= 7) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-center bg-slate-800/80 p-4 rounded-xl border border-slate-700">
        <h2 className="text-2xl font-bold text-blue-400">نتيجة الفحص للكود: {result.code}</h2>
        <button onClick={onReset} className="text-sm text-slate-400 hover:text-white transition-colors">فحص جديد</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Detailed Descriptions */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
              التشخيص باللغة العربية الفصحى
            </h3>
            <p className="text-slate-300 leading-relaxed">{result.standardArabic}</p>
          </section>

          <section className="bg-blue-900/20 p-6 rounded-2xl border border-blue-800/50">
            <h3 className="text-lg font-bold mb-3 text-blue-300 flex items-center gap-2">
              <span className="w-2 h-6 bg-yellow-500 rounded-full"></span>
              بالدارجة الجزائرية (الميكانيكي يقولك)
            </h3>
            <div className="text-slate-100 italic bg-black/30 p-4 rounded-lg border-r-4 border-yellow-500">
              "{result.algerianDarija}"
            </div>
          </section>

          <section className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold mb-3 text-green-400">طريقة الحل (La Solution)</h3>
            <div className="whitespace-pre-wrap text-slate-300">
              {result.solution}
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-400 uppercase mb-4">مدى الخطورة</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-slate-900 h-3 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getRiskColor(result.riskLevel)}`} 
                  style={{ width: `${result.riskLevel * 10}%` }}
                ></div>
              </div>
              <span className="font-bold text-xl">{result.riskLevel}/10</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">تنبيه: لا تهمل المشاكل ذات الخطورة العالية لتفادي كسر المحرك.</p>
          </div>

          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-400 uppercase mb-2">التكلفة التقريبية</h3>
            <div className="text-3xl font-bold text-blue-400">{result.estimatedCost}</div>
            <p className="text-xs text-slate-500 mt-1">تشمل قطع الغيار ويد العمل التقريبية في الجزائر.</p>
          </div>

          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-400 uppercase mb-4">منحنى أداء الحساس</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={result.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ display: 'none' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisResultView;
