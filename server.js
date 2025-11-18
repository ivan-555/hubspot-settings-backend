const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Fake-Speicher im RAM (nur für Test!)
const settingsStore = new Map(); // key: portalId, value: { sensorUrl }

// GET /hubspot/settings?portalId=123
app.get("/hubspot/settings", (req, res) => {
  const portalId = req.query.portalId;

  if (!portalId) {
    return res.status(400).json({ error: "portalId is required" });
  }

  const settings = settingsStore.get(portalId) || { sensorUrl: "" };
  return res.json(settings);
});

// POST /hubspot/settings  { portalId, sensorUrl }
app.post("/hubspot/settings", (req, res) => {
  const { portalId, sensorUrl } = req.body;

  if (!portalId || !sensorUrl) {
    return res
      .status(400)
      .json({ error: "portalId and sensorUrl are required" });
  }

  settingsStore.set(portalId, { sensorUrl });
  console.log("Saved settings for portal", portalId, "=>", sensorUrl);

  return res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Settings backend running on http://localhost:${port}`);
});
