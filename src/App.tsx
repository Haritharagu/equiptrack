/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Truck, 
  ArrowUpRight, 
  ArrowDownLeft, 
  LogOut, 
  Search, 
  Menu, 
  X,
  HardHat,
  MapPin,
  Calendar,
  User,
  Clock,
  ChevronRight,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Equipment, Page } from './types';
import { MOCK_EQUIPMENT } from './constants';

// --- Components ---

const Sidebar = ({ activePage, setActivePage, onLogout, isOpen, setIsOpen }: { 
  activePage: Page, 
  setActivePage: (p: Page) => void, 
  onLogout: () => void,
  isOpen: boolean,
  setIsOpen: (b: boolean) => void
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'equipment', label: 'Equipment', icon: Truck },
    { id: 'take', label: 'Take Equipment', icon: ArrowUpRight },
    { id: 'return', label: 'Return Equipment', icon: ArrowDownLeft },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={false}
        animate={{ x: isOpen ? 0 : -280 }}
        className="fixed top-0 left-0 bottom-0 w-64 bg-slate-900 text-white z-50 flex flex-col lg:translate-x-0"
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-emerald-500 p-2 rounded-lg">
            <HardHat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">EquipTrack</h1>
            <p className="text-xs text-slate-400">Construction Systems</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="ml-auto lg:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id as Page);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activePage === item.id 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};

const StatCard = ({ label, value, icon: Icon, colorClass }: { label: string, value: number | string, icon: any, colorClass: string }) => (
  <div className="industrial-card p-6 flex items-center gap-4">
    <div className={`p-3 rounded-xl ${colorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

// --- Pages ---

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
      >
        <div className="p-8 bg-slate-900 text-white flex flex-col items-center gap-4">
          <div className="bg-emerald-500 p-4 rounded-2xl shadow-lg shadow-emerald-500/30">
            <HardHat className="w-10 h-10" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">EquipTrack Login</h1>
            <p className="text-slate-400 text-sm mt-1">Supervisor Portal</p>
          </div>
        </div>
        
        <form className="p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500" defaultChecked />
            <label htmlFor="remember" className="text-sm text-slate-600">Remember session</label>
          </div>

          <button 
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform active:scale-[0.98]"
          >
            Login to Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const Dashboard = ({ equipment, onSearchSelect }: { equipment: Equipment[], onSearchSelect: (e: Equipment) => void }) => {
  const [search, setSearch] = useState('');
  
  const stats = useMemo(() => ({
    total: equipment.length,
  }), [equipment]);

  const filteredResults = useMemo(() => {
    if (!search.trim()) return [];
    return equipment.filter(e => 
      e.name.toLowerCase().includes(search.toLowerCase()) || 
      e.serialNumber.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, equipment]);

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
        <p className="text-slate-500">Welcome back, Supervisor. Here's the current status.</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <StatCard label="Total Equipment" value={stats.total} icon={Truck} colorClass="bg-blue-100 text-blue-600" />
      </div>

      <div className="relative">
        <div className="industrial-card p-6 space-y-4">
          <label className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-emerald-500" />
            Quick Equipment Search
          </label>
          <div className="relative">
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or serial number (e.g. EX-001)..."
              className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-lg"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-6 h-6" />
            </div>
          </div>

          <AnimatePresence>
            {search.trim() && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2 mt-4"
              >
                <p className="text-sm font-medium text-slate-500">Search Results ({filteredResults.length})</p>
                {filteredResults.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {filteredResults.map(item => (
                      <button
                        key={item.id}
                        onClick={() => onSearchSelect(item)}
                        className="flex items-center justify-between p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-xl transition-all group text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg bg-emerald-100 text-emerald-600`}>
                            <Truck className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{item.name}</p>
                            <p className="text-xs font-mono text-slate-500">{item.serialNumber}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-500">No equipment found matching "{search}"</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const BottomNav = ({ activePage, setActivePage }: { activePage: Page, setActivePage: (p: Page) => void }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'equipment', label: 'Equipment', icon: Truck },
    { id: 'take', label: 'Take', icon: ArrowUpRight },
    { id: 'return', label: 'Return', icon: ArrowDownLeft },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-1 z-50 flex justify-around items-center safe-area-bottom">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActivePage(item.id as Page)}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-[64px] ${
            activePage === item.id ? 'text-emerald-600' : 'text-slate-400'
          }`}
        >
          <item.icon className={`w-6 h-6 ${activePage === item.id ? 'scale-110' : ''} transition-transform`} />
          <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          {activePage === item.id && (
            <motion.div layoutId="activeTab" className="absolute -top-1 w-8 h-1 bg-emerald-500 rounded-full" />
          )}
        </button>
      ))}
    </nav>
  );
};

const EquipmentList = ({ equipment, onSelect }: { equipment: Equipment[], onSelect: (e: Equipment) => void }) => {
  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Equipment Inventory</h2>
          <p className="text-slate-500">Full list of equipment across all sites.</p>
        </div>
      </header>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {equipment.map((item) => (
          <button 
            key={item.id}
            onClick={() => onSelect(item)}
            className="industrial-card p-4 text-left active:bg-slate-50 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 leading-tight">{item.name}</p>
                  <p className="text-xs font-mono text-slate-500">{item.serialNumber}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{item.currentSite}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{item.lastUpdated.split(' ')[0]}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="industrial-card hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Equipment</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Serial Number</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Current Site</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Updated</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {equipment.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                      <Truck className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-sm text-slate-500">{item.serialNumber}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{item.currentSite}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{item.lastUpdated}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onSelect(item)}
                    className="text-emerald-600 hover:text-emerald-700 font-bold text-sm transition-colors"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const EquipmentDetails = ({ equipment, onTake, onReturn }: { equipment: Equipment, onTake: () => void, onReturn: () => void }) => {
  return (
    <div className="space-y-6">
      <header className="flex items-center gap-4">
        <div className={`p-4 rounded-2xl bg-emerald-100 text-emerald-600`}>
          <Truck className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{equipment.name}</h2>
          <p className="text-slate-500 font-mono">{equipment.serialNumber}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="industrial-card p-6 space-y-6">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Details</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Current Location</span>
              <div className="flex items-center gap-1.5 text-slate-900 font-medium">
                <MapPin className="w-4 h-4 text-slate-400" />
                {equipment.currentSite}
              </div>
            </div>
            {equipment.supervisor && (
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Last Supervisor</span>
                <div className="flex items-center gap-1.5 text-slate-900 font-medium">
                  <User className="w-4 h-4 text-slate-400" />
                  {equipment.supervisor}
                </div>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Last Activity</span>
              <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                <Clock className="w-4 h-4" />
                {equipment.lastUpdated}
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={onTake}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <ArrowUpRight className="w-5 h-5" />
              Take Equipment
            </button>
            <button 
              onClick={onReturn}
              className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2"
            >
              <ArrowDownLeft className="w-5 h-5" />
              Return Equipment
            </button>
          </div>
        </div>

        <div className="industrial-card p-6">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-4">Recent History</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative pl-6 border-l-2 border-slate-100 pb-6 last:pb-0">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-emerald-500" />
                <p className="text-sm font-bold text-slate-900">Moved to New Site</p>
                <p className="text-xs text-slate-500 mt-1">March {14 - i}, 2024 • 09:00 AM</p>
                <p className="text-xs text-slate-400 mt-2 italic">Supervisor: Robert Brown</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TakeEquipmentForm = ({ equipment, onSubmit }: { equipment?: Equipment, onSubmit: () => void }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">Take Equipment Form</h2>
        <p className="text-slate-500">Register equipment movement to a new site.</p>
      </header>

      <form className="industrial-card p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Supervisor Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Your Name" required />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Serial Number</label>
            <div className="relative">
              <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl outline-none" value={equipment?.serialNumber || ''} readOnly placeholder="Select equipment" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Current Location / Site</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" defaultValue={equipment?.currentSite || ''} placeholder="Type current location" required />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Destination Site</label>
            <div className="relative">
              <ChevronRight className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Type destination site" required />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Takeover Signature</label>
            <div className="relative">
              <CheckCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-serif italic" placeholder="Sign with your full name" required />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform active:scale-[0.98]"
        >
          Confirm Takeover
        </button>
      </form>
    </div>
  );
};

const ReturnEquipmentForm = ({ equipment, onSubmit }: { equipment?: Equipment, onSubmit: () => void }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">Return Equipment Form</h2>
        <p className="text-slate-500">Mark equipment as returned to site.</p>
      </header>

      <form className="industrial-card p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Serial Number</label>
          <div className="relative">
            <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="text" className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl outline-none" value={equipment?.serialNumber || ''} readOnly placeholder="Enter serial number" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Current Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Type current location" required />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Return Site Name</label>
            <div className="relative">
              <ChevronRight className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Type return site name" required />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Return Signature</label>
          <div className="relative">
            <CheckCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="text" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-500 font-serif italic" placeholder="Sign with your full name" required />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-rose-500/20 transition-all transform active:scale-[0.98]"
        >
          Confirm Return
        </button>
      </form>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(MOCK_EQUIPMENT);

  // Simple routing logic
  const renderPage = () => {
    if (selectedEquipment && activePage === 'dashboard') {
      return (
        <EquipmentDetails 
          equipment={selectedEquipment} 
          onTake={() => setActivePage('take')}
          onReturn={() => setActivePage('return')}
        />
      );
    }

    switch (activePage) {
      case 'dashboard':
        return <Dashboard equipment={equipmentList} onSearchSelect={(e) => setSelectedEquipment(e)} />;
      case 'equipment':
        return <EquipmentList equipment={equipmentList} onSelect={(e) => { setSelectedEquipment(e); setActivePage('dashboard'); }} />;
      case 'take':
        return <TakeEquipmentForm equipment={selectedEquipment || undefined} onSubmit={() => { setActivePage('dashboard'); setSelectedEquipment(null); }} />;
      case 'return':
        return <ReturnEquipmentForm equipment={selectedEquipment || undefined} onSubmit={() => { setActivePage('dashboard'); setSelectedEquipment(null); }} />;
      default:
        return <Dashboard equipment={equipmentList} onSearchSelect={(e) => setSelectedEquipment(e)} />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar 
        activePage={activePage} 
        setActivePage={(p) => { setActivePage(p); setSelectedEquipment(null); }} 
        onLogout={() => setIsLoggedIn(false)}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 lg:ml-64 p-4 md:p-8 lg:p-12 pb-24 lg:pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 p-1.5 rounded-lg">
                <HardHat className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-bold text-lg">EquipTrack</h1>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 active:bg-slate-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePage + (selectedEquipment?.id || '')}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <BottomNav activePage={activePage} setActivePage={(p) => { setActivePage(p); setSelectedEquipment(null); }} />
    </div>
  );
}
