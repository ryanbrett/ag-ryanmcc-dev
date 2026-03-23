export interface PlantMetrics {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  ec: number;
  ph: number;
}

export type MetrcTag = string; // 24-character alphanumeric

export interface TransferManifest {
  id: string;
  destination: string;
  strainName: string;
  status: 'Created' | 'Pending' | 'Approved';
  date: string;
}

export interface SimulatedPlant {
  id: string;
  strain: string;
  tag: MetrcTag;
  metrics: PlantMetrics;
}

export interface PlantData {
  id: string;
  strain: string;
  rfid: string;
  health: 'optimal' | 'attention' | 'critical';
  temp: number;
  ec: number;
  ph: number;
  moisture: number;
}

export interface KPI {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: string;
}

export interface Alert {
  id: string;
  room: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
}

export interface Manifest {
  id: string;
  destination: string;
  status: 'Created' | 'Pending' | 'Approved';
  date: string;
}
