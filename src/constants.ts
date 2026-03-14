import { Machine, Site } from './types';

export const MOCK_MACHINES: Machine[] = [
  {
    id: '1',
    name: 'Excavator CAT 320',
    code: 'EX-001',
    currentSite: 'Downtown Plaza',
    status: 'In Use',
    supervisor: 'John Smith',
    lastUpdated: '2024-03-14 08:30',
    expectedReturn: '2024-03-20',
  },
  {
    id: '2',
    name: 'Drilling Machine Hilti TE-70',
    code: 'DR-042',
    currentSite: 'West Side Bridge',
    status: 'Available',
    lastUpdated: '2024-03-13 16:45',
  },
  {
    id: '3',
    name: 'Tower Crane Liebherr',
    code: 'CR-007',
    currentSite: 'Skyline Heights',
    status: 'In Use',
    supervisor: 'Robert Brown',
    lastUpdated: '2024-03-14 10:15',
    expectedReturn: '2024-04-01',
  },
  {
    id: '4',
    name: 'Concrete Mixer Truck',
    code: 'MX-015',
    currentSite: 'Main Depot',
    status: 'Available',
    lastUpdated: '2024-03-14 09:00',
  },
  {
    id: '5',
    name: 'Bulldozer D6',
    code: 'BZ-003',
    currentSite: 'Highway Expansion',
    status: 'In Use',
    supervisor: 'Mike Wilson',
    lastUpdated: '2024-03-12 14:20',
    expectedReturn: '2024-03-18',
  },
];

export const MOCK_SITES: Site[] = [
  { id: '1', name: 'Downtown Plaza' },
  { id: '2', name: 'West Side Bridge' },
  { id: '3', name: 'Skyline Heights' },
  { id: '4', name: 'Highway Expansion' },
  { id: '5', name: 'Main Depot' },
];
