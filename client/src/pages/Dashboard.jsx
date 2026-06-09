import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BodyModel from '../components/BodyModel';
import SymptomPanel from '../components/SymptomPanel';
import api from '../api/axios';

export default function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [logs, setLogs]                     = useState([]);
  const [summary, setSummary]               = useState(null);

  const fetchLogs = async () => {
    try {
      const res = await api.get('/symptoms');
      setLogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await api.get('/symptoms/summary');
      setSummary(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLogs();
    fetchSummary();
  }, []);

  const handleBodyClick = (data) => {
    setSelectedRegion(data);
  };

  const handleLogSaved = () => {
    setSelectedRegion(null);
    fetchLogs();
    fetchSummary();
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">

        {/* 3D Body Model */}
        <div className="flex-1 relative">
          <BodyModel onBodyClick={handleBodyClick} logs={logs} />
          {!selectedRegion && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 text-gray-400 text-sm px-4 py-2 rounded-full">
              Click any body region to log a symptom
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col overflow-y-auto">

          {/* Symptom Panel or Summary */}
          {selectedRegion ? (
            <SymptomPanel
              region={selectedRegion}
              onSaved={handleLogSaved}
              onCancel={() => setSelectedRegion(null)}
            />
          ) : (
            <div className="p-6 space-y-6">

              {/* Summary Cards */}
              {summary && !summary.msg && (
                <div className="space-y-3">
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Summary</h3>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <p className="text-gray-400 text-xs">Total Logs</p>
                    <p className="text-white text-2xl font-bold">{summary.totalLogs}</p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <p className="text-gray-400 text-xs">Avg Severity</p>
                    <p className="text-teal-400 text-2xl font-bold">{summary.averageSeverity}<span className="text-gray-500 text-sm">/10</span></p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <p className="text-gray-400 text-xs">Most Affected</p>
                    <p className="text-white text-sm font-semibold capitalize">{summary.mostAffectedRegion?.replace('_', ' ')}</p>
                  </div>
                </div>
              )}

              {/* Recent Logs */}
              <div className="space-y-3">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Recent Logs</h3>
                {logs.length === 0 ? (
                  <p className="text-gray-500 text-sm">No logs yet. Click the body model to start!</p>
                ) : (
                  logs.slice(0, 5).map(log => (
                    <div key={log._id} className="bg-gray-800 rounded-xl p-4">
                      <div className="flex justify-between items-start">
                        <p className="text-white text-sm font-medium capitalize">{log.bodyRegion?.replace('_', ' ')}</p>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          log.severity <= 3 ? 'bg-green-900 text-green-400' :
                          log.severity <= 6 ? 'bg-yellow-900 text-yellow-400' :
                          'bg-red-900 text-red-400'
                        }`}>
                          {log.severity}/10
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs mt-1 capitalize">{log.category}</p>
                      {log.notes && <p className="text-gray-400 text-xs mt-1">{log.notes}</p>}
                    </div>
                  ))
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}