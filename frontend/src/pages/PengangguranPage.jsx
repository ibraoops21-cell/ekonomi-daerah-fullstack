import { useEffect, useState } from 'react';
import api from '../api';

export default function PengangguranPage() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ tahun: '', kabupaten: '', tingkat_tpt: '' });
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  const load = async () => { const { data } = await api.get('/pengangguran'); setRows(data); };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/pengangguran', form);
      setForm({ tahun: '', kabupaten: '', tingkat_tpt: '' });
      load();
    } catch (err) { alert(err.response?.data?.error || err.message); }
  };

  const uploadCsv = async (e) => {
    e.preventDefault();
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    try {
      const { data } = await api.post('/pengangguran/csv', fd);
      setMsg(`✅ Berhasil: ${data.berhasil}/${data.totalDibaca} baris`);
      setFile(null);
      load();
    } catch (err) { setMsg(`❌ ${err.response?.data?.error || err.message}`); }
  };

  const del = async (id) => { if (!confirm('Hapus?')) return; await api.delete(`/pengangguran/${id}`); load(); };

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold mb-3">📝 Input Manual</h2>
        <form onSubmit={submit} className="grid grid-cols-2 gap-2">
          <input type="number" placeholder="Tahun *" required value={form.tahun} onChange={e=>setForm({...form,tahun:e.target.value})} className="border rounded px-2 py-1 text-sm" />
          <input placeholder="Kabupaten *" required value={form.kabupaten} onChange={e=>setForm({...form,kabupaten:e.target.value})} className="border rounded px-2 py-1 text-sm" />
          <input type="number" step="any" placeholder="Tingkat TPT (%) *" required value={form.tingkat_tpt} onChange={e=>setForm({...form,tingkat_tpt:e.target.value})} className="border rounded px-2 py-1 text-sm col-span-2" />
          <button className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Simpan</button>
        </form>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold mb-3">📂 Upload CSV</h2>
        <form onSubmit={uploadCsv} className="flex flex-col gap-2">
          <input type="file" accept=".csv" onChange={e=>setFile(e.target.files[0])} className="text-sm" />
          <p className="text-xs text-slate-500">Header: <code>tahun,kabupaten,tingkat_tpt</code></p>
          <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">Upload</button>
        </form>
        {msg && <p className="text-sm mt-2">{msg}</p>}
      </div>

      <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
        <h2 className="font-bold mb-3">📋 Data Pengangguran</h2>
        <table className="w-full text-sm">
          <thead className="bg-slate-100"><tr><th className="p-2 text-left">ID</th><th className="p-2 text-left">Tahun</th><th className="p-2 text-left">Kabupaten</th><th className="p-2 text-right">TPT (%)</th><th></th></tr></thead>
          <tbody>
            {rows.length === 0 ? <tr><td colSpan="5" className="text-center text-slate-400 py-4">Belum ada data</td></tr> :
              rows.map(r => (
                <tr key={r.id} className="border-b hover:bg-slate-50">
                  <td className="p-2 text-slate-400">{r.id}</td>
                  <td className="p-2">{r.tahun}</td>
                  <td className="p-2">{r.kabupaten}</td>
                  <td className="p-2 text-right">{r.tingkat_tpt}</td>
                  <td className="p-2 text-right"><button onClick={()=>del(r.id)} className="text-red-500 hover:text-red-700">×</button></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}