const express = require("express");
const bodyParser = require("body-parser");
const synapse = require("./synapse.js");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sucessfully Connected to Server
app.get("/api/server", (req, res) => {
  res.send({ express: "Successfully connected to server." });
});
app.get("/api/users", (req, res) => {
  synapse.getUser().then(function(result) {
    res.json(result.body.legal_names[0]);
  });
});
app.post("/api/messages", (req, res) => {
  synapse.getMessage(req.body.question).then(function(result) {
    res.json(result);
  });
});
const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
