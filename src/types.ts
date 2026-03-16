export interface Equipment {
  id: string;
  name: string;
  serialNumber: string;
  currentSite: string;
  supervisor?: string;
  lastUpdated: string;
}

export type Page = 'dashboard' | 'equipment' | 'take' | 'return' | 'login';
