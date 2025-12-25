
import React, { useState } from 'react';
import SelectionForm from './components/SelectionForm';
import DiagnosisResultView from './components/DiagnosisResultView';
import { UserSelection, DiagnosisResult } from './types';
import { getDetailedDiagnosis } from './services/geminiService';

const App: React.FC = () => {
  const [selection, setSelection] = useState<UserSelection>({
    brand: '',
    model: '',
    year: '2020',
    obdCode: '',
    faultType: 'محرك (Moteur)',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDiagnose = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDetailedDiagnosis(selection);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء الاتصال بالنظام. يرجى المحاولة لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      {/* Header */}
      <header className="w-full max-w-5xl mb-12 text-center">
        <div className="flex flex-col items-center gap-4 mb-4">
          <div className="bg-blue-600 p-3 rounded-full shadow-lg shadow-blue-500/20">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
            SCAN MY CAR <span className="text-blue-500">ALGERIA</span>
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            تطبيق تشخيص أعطال السيارات الاحترافي للسوق الجزائري. حلول حقيقية بلهجة الميكانيكي وتكاليف دقيقة.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-5xl flex-grow">
        {!result ? (
          <div className="max-w-2xl mx-auto">
            {error && (
              <div className="bg-red-900/30 border border-red-500 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
              </div>
            )}
            <SelectionForm 
              selection={selection} 
              setSelection={setSelection} 
              onDiagnose={handleDiagnose} 
              loading={loading}
            />
          </div>
        ) : (
          <DiagnosisResultView result={result} onReset={handleReset} />
        )}
      </main>

      {/* Footer / Branding */}
      <footer className="w-full max-w-5xl mt-12 pt-8 border-t border-slate-800 flex flex-col items-center">
        <div className="flex items-center gap-4 bg-slate-900/50 px-6 py-4 rounded-full border border-slate-700 shadow-xl">
          <div className="w-12 h-12 rounded-full border-2 border-blue-500 overflow-hidden bg-slate-800">
            <img 
              src="https://picsum.photos/200" 
              alt="Developer Dali Nadjib" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs text-slate-500">تم التطوير بواسطة</p>
            <p className="text-sm font-bold text-white tracking-widest uppercase">Developer Dali Nadjib</p>
          </div>
        </div>
        <p className="text-slate-600 text-[10px] mt-6 uppercase tracking-widest">
          © 2025 Scan My Car DZ • Professional Automotive Solutions
        </p>
      </footer>
    </div>
  );
};

export default App;
