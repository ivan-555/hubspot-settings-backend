const express = require("express");
const cors = require("cors");
const rgPortal = require("./rg-portal.json");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ type: "*/*" }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/hubspot/rg-portal", (req, res) => {
  console.log("GET /hubspot/rg-portal");
  res.json(rgPortal);
});
