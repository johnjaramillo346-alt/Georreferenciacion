export interface CaptureRecord {
  id: string; // UUID
  createdAt: string; // ISO 8601 Timestamp (e.g., "2023-10-24T11:24:36Z")
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  altitudeMeters: number | null;
  photoPath: string; // Internal storage path e.g. "/data/user/0/com.geocam.offline/files/captures/cap_1698146676.jpg"
  photoUri?: string; // Data URL or Blob URL for rendering image preview in simulator
  note: string | null;
  syncStatus: 'PENDING' | 'SYNCED';
}

export interface GpsLocation {
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  altitudeMeters: number | null;
  timestamp: number;
}

export interface KotlinFile {
  id: string;
  name: string;
  path: string;
  category: 'gradle' | 'domain' | 'data' | 'di' | 'location' | 'camera' | 'ui' | 'viewmodel';
  description: string;
  code: string;
}

export type AppScreen = 'new_capture' | 'history' | 'detail';
export type AppTab = 'simulator' | 'code' | 'dependencies' | 'structure' | 'guide';
