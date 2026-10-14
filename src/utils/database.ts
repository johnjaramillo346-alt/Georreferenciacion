import { CaptureRecord } from '../types/android';

const STORAGE_KEY = 'geocam_offline_records_v1';

export const INITIAL_SAMPLE_RECORDS: CaptureRecord[] = [
  {
    id: 'f83a42e1-92b1-4c2f-b408-8123a19088bc',
    createdAt: '2023-10-24T11:24:36.000Z',
    latitude: -0.6833,
    longitude: -78.4372,
    accuracyMeters: 8.2,
    altitudeMeters: 3890.5,
    photoPath: '/data/user/0/com.geocam.offline/files/captures/cotopaxi_geo_01.jpg',
    photoUri: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    note: 'Inspección técnica Estación Volcanológica Norte. Sensor barométrico en buen estado.',
    syncStatus: 'PENDING',
  },
  {
    id: 'a12c9842-11e2-419b-a3d8-9988221100aa',
    createdAt: '2023-10-23T16:10:05.000Z',
    latitude: 34.12345,
    longitude: -118.56789,
    accuracyMeters: 14.5,
    altitudeMeters: 128.0,
    photoPath: '/data/user/0/com.geocam.offline/files/captures/field_audit_02.jpg',
    photoUri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    note: 'Georreferenciación de subestación eléctrica secundaria. Coordenadas fijadas sin red.',
    syncStatus: 'SYNCED',
  },
  {
    id: '3d917f8e-4a8b-4a3d-8e7c-1234567890bb',
    createdAt: '2023-10-22T09:45:12.000Z',
    latitude: -12.04637,
    longitude: -77.04279,
    accuracyMeters: 28.4,
    altitudeMeters: 156.2,
    photoPath: '/data/user/0/com.geocam.offline/files/captures/pipe_leak_03.jpg',
    photoUri: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    note: 'Muestra de terreno en área forestal. Precisión GPS baja por sotobosque denso.',
    syncStatus: 'PENDING',
  }
];

export const loadRecordsFromStorage = (): CaptureRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_RECORDS));
      return INITIAL_SAMPLE_RECORDS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load records from storage', e);
    return INITIAL_SAMPLE_RECORDS;
  }
};

export const saveRecordsToStorage = (records: CaptureRecord[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save records to storage', e);
  }
};

export const formatCoordinates = (lat: number, lon: number): { latStr: string; lonStr: string } => {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';
  return {
    latStr: `${Math.abs(lat).toFixed(5)}° ${latDir}`,
    lonStr: `${Math.abs(lon).toFixed(5)}° ${lonDir}`,
  };
};

export const getAccuracyColor = (accuracyMeters: number) => {
  if (accuracyMeters < 15) {
    return {
      bg: 'bg-emerald-500/20',
      text: 'text-emerald-400',
      border: 'border-emerald-500/50',
      badge: 'bg-emerald-500',
      label: 'Excelente (<15m)',
      iconColor: '#10B981',
    };
  } else if (accuracyMeters <= 30) {
    return {
      bg: 'bg-amber-500/20',
      text: 'text-amber-400',
      border: 'border-amber-500/50',
      badge: 'bg-amber-500',
      label: 'Aceptable (15-30m)',
      iconColor: '#F59E0B',
    };
  } else {
    return {
      bg: 'bg-rose-500/20',
      text: 'text-rose-400',
      border: 'border-rose-500/50',
      badge: 'bg-rose-500',
      label: 'Baja (>30m)',
      iconColor: '#EF4444',
    };
  }
};
