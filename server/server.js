const express = require("express");
const bodyParser = require("body-parser");
const synapse = require("./synapse.js");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
