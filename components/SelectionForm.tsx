
import React, { useState, useMemo } from 'react';
import { ALGERIAN_CAR_BRANDS, YEARS, FAULT_TYPES, COMMON_OBD_CODES } from '../constants';
import { UserSelection } from '../types';

interface SelectionFormProps {
  selection: UserSelection;
  setSelection: React.Dispatch<React.SetStateAction<UserSelection>>;
  onDiagnose: () => void;
  loading: boolean;
}

const SelectionForm: React.FC<SelectionFormProps> = ({ selection, setSelection, onDiagnose, loading }) => {
  const [obdSearch, setObdSearch] = useState('');

  const filteredCodes = useMemo(() => {
    if (!obdSearch) return COMMON_OBD_CODES;
    return COMMON_OBD_CODES.filter(c => 
      c.code.toLowerCase().includes(obdSearch.toLowerCase()) || 
      c.description.toLowerCase().includes(obdSearch.toLowerCase())
    );
  }, [obdSearch]);

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 space-y-6 shadow-xl backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* الماركة */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-400">نوع السيارة (Marque)</label>
          <select 
            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors"
            value={selection.brand}
            onChange={(e) => setSelection({ ...selection, brand: e.target.value, model: '' })}
          >
            <option value="">إختر الماركة...</option>
            {ALGERIAN_CAR_BRANDS.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
          </select>
        </div>

        {/* الموديل */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-400">الموديل (Modèle)</label>
          <select 
            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors"
            value={selection.model}
            disabled={!selection.brand}
            onChange={(e) => setSelection({ ...selection, model: e.target.value })}
          >
            <option value="">إختر الموديل...</option>
            {ALGERIAN_CAR_BRANDS.find(b => b.name === selection.brand)?.models.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        {/* السنة */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-400">سنة الصنع (Année)</label>
          <select 
            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors"
            value={selection.year}
            onChange={(e) => setSelection({ ...selection, year: e.target.value })}
          >
            <option value="">إختر السنة...</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        {/* نوع العطل */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-400">نوع العطل (Système)</label>
          <select 
            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors"
            value={selection.faultType}
            onChange={(e) => setSelection({ ...selection, faultType: e.target.value })}
          >
            {FAULT_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </div>

      {/* قسم كود OBD */}
      <div className="border-t border-slate-700 pt-6">
        <label className="block text-sm font-semibold mb-3 text-blue-400 flex justify-between items-center">
          <span>أدخل كود OBD (أو اختر من القائمة)</span>
          <span className="text-[10px] text-green-400 font-bold">يدعم أكثر من 500 كود ✅</span>
        </label>
        
        <input 
          type="text" 
          placeholder="مثلاً: P0300 أو DF053"
          className="w-full bg-slate-900 border border-slate-600 rounded-lg p-4 text-2xl font-mono text-center tracking-widest outline-none focus:border-blue-500 transition-colors uppercase placeholder:text-slate-700 mb-3"
          value={selection.obdCode}
          onChange={(e) => {
            const val = e.target.value.toUpperCase();
            setSelection({ ...selection, obdCode: val });
            setObdSearch(val);
          }}
        />

        <div className="relative">
          <input 
            type="text"
            placeholder="🔍 ابحث في الأكواد الشائعة..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-2 text-sm outline-none focus:border-blue-500"
            value={obdSearch}
            onChange={(e) => setObdSearch(e.target.value)}
          />
          <div className="mt-2 max-h-48 overflow-y-auto bg-slate-900 border border-slate-700 rounded-lg divide-y divide-slate-800 shadow-inner">
            {filteredCodes.length > 0 ? (
              filteredCodes.map(c => (
                <button 
                  key={c.code}
                  className={`w-full text-right p-3 hover:bg-slate-800 transition-colors flex justify-between items-center ${selection.obdCode === c.code ? 'bg-blue-900/40' : ''}`}
                  onClick={() => {
                    setSelection({ ...selection, obdCode: c.code });
                    setObdSearch(c.code);
                  }}
                >
                  <span className="font-mono font-bold text-blue-400">{c.code}</span>
                  <span className="text-xs text-slate-400">{c.description}</span>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-slate-500">
                الكود غير موجود في القائمة؟ لا تقلق، أدخله يدوياً وسيقوم النظام بتحليله.
              </div>
            )}
          </div>
        </div>
      </div>

      <button 
        onClick={onDiagnose}
        disabled={loading || !selection.brand || !selection.model || !selection.obdCode}
        className={`w-full py-5 rounded-xl font-black text-xl transition-all flex items-center justify-center gap-3 ${
          loading 
            ? 'bg-slate-700 cursor-not-allowed text-slate-400' 
            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20 active:scale-[0.98]'
        }`}
      >
        {loading ? (
          <>
            <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            <span>جاري تحليل الـ OBD بالذكاء الاصطناعي...</span>
          </>
        ) : (
          <>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <span>بدء الفحص الحقيقي (Scan)</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SelectionForm;
