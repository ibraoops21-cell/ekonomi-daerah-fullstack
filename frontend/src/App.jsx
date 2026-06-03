import { useState } from 'react';
import PdrbPage from './pages/PdrbPage';
import KemiskinanPage from './pages/KemiskinanPage';
import PengangguranPage from './pages/PengangguranPage';
import DashboardPage from './pages/DashboardPage';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'pdrb', label: 'PDRB', icon: '💰' },
  { id: 'kemiskinan', label: 'Kemiskinan', icon: '🏠' },
  { id: 'pengangguran', label: 'Pengangguran', icon: '👷' },
];

export default function App() {
  const [tab, setTab] = useState('dashboard');
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg text-2xl">📊</div>
              <div>
                <h1 className="text-xl font-bold leading-tight">Database Ekonomi Daerah</h1>
                <p className="text-xs text-blue-100">PDRB · Kemiskinan · Pengangguran</p>
              </div>
            </div>
            <span className="hidden md:block text-xs bg-white/10 px-3 py-1 rounded-full">v1.0</span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto w-full px-4 py-6 flex-1">
        <div className="flex gap-1 bg-white p-1 rounded-lg shadow-sm border mb-6 overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${
                tab === t.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {tab === 'dashboard' && <DashboardPage />}
        {tab === 'pdrb' && <PdrbPage />}
        {tab === 'kemiskinan' && <KemiskinanPage />}
        {tab === 'pengangguran' && <PengangguranPage />}
      </div>

      <footer className="bg-slate-800 text-slate-300 text-center py-4 text-sm">
        <p>© 2026 Database Ekonomi Daerah · React + Express + PostgreSQL + Prisma</p>
      </footer>
    </div>
  );
}