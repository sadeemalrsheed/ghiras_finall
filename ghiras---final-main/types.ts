
export enum Language {
  AR = 'ar',
  EN = 'en',
}

export enum View {
  HOME = 'HOME',
  DIAGNOSIS = 'DIAGNOSIS',
  CROPS = 'CROPS',
  IOT = 'IOT',
}

export interface PlantDiagnosisResult {
  plantName: string;
  isHealthy: boolean;
  confidence: number;
  diseaseName?: string;
  treatments: string[];
  tips: string[];
}

export interface RegionData {
  id: string;
  nameAr: string;
  nameEn: string;
  crops: Crop[];
}

export interface Crop {
  nameAr: string;
  nameEn: string;
  image: string;
  season: string;
}

export interface SensorData {
  moisture: number;
  n: number;
  p: number;
  k: number;
  ph: number;
  ec: number;
  temp: number;
}

export type TranslationKey = 
  | 'appTitle'
  | 'heroTitle'
  | 'heroDesc'
  | 'serviceDiagnosis'
  | 'serviceDiagnosisDesc'
  | 'serviceCrops'
  | 'serviceCropsDesc'
  | 'serviceIoT'
  | 'serviceIoTDesc'
  | 'startBtn'
  | 'uploadImage'
  | 'analyzeBtn'
  | 'analyzing'
  | 'healthy'
  | 'infected'
  | 'confidence'
  | 'treatments'
  | 'tips'
  | 'selectRegion'
  | 'detectLocation'
  | 'detecting'
  | 'regionCentral'
  | 'regionEast'
  | 'regionWest'
  | 'regionSouth'
  | 'regionNorth'
  | 'irrigationDashboard'
  | 'soilMoisture'
  | 'lastWatered'
  | 'irrigationStatus'
  | 'npkDashboard'
  | 'statusGood'
  | 'statusLow'
  | 'statusHigh'
  | 'nitrogen'
  | 'phosphorus'
  | 'potassium'
  | 'temp'
  | 'acidity'
  // New Sections
  | 'featuresTitle'
  | 'feature1Title'
  | 'feature1Desc'
  | 'feature2Title'
  | 'feature2Desc'
  | 'feature3Title'
  | 'feature3Desc'
  | 'feature4Title'
  | 'feature4Desc'
  | 'howToTitle'
  | 'howToSubtitle'
  | 'step1Title'
  | 'step1Desc'
  | 'step2Title'
  | 'step2Desc'
  | 'step3Title'
  | 'step3Desc'
  | 'ctaTitle'
  | 'ctaBtn'
  | 'aboutUsTitle'
  | 'aboutUsDesc'
  | 'quickLinksTitle'
  | 'contactUsTitle';