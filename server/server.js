const express = require("express");
const bodyParser = require("body-parser");
const synapse = require("./synapse.js");
const path = require('path');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});
app.get("/api/users", (req, res) => {
  synapse.getUser().then(function (result) {
    res.json(result.body.legal_names[0]);
  });
});
app.post("/api/messages", (req, res) => {
  synapse.getMessage(req.body.question).then(function (result) {
    res.json(result);
  });
});
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
