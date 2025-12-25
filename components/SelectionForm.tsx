
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
        {/* Brand */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-400">نوع السيارة (La Marque)</label>
          <select 
            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors"
            value={selection.brand}
            onChange={(e) => setSelection({ ...selection, brand: e.target.value, model: '' })}
          >
            <option value="">إختر الماركة...</option>
            {ALGERIAN_CAR_BRANDS.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
          </select>
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-400">موديل السيارة (Modèle)</label>
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

        {/* Year */}
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

        {/* Fault Type */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-400">نوع العطل (Type de panne)</label>
          <select 
            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 outline-none focus:border-blue-500 transition-colors"
            value={selection.faultType}
            onChange={(e) => setSelection({ ...selection, faultType: e.target.value })}
          >
            <option value="">إختر نظام العطل...</option>
            {FAULT_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </div>

      {/* OBD Code Section */}
      <div className="border-t border-slate-700 pt-6">
        <label className="block text-sm font-semibold mb-3 text-blue-400 flex justify-between items-center">
          <span>كود OBD (مثلا: P0300)</span>
          <span className="text-[10px] text-slate-500 font-normal">يمكنك كتابة أي كود من الـ 500+ المتوفرة</span>
        </label>
        
        <div className="flex flex-col gap-3">
          <input 
            type="text" 
            placeholder="أدخل الكود يدويا هنا..."
            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-4 text-xl font-mono text-center tracking-widest outline-none focus:border-blue-500 transition-colors uppercase placeholder:text-slate-700"
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
              placeholder="🔍 ابحث في القائمة الشائعة..."
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-2 text-sm outline-none focus:border-blue-500"
              value={obdSearch}
              onChange={(e) => setObdSearch(e.target.value)}
            />
            <div className="mt-2 max-h-40 overflow-y-auto bg-slate-900 border border-slate-700 rounded-lg divide-y divide-slate-800 scrollbar-thin scrollbar-thumb-slate-700">
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
                  كود غير موجود في القائمة؟ اكتبه يدوياً في الأعلى.
                </div>
              )}
            </div>
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
            <span>جاري تحليل الـ OBD...</span>
          </>
        ) : (
          <>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span>بدء التشخيص الحقيقي (Scan)</span>
          </>
        )}
      </button>
      
      <p className="text-center text-[10px] text-slate-600 uppercase tracking-widest font-bold">
        Professional Database: 500+ Codes Integrated
      </p>
    </div>
  );
};

export default SelectionForm;
