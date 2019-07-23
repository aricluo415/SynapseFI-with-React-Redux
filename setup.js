const synapse = require["./synapse"];
//SET UP USER
exports.createTransaction = createTransaction = async function(
  amount,
  node_id
) {
  var user = await synapse.getUser();
  user
    .createTransaction(node_id, {
      to: {
        type: "INTERCHANGE-US",
        id: "5bd2b691dc00d56658258222"
      },
      amount: {
        amount: amount,
        currency: "USD"
      },
      extra: {
        ip: "127.0.0.1",
        note: "Test transaction"
      }
    })
    .then(({ data }) => {
      return data;
    });
};
//Update documents for user
exports.updateDocument = updateDocument = async function() {
  const body = {
    documents: [
      {
        email: "test@test.com",
        phone_number: "415.932.9998",
        ip: "::1",
        name: "Test User",
        alias: "Test",
        entity_type: "M",
        entity_scope: "Arts & Entertainment",
        day: 2,
        month: 5,
        year: 1989,
        address_street: "933 Garfield Street",
        address_city: "SF",
        address_subdivision: "CA",
        address_postal_code: "94132",
        address_country_code: "US",
        virtual_docs: [
          {
            document_value: "2222",
            document_type: "SSN"
          }
        ],
        physical_docs: [
          {
            document_value: "data:image/gif;base64,SUQs==",
            document_type: "GOVT_ID"
          }
        ],
        social_docs: [
          {
            document_value: "https://www.facebook.com/valid",
            document_type: "FACEBOOK"
          }
        ]
      }
    ]
  };
  user = await synapse.getUser();
  user.addUserKyc(body).catch(err => {
    //console.log(err.response.data);
  });
  //console.log("done");
};
const pubkey =
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzxVLeRTf77kmG/42SdjjtRfaI/7GN4UoUBfxzN80gCyrjK+tHYJR7DKefC47fNyA2dGU7x3tu1wQRKOkjschbC3ZWF1mCqccUiHRPiGhH9VBsxLbAUCFAKOPZcBDCT7IhUdd6S23e99ewkb0c6pRk28u+kz+7ZB7d6Z/S+Em316zs0HqEnEaoUNFXtdTyW3EPuaqo0+p9daICRC44VbrTlzc+Y1A/CsiOcCCl4ske8scu/fWg0K3nybfn7IdO2smkzRwwGOc4uexBMnAkAyl0eQrqXZO4vis6ktmLFV4NpYsd0U2vvmuXFoA9XBcJHdbAww/TGwHq5RJ3505QSEK8QIDAQAB";

//Create Node Info
exports.createNode = createNode = async function() {
  var user = await synapse.getUser();
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzxVLeRTf77kmG/42SdjjtRfaI/7GN4UoUBfxzN80gCyrjK+tHYJR7DKefC47fNyA2dGU7x3tu1wQRKOkjschbC3ZWF1mCqccUiHRPiGhH9VBsxLbAUCFAKOPZcBDCT7IhUdd6S23e99ewkb0c6pRk28u+kz+7ZB7d6Z/S+Em316zs0HqEnEaoUNFXtdTyW3EPuaqo0+p9daICRC44VbrTlzc+Y1A/CsiOcCCl4ske8scu/fWg0K3nybfn7IdO2smkzRwwGOc4uexBMnAkAyl0eQrqXZO4vis6ktmLFV4NpYsd0U2vvmuXFoA9XBcJHdbAww/TGwHq5RJ3505QSEK8QIDAQAB"
  );
  var encryptedCardNumber = encrypt.encrypt("9401113999999995");
  var encryptedExpDate = encrypt.encrypt("202002");
  const body = {
    type: "INTERCHANGE-US",
    info: {
      nickname: "Credit Card",
      card_number: encryptedCardNumber,

      exp_date: encryptedExpDate,
      document_id:
        "5836c4e4d2b298127c57981a4b05b193f631ba3053ece910ff9f42b2fc72d9dd"
    }
  };
  //console.log("haha");
  user.createNode(body).catch(err => {
    //console.log("error creating node", err.response.data);
  });
};
