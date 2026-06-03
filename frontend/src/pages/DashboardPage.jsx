import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import api from '../api';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

export default function DashboardPage() {
  const [pdrb, setPdrb] = useState([]);
  const [kemiskinan, setKemiskinan] = useState([]);
  const [pengangguran, setPengangguran] = useState([]);

  useEffect(() => {
    api.get('/pdrb').then(r => setPdrb(r.data));
    api.get('/kemiskinan').then(r => setKemiskinan(r.data));
    api.get('/pengangguran').then(r => setPengangguran(r.data));
  }, []);

  const totalPdrb = pdrb.reduce((s, r) => s + r.nilai_pdrb, 0);
  const avgKemiskinan = kemiskinan.length ? (kemiskinan.reduce((s, r) => s + r.persentase, 0) / kemiskinan.length).toFixed(2) : 0;
  const avgTpt = pengangguran.length ? (pengangguran.reduce((s, r) => s + r.tingkat_tpt, 0) / pengangguran.length).toFixed(2) : 0;

  const pdrbBySektor = {};
  pdrb.forEach(r => { pdrbBySektor[r.sektor] = (pdrbBySektor[r.sektor] || 0) + r.nilai_pdrb; });
  const pdrbChart = {
    labels: Object.keys(pdrbBySektor),
    datasets: [{ label: 'Total PDRB per Sektor', data: Object.values(pdrbBySektor), backgroundColor: '#2563eb', borderRadius: 6 }],
  };

  const kemiskinanChart = {
    labels: kemiskinan.map(r => `${r.kabupaten} ${r.tahun}`),
    datasets: [{ label: 'Persentase Kemiskinan (%)', data: kemiskinan.map(r => r.persentase), backgroundColor: '#dc2626', borderRadius: 6 }],
  };

  const pengangguranChart = {
    labels: pengangguran.map(r => `${r.kabupaten} ${r.tahun}`),
    datasets: [{ label: 'TPT (%)', data: pengangguran.map(r => r.tingkat_tpt), borderColor: '#f59e0b', backgroundColor: '#fbbf24', tension: 0.3, pointRadius: 5, pointBackgroundColor: '#f59e0b' }],
  };

  const chartOptions = { responsive: true, plugins: { legend: { position: 'top' } } };

  const StatCard = ({ icon, label, value, sub, color }) => (
    <div className={`bg-gradient-to-br ${color} text-white p-5 rounded-xl shadow-md`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl">{icon}</span>
        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{sub}</span>
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm opacity-90 mt-1">{label}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          icon="💰"
          label="Total PDRB (semua data)"
          value={totalPdrb.toLocaleString('id-ID')}
          sub={`${pdrb.length} entri`}
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          icon="🏠"
          label="Rata-rata Kemiskinan"
          value={`${avgKemiskinan}%`}
          sub={`${kemiskinan.length} entri`}
          color="from-red-500 to-red-600"
        />
        <StatCard
          icon="👷"
          label="Rata-rata TPT"
          value={`${avgTpt}%`}
          sub={`${pengangguran.length} entri`}
          color="from-amber-500 to-orange-600"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-md border border-slate-100">
          <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">💰 PDRB per Sektor</h3>
          {pdrb.length ? <Bar data={pdrbChart} options={chartOptions} /> : <p className="text-slate-400 text-sm text-center py-8">Belum ada data — input dulu di tab PDRB</p>}
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md border border-slate-100">
          <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">🏠 Persentase Kemiskinan</h3>
          {kemiskinan.length ? <Bar data={kemiskinanChart} options={chartOptions} /> : <p className="text-slate-400 text-sm text-center py-8">Belum ada data — input dulu di tab Kemiskinan</p>}
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md border border-slate-100 lg:col-span-2">
          <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">👷 Tingkat Pengangguran Terbuka (TPT)</h3>
          {pengangguran.length ? <Line data={pengangguranChart} options={chartOptions} /> : <p className="text-slate-400 text-sm text-center py-8">Belum ada data — input dulu di tab Pengangguran</p>}
        </div>
      </div>
    </div>
  );
}