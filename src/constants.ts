import { Equipment } from './types';

export const MOCK_EQUIPMENT: Equipment[] = [
  {
    id: '1',
    name: 'Excavator CAT 320',
    serialNumber: 'EX-001',
    currentSite: 'Downtown Plaza',
    supervisor: 'John Smith',
    lastUpdated: '2024-03-14 08:30',
  },
  {
    id: '2',
    name: 'Drilling Machine Hilti TE-70',
    serialNumber: 'DR-042',
    currentSite: 'West Side Bridge',
    lastUpdated: '2024-03-13 16:45',
  },
  {
    id: '3',
    name: 'Tower Crane Liebherr',
    serialNumber: 'CR-007',
    currentSite: 'Skyline Heights',
    supervisor: 'Robert Brown',
    lastUpdated: '2024-03-14 10:15',
  },
  {
    id: '4',
    name: 'Concrete Mixer Truck',
    serialNumber: 'MX-015',
    currentSite: 'Main Depot',
    lastUpdated: '2024-03-14 09:00',
  },
  {
    id: '5',
    name: 'Bulldozer D6',
    serialNumber: 'BZ-003',
    currentSite: 'Highway Expansion',
    supervisor: 'Mike Wilson',
    lastUpdated: '2024-03-12 14:20',
  },
];
