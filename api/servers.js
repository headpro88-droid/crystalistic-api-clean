export default function handler(req, res) {
  try {
    // grab query params
    const min = parseFloat(req.query.min) || 0; // e.g. ?min=3.2
    const token = req.query.token;

    // 🔒 optional: check API_SECRET
    if (process.env.API_SECRET && token !== process.env.API_SECRET) {
      return res.status(403).json({ error: "Invalid token" });
    }

    // 💾 sample data for now (later bots will report in via /api/report)
    const fakeServers = [
      { id: "server-1", bestBrainrot: 1.8 },   // 1.8M/s
      { id: "server-2", bestBrainrot: 3.5 },   // 3.5M/s
      { id: "server-3", bestBrainrot: 5.0 }    // 5.0M/s
    ];

    // 📊 filter servers where bestBrainrot ≥ min
    const filtered = fakeServers.filter(s => s.bestBrainrot >= min);

    res.status(200).json({
      minRequired: min,
      count: filtered.length,
      servers: filtered
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
