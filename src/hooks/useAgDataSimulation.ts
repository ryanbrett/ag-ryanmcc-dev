import { useState, useEffect } from 'react';
import { SimulatedPlant, TransferManifest, PlantMetrics } from '../types';

const INITIAL_PLANTS: SimulatedPlant[] = [
  {
    id: 'P-0',
    strain: 'Silverhill Kush',
    tag: '1A4060300000000000000001',
    metrics: { temperature: 78.0, humidity: 56.0, soilMoisture: 62.0, ec: 1.8, ph: 5.8 }
  },
  {
    id: 'P-1',
    strain: 'Alabama Gold',
    tag: '1A4060300000000000000002',
    metrics: { temperature: 77.9, humidity: 55.5, soilMoisture: 60.5, ec: 1.7, ph: 5.9 }
  },
  {
    id: 'P-2',
    strain: 'Dixie Dream',
    tag: '1A4060300000000000000003',
    metrics: { temperature: 78.1, humidity: 56.5, soilMoisture: 63.0, ec: 1.9, ph: 5.7 }
  },
  {
    id: 'P-3',
    strain: 'Cotton State Cookies',
    tag: '1A4060300000000000000004',
    metrics: { temperature: 78.2, humidity: 57.0, soilMoisture: 61.5, ec: 1.8, ph: 5.8 }
  },
  {
    id: 'P-4',
    strain: 'Silverhill Kush',
    tag: '1A4060300000000000000005',
    metrics: { temperature: 77.8, humidity: 55.0, soilMoisture: 59.0, ec: 1.6, ph: 6.0 }
  }
];

const INITIAL_MANIFESTS: TransferManifest[] = [
  { id: 'MF-99281', destination: 'Green Relief Dispensary', strainName: 'Silverhill Kush', status: 'Approved', date: '2024-03-20' },
  { id: 'MF-99282', destination: 'Bama Buds Wellness', strainName: 'Alabama Gold', status: 'Pending', date: '2024-03-21' },
  { id: 'MF-99283', destination: 'Gulf Coast Apothecary', strainName: 'Dixie Dream', status: 'Created', date: '2024-03-22' }
];

export const useAgDataSimulation = () => {
  const [plants, setPlants] = useState<SimulatedPlant[]>(INITIAL_PLANTS);
  const [manifests] = useState<TransferManifest[]>(INITIAL_MANIFESTS);
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toLocaleTimeString());
  const [isLive, setIsLive] = useState(true);

  const updateData = () => {
    setPlants((currentPlants) =>
      currentPlants.map((plant) => ({
        ...plant,
        metrics: {
          temperature: Number((77.8 + Math.random() * 0.4).toFixed(1)),
          humidity: Number((55 + Math.random() * 2).toFixed(1)),
          soilMoisture: Number((60 + Math.random() * 5).toFixed(1)),
          ec: Number((1.7 + Math.random() * 0.2).toFixed(2)),
          ph: Number((5.7 + Math.random() * 0.2).toFixed(1)),
        }
      }))
    );
    setLastUpdate(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(updateData, 3000);
    return () => clearInterval(interval);
  }, [isLive]);

  const triggerSnapshot = () => {
    updateData();
  };

  const toggleLive = () => {
    setIsLive(!isLive);
  };

  return { plants, manifests, lastUpdate, isLive, toggleLive, triggerSnapshot };
};
