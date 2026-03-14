export type MachineStatus = 'Available' | 'In Use';

export interface Machine {
  id: string;
  name: string;
  code: string;
  currentSite: string;
  status: MachineStatus;
  supervisor?: string;
  lastUpdated: string;
  expectedReturn?: string;
}

export interface Site {
  id: string;
  name: string;
}

export type Page = 'dashboard' | 'machines' | 'take' | 'return' | 'login';
