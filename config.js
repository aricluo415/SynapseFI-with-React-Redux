const Synapse = require("synapsenode");

const Client = Synapse.Client;

const env = {
  client_id: "client_id_gyhYP84kLrjOHpfoxXscaMSiv0I90q1zEeUTWbm2",
  client_secret: "client_secret_nBCRNOwclhX39ToYLzrmdxFJQItySKkM61Ug0Waf",
  fingerprint: "static_pin",
  ip_address: "127.0.0.1",
  // isProduction boolean determines if production (true) or sandbox (false) endpoint is used
  isProduction: false
};

const client = new Client(env);

module.exports = client;
