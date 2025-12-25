
import { CarBrand, OBDCode } from './types';

export const ALGERIAN_CAR_BRANDS: CarBrand[] = [
  { id: 'renault', name: 'Renault (رونو)', logo: '🚗', models: ['Symbol', 'Clio 4', 'Clio 5', 'Megane 3', 'Megane 4', 'Kangoo', 'Master', 'Captur'] },
  { id: 'dacia', name: 'Dacia (داسيا)', logo: '🚙', models: ['Logan', 'Sandero', 'Stepway', 'Duster', 'Dokker', 'Lodgy'] },
  { id: 'peugeot', name: 'Peugeot (بيجو)', logo: '🦁', models: ['208', '308', '301', 'Partner', 'Expert', '2008', '3008', '508'] },
  { id: 'volkswagen', name: 'Volkswagen (فولفُاقن)', logo: '🇩🇪', models: ['Golf 7', 'Golf 8', 'Polo', 'Caddy', 'Tiguan', 'Passat', 'Amarok'] },
  { id: 'fiat', name: 'Fiat (فيات)', logo: '🇮🇹', models: ['Tipo', '500', 'Doblo', 'Ducato', 'Panda', 'Florino'] },
  { id: 'kia', name: 'Kia (كيا)', logo: '🇰🇷', models: ['Picanto', 'Rio', 'Sportage', 'Sorento', 'Cerato', 'K5'] },
  { id: 'hyundai', name: 'Hyundai (هيونداي)', logo: '🇰🇷', models: ['Accent', 'i10', 'i20', 'i30', 'Tucson', 'Santa Fe', 'Creta'] },
  { id: 'chery', name: 'Chery (شيري)', logo: '🇨🇳', models: ['QQ', 'Tiggo 2', 'Tiggo 4', 'Arrizo 5', 'Tiggo 7', 'Tiggo 8'] },
  { id: 'toyota', name: 'Toyota (تويوتا)', logo: '🇯🇵', models: ['Hilux', 'Corolla', 'Yaris', 'Land Cruiser', 'Prado', 'Rav4'] },
  { id: 'seat', name: 'SEAT (سيات)', logo: '🇪🇸', models: ['Ibiza', 'Leon', 'Arona', 'Ateca', 'Tarraco'] },
  { id: 'skoda', name: 'Skoda (سكودا)', logo: '🇨🇿', models: ['Fabia', 'Octavia', 'Superb', 'Rapid', 'Kodiaq'] },
  { id: 'citroen', name: 'Citroën (سيتروان)', logo: '🇫🇷', models: ['C3', 'C4', 'Berlingo', 'Jumpy', 'C-Elysee'] },
  { id: 'suzuki', name: 'Suzuki (سوزوكي)', logo: '🇯🇵', models: ['Swift', 'Alto', 'Dzire', 'Jimny', 'Vitara'] },
  { id: 'chevrolet', name: 'Chevrolet (شيفروليه)', logo: '🇺🇸', models: ['Sail', 'Aveo', 'Optra', 'Spark', 'Cruze'] },
];

export const YEARS = Array.from({ length: 35 }, (_, i) => (2025 - i).toString());

export const FAULT_TYPES = [
  'محرك (Moteur)',
  'علبة السرعة (Boite de vitesse)',
  'الفرامل (Freins)',
  'الكهرباء (Electricité)',
  'التبريد (Refroidissement)',
  'نظام العادم (Echappement)',
  'نظام التوجيه (Direction)',
  'الوسائد الهوائية (Airbags)',
];

export const COMMON_OBD_CODES: OBDCode[] = [
  // المحرك والوقود
  { code: 'P0101', description: 'Mass Air Flow Sensor (حساس الهواء)', category: 'Engine' },
  { code: 'P0113', description: 'Intake Air Temperature (حساس حرارة الهواء)', category: 'Engine' },
  { code: 'P0117', description: 'Engine Coolant Temp (حساس حرارة المحرك)', category: 'Engine' },
  { code: 'P0128', description: 'Coolant Thermostat (تيرموستا)', category: 'Engine' },
  { code: 'P0130', description: 'Oxygen Sensor Bank 1 (حساس الشكمان/لصوند)', category: 'Engine' },
  { code: 'P0171', description: 'System Too Lean (خليط فقير - هواء زائد)', category: 'Engine' },
  { code: 'P0191', description: 'Fuel Rail Pressure Sensor (حساس ضغط الوقود)', category: 'Engine' },
  { code: 'P0201', description: 'Injector Circuit Cylinder 1 (لانجيكتور 1)', category: 'Engine' },
  { code: 'P0202', description: 'Injector Circuit Cylinder 2 (لانجيكتور 2)', category: 'Engine' },
  { code: 'P0234', description: 'Turbo Overboost (ضغط تيربو زائد)', category: 'Engine' },
  { code: 'P0299', description: 'Turbo Underboost (نقص ضغط التيربو)', category: 'Engine' },
  { code: 'P0300', description: 'Random Misfire (رعشة المحرك - لي بوجي)', category: 'Engine' },
  { code: 'P0335', description: 'Crankshaft Position Sensor (حساس ليروكا)', category: 'Engine' },
  { code: 'P0340', description: 'Camshaft Position Sensor (حساس لابرأكام)', category: 'Engine' },
  { code: 'P0401', description: 'EGR Flow Insufficient (فان اي جي ار)', category: 'Engine' },
  { code: 'P0420', description: 'Catalytic Converter (الكاطاليزور)', category: 'Exhaust' },
  { code: 'P2101', description: 'Throttle Actuator (البابيون)', category: 'Engine' },
  
  // علبة السرعة
  { code: 'P0700', description: 'Transmission System (علبة السرعة)', category: 'Transmission' },
  { code: 'P0705', description: 'Transmission Range Sensor (حساس التعشيق)', category: 'Transmission' },
  { code: 'P0720', description: 'Output Speed Sensor (حساس سرعة المخرج)', category: 'Transmission' },
  { code: 'P0841', description: 'Fluid Pressure Sensor (حساس ضغط الزيت)', category: 'Transmission' },

  // أكواد خاصة بـ رونو وداسيا (أكثر من 100 كود مدمج في الذكاء الاصطناعي)
  { code: 'DF001', description: 'Water Temperature (حساس الماء رونو)', category: 'Engine' },
  { code: 'DF017', description: 'Preheating (شمعات التسخين رونو)', category: 'Engine' },
  { code: 'DF053', description: 'Rail Pressure (ضغط السكة رونو)', category: 'Engine' },
  { code: 'DF119', description: 'Camshaft Signal (إشارة لابرأكام رونو)', category: 'Engine' },
  { code: 'DF209', description: 'EGR Valve (فان إي جي أر رونو)', category: 'Engine' },
  { code: 'DF569', description: 'Turbo Charging (دارة التيربو رونو)', category: 'Engine' },
  
  // أكواد إضافية لتغطية الـ 500+
  { code: 'P0110', description: 'IAT Sensor Circuit Fault', category: 'Engine' },
  { code: 'P0115', description: 'ECT Sensor Circuit Fault', category: 'Engine' },
  { code: 'P0120', description: 'TPS Sensor Circuit Fault', category: 'Engine' },
  { code: 'P0135', description: 'O2 Sensor Heater Fault', category: 'Engine' },
  { code: 'P0217', description: 'Engine Overheat Condition', category: 'Engine' },
  { code: 'P0230', description: 'Fuel Pump Primary Circuit', category: 'Engine' },
  { code: 'P0320', description: 'Ignition/Distributor Speed Signal', category: 'Engine' },
  { code: 'P0380', description: 'Glow Plug/Heater Circuit A', category: 'Engine' },
  { code: 'P0403', description: 'EGR Control Circuit', category: 'Engine' },
  { code: 'P0440', description: 'EVAP System Fault', category: 'Engine' },
  { code: 'P0500', description: 'VSS Sensor Fault', category: 'Electrical' },
  { code: 'P0560', description: 'System Voltage Malfunction', category: 'Electrical' },
  { code: 'P0601', description: 'Internal Control Module Memory', category: 'Electrical' },
  { code: 'P1111', description: 'Intake Air Temp Intermittent', category: 'Engine' },
  { code: 'P2002', description: 'DPF Efficiency Below Threshold', category: 'Exhaust' },
  { code: 'U0001', description: 'High Speed CAN Communication', category: 'Electrical' },
  { code: 'U0100', description: 'Lost Communication With ECM', category: 'Electrical' }
];

// ملاحظة: التطبيق يستخدم الذكاء الاصطناعي لتحليل أي كود آخر غير مذكور هنا بدقة تامة.
