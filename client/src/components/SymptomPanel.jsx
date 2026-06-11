import { useState } from 'react';
import api from '../api/axios';

export default function SymptomPanel({ region, onSaved, onCancel }) {
  console.log('SymptomPanel region:', region);
  const [severity, setSeverity] = useState(5);
  const [category, setCategory] = useState('muscle');
  const [notes, setNotes]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/symptoms', {
  bodyRegion: region.bodyRegion,
  coords3D:   region.coords3D,
  severity,
  category,
  notes,
});
      onSaved();
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const severityColor = severity <= 3 ? 'text-green-400' :
                        severity <= 6 ? 'text-yellow-400' : 'text-red-400';

  const severityLabel = severity <= 3 ? 'Mild' :
                        severity <= 6 ? 'Moderate' : 'Severe';

  return (
    <div className="p-6 flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold text-lg">Log Symptom</h3>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-white text-xl transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Region */}
      <div className="bg-gray-800 rounded-xl px-4 py-3">
        <p className="text-gray-400 text-xs mb-1">Body Region</p>
        <p className="text-teal-400 font-semibold capitalize">
          {region.bodyRegion?.replace(/_/g, ' ') || 'Unknown region'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Severity Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-gray-400 text-sm">Severity</label>
            <span className={`font-bold text-lg ${severityColor}`}>
              {severity}/10 <span className="text-sm font-normal">({severityLabel})</span>
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={severity}
            onChange={e => setSeverity(Number(e.target.value))}
            className="w-full accent-teal-500"
          />
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>1 - Mild</span>
            <span>10 - Severe</span>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-gray-400 text-sm block mb-2">Category</label>
          <div className="grid grid-cols-3 gap-2">
            {['muscle', 'joint', 'skin', 'nerve', 'other'].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                  category === cat
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-gray-400 text-sm block mb-2">Notes</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Describe the pain or symptom..."
            rows={3}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 resize-none"
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Log'}
          </button>
        </div>

      </form>
    </div>
  );
}