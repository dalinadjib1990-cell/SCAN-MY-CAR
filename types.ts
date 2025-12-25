
export interface CarBrand {
  id: string;
  name: string;
  logo: string;
  models: string[];
}

export interface OBDCode {
  code: string;
  description: string;
  category: 'Engine' | 'Transmission' | 'Brakes' | 'Electrical' | 'Exhaust';
}

export interface DiagnosisResult {
  code: string;
  standardArabic: string;
  algerianDarija: string;
  solution: string;
  estimatedCost: string;
  riskLevel: number; // 1 to 10
  chartData: { name: string; value: number }[];
  impactedParts: string[];
}

export interface UserSelection {
  brand: string;
  model: string;
  year: string;
  obdCode: string;
  faultType: string;
}
