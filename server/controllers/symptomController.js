const SymptomLog = require('../models/SymptomLog');

exports.getLogs = async (req, res) => {
  try {
    const logs = await SymptomLog.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.createLog = async (req, res) => {
  const { bodyRegion, coords3D, severity, category, notes } = req.body;
  try {
    const log = new SymptomLog({
      user: req.user.id,
      bodyRegion,
      coords3D,
      severity,
      category,
      notes,
    });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.deleteLog = async (req, res) => {
  try {
    const log = await SymptomLog.findById(req.params.id);
    if (!log) return res.status(404).json({ msg: 'Log not found' });
    if (log.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });
    await log.deleteOne();
    res.json({ msg: 'Log removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
exports.updateLog = async (req, res) => {
  const { severity, category, notes } = req.body;
  try {
    const log = await SymptomLog.findById(req.params.id);
    if (!log) return res.status(404).json({ msg: 'Log not found' });
    if (log.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    log.severity = severity ?? log.severity;
    log.category = category ?? log.category;
    log.notes    = notes ?? log.notes;
    await log.save();
    res.json(log);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const logs = await SymptomLog.find({ user: req.user.id });
    if (!logs.length) return res.json({ msg: 'No logs found' });

    const regionCount = {};
    let totalSeverity = 0;

    logs.forEach(log => {
      regionCount[log.bodyRegion] = (regionCount[log.bodyRegion] || 0) + 1;
      totalSeverity += log.severity;
    });

    const mostAffected = Object.entries(regionCount)
      .sort((a, b) => b[1] - a[1])[0][0];

    res.json({
      totalLogs: logs.length,
      averageSeverity: (totalSeverity / logs.length).toFixed(1),
      mostAffectedRegion: mostAffected,
      regionBreakdown: regionCount,
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};