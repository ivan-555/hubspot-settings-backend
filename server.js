const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ type: "*/*" }));

// Fake-Speicher im RAM
const settingsStore = new Map(); // key: portalId, value: { sensorUrl }

// GET /hubspot/settings?portalId=123
app.get("/hubspot/settings", (req, res) => {
  const portalIdRaw = req.query.portalId;
  const portalId = String(portalIdRaw); // 🔑 immer als String

  console.log("GET /hubspot/settings, portalId =", portalId);

  if (!portalId) {
    return res.status(400).json({ error: "portalId is required" });
  }

  const settings = settingsStore.get(portalId) || { sensorUrl: "" };
  return res.json(settings);
});

// POST /hubspot/settings  { portalId, sensorUrl }
app.post("/hubspot/settings", (req, res) => {
  console.log("POST /hubspot/settings body:", req.body);

  const { portalId, sensorUrl } = req.body || {};
  const portalIdKey = String(portalId); // 🔑 hier auch String

  if (!portalId || !sensorUrl) {
    return res
      .status(400)
      .json({ error: "portalId and sensorUrl are required" });
  }

  settingsStore.set(portalIdKey, { sensorUrl });
  console.log("Saved settings for portal", portalIdKey, "=>", sensorUrl);

  return res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Settings backend running on port ${port}`);
});
