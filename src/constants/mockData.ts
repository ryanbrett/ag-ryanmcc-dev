import { PlantData, KPI, Alert, Manifest } from '../types';

export const MOCK_KPIS: KPI[] = [
  { label: 'Active Plants', value: '12,500', change: '+2.4%', trend: 'up', icon: 'Leaf' },
  { label: 'Grow Rooms', value: '12/12', trend: 'neutral', icon: 'Home' },
  { label: 'Upcoming Harvests', value: '2 Strains', change: 'Next 7 Days', trend: 'up', icon: 'Calendar' },
  { label: 'Avg. Humidity', value: '62%', change: '-1.2%', trend: 'down', icon: 'Droplets' },
];

export const MOCK_ALERTS: Alert[] = [
  { id: '1', room: 'Room 4', message: 'Low Nutrient Alert', severity: 'medium', timestamp: '10m ago' },
  { id: '2', room: 'Room 12', message: 'Sensor 12: Offline', severity: 'high', timestamp: '24m ago' },
  { id: '3', room: 'Room 2', message: 'Temperature Variance Detected', severity: 'low', timestamp: '1h ago' },
];

export const MOCK_CHART_DATA = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  temp: 75 + Math.random() * 5,
  moisture: 60 + Math.random() * 10,
}));

export const MOCK_MANIFESTS: Manifest[] = [
  { id: 'MF-99281', destination: 'Green Relief Dispensary', status: 'Approved', date: '2024-03-20' },
  { id: 'MF-99282', destination: 'Bama Buds Wellness', status: 'Pending', date: '2024-03-21' },
  { id: 'MF-99283', destination: 'Gulf Coast Apothecary', status: 'Created', date: '2024-03-22' },
];

export const generatePlantGrid = (rows: number, cols: number): PlantData[] => {
  const strains = ['Silverhill Kush', 'Alabama Gold', 'Dixie Dream', 'Cotton State Cookies'];
  return Array.from({ length: rows * cols }, (_, i) => ({
    id: `P-${i}`,
    strain: strains[Math.floor(Math.random() * strains.length)],
    rfid: `1A4060300001AB40${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
    health: Math.random() > 0.8 ? 'attention' : 'optimal',
    temp: 76 + Math.random() * 4,
    ec: 1.6 + Math.random() * 0.4,
    ph: 5.6 + Math.random() * 0.4,
    moisture: 55 + Math.random() * 15,
  }));
};
