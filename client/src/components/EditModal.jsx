import { useState } from 'react';
import api from '../api/axios';

export default function EditModal({ log, onClose, onSaved }) {
  const [severity, setSeverity] = useState(log.severity);
  const [category, setCategory] = useState(log.category);
  const [notes, setNotes]       = useState(log.notes);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.put(`/symptoms/${log._id}`, { severity, category, notes });
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold text-lg">Edit Symptom</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl">✕</button>
        </div>

        {/* Region (read only) */}
        <div className="bg-gray-800 rounded-xl px-4 py-3 mb-5">
          <p className="text-gray-400 text-xs mb-1">Body Region</p>
          <p className="text-teal-400 font-semibold capitalize">
            {log.bodyRegion?.replace(/_/g, ' ')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Severity */}
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
              rows={3}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 resize-none"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}