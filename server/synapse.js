const client = require("./config");

const options = {
  user_id: "5d3134868384540c2edacc79",
  device2FA: "device@synapsefi.com",
  validationPin: "123456",
  achUsNodeID: "5d31356ea4399b3a3cad2ff8",
  user: ""
};
//Get User
exports.getUser = getUser = async function() {
  const user_id = await client.getUser(options.user_id);
  const body = {
    type: "ACH-US",
    info: {
      bank_id: "synapse_good",
      bank_pw: "test1234",
      bank_name: "fake"
    }
  };
  //Link a test bank account
  const bankLogin = await user_id.createNode(body);
  const accessToken = bankLogin.data.mfa.access_token;
  const mfaAnswer = bankLogin.data.mfa.message;
  const login = await user_id.verifyAchMfa(accessToken, "test_answer");
  return user_id;
};
//Get Node Info
getNode = async function(node_id) {
  var user = await getUser();
  return user.getNode(node_id);
};
//Get all the Users Nodes
getAllUserNodes = async function(typeNode) {
  var user = await getUser();
  return user.getAllUserNodes({ page: 1, per_page: 5, type: typeNode });
};
//Get all Users Transactions
getUserTransactions = async function() {
  var user = await getUser();
  return user.getUserTransactions();
};
//Get all Node Transactions
getAllNodeTransactions = async function(node_id) {
  var user = await getUser();
  var transactions = user.getAllNodeTransactions(node_id);
  return transactions;
};

//Custom functions
//
//
//Used by other functions
//Returns the node_id given the nickname of the node
getNodeByNickname = async function(question) {
  var allNodes = await getAllUserNodes();
  var allUserNodes = allNodes.data.nodes;

  for (var i = 0; i < allUserNodes.length; i++) {
    if (question.includes(allUserNodes[i].info.nickname.toLowerCase())) {
      return allUserNodes[i]._id;
    }
  }
};
//
//
//
//Returns total balance
getTotalBalance = async function() {
  const allUserNodes = await getAllUserNodes("ACH-US");
  const accounts = allUserNodes.data.nodes;
  var balance = [];
  var total_balance = 0.0;
  for (var i = 0; i < accounts.length; i++) {
    balance.push(
      accounts[i].info.nickname + ": $" + accounts[i].info.balance["amount"]
    );
    total_balance = total_balance + parseFloat(accounts[i].info.balance.amount);
  }
  balance.push("Total Balance: $" + total_balance.toFixed(2));

  return balance.join("\n");
};
//
//
//
//
//
//Return List of nodes ie accounts linked
getListOfNodes = async function() {
  const userAllNodes = await getAllUserNodes();
  const userNodes = userAllNodes.data.nodes;

  return userNodes;
};
getNodes = async function() {
  var listOfNodes = await getListOfNodes();
  var response = listOfNodes
    .map(function(node) {
      return node.info.nickname;
    })
    .join("\n");
  return response;
};
//
//
//
//Returns transactions minus budget
fakeData = {
  budget: 1600.0
};
getCurrentBudget = async function() {
  var totalSpend = await getTotalTransactions();
  return fakeData.budget - totalSpend;
};
//Get Budget navigator
getBudget = async function(question) {
  //Set Budget
  if (question.includes("set")) {
    return await setBudget(question);
  }
  //Current Budget
  else if (question.includes("current")) {
    var response = await getCurrentBudget();
    return "Your current budget is: $" + response;
  }
  //Total Budget Set
  else {
    return await getTotalBudget();
  }
};
//Set Budget
setBudget = async function(question) {
  var newBudget = question.replace(/[^0-9.]/g, "");
  fakeData.budget = newBudget;
  return "Your new budget is $" + fakeData.budget;
};
//Your Total Budget that you set
getTotalBudget = async function() {
  return "Your current budget is $" + fakeData.budget;
};
//
//
//
//Choose which spend function
getSpend = async function(question) {
  //Check if you can spend $X Amount
  if (hasNumber(question)) {
    var response = await getCheckSpend(question);
    return response;
  }
  //Check how much you spent on node/account X
  else if (question.includes("on") || question.includes("with")) {
    var nodeTransactions = await getTransactionsForHelper(question);
    var response = await getTransactionsForToString(nodeTransactions);
    return response;
  }
  //Return the total amount you spent on all accounts
  else {
    var response = await getTotalTransactions();
    return "You spent a total of: $" + response;
  }
};
//check if string has number
function hasNumber(myString) {
  return /\d/.test(myString);
}
//Check if transactions exceed budget
getCheckSpend = async function(question) {
  var spend = parseFloat(question.replace(/[^0-9.]/g, ""));
  var budget = await getCurrentBudget();
  var newBudget = budget - spend;
  if (newBudget > 0) {
    return "Yes you'll have $" + newBudget.toFixed(2) + " left in your budget";
  } else {
    return "No you don't have enough in your budget";
  }
};
//Gets the total amount of transactions from all nodes
getTotalTransactions = async function() {
  var userTransactions = await getUserTransactions();
  var transactions = userTransactions.data.trans;
  var total_spend = 0;
  for (var i = 0; i < transactions.length; i++) {
    if (
      options.user_id == transactions[i].from.user._id &&
      transactions[i].recent_status.status != "CANCELED"
    ) {
      total_spend += transactions[i].amount.amount;
    }
  }
  return total_spend.toFixed(2);
};
//Gets the list of transactions by nickname
getTransactionsForHelper = async function(question) {
  node_id = await getNodeByNickname(question);
  var allNodeTransactions = await getAllNodeTransactions(node_id);
  var nodeTransactions = allNodeTransactions.data.trans;

  return nodeTransactions;
};
//Converts the list of transactions to a string
getTransactionsForToString = async function(nodeTransactions) {
  var listOfTransactions = [];
  var totalSpent = 0.0;
  for (var j = 0; j < nodeTransactions.length; j++) {
    if (nodeTransactions[j].recent_status.status != "CANCELED") {
      listOfTransactions.push(
        "To:" +
          nodeTransactions[j].to.user.legal_names +
          ": $" +
          nodeTransactions[j].amount.amount
      );
      totalSpent = totalSpent + parseFloat(nodeTransactions[j].amount.amount);
    }
  }
  if (listOfTransactions.length == 0) {
    return "No transactions";
  }
  listOfTransactions.push("Total spent: $" + totalSpent.toFixed(2));
  return listOfTransactions.join("\n");
};
//
//
//
//Get Savings Account
getSavings = async function() {
  const nodes = await getAllUserNodes("ACH-US");
  const bankAccounts = nodes.data.nodes;
  const response = [];
  for (var i = 0; i < bankAccounts.length; i++) {
    if (bankAccounts[i].info.class == "SAVINGS") {
      response.push(
        bankAccounts[i].info.nickname +
          ": \nBalance: $" +
          bankAccounts[i].info.balance.amount
      );
    }
  }
  return response.join("\n");
};
//Get Checkings Account
getCheckings = async function() {
  const nodes = await getAllUserNodes("ACH-US");
  const bankAccounts = nodes.data.nodes;
  const response = [];
  for (var i = 0; i < bankAccounts.length; i++) {
    if (bankAccounts[i].info.class == "CHECKING") {
      response.push(
        bankAccounts[i].info.nickname +
          ": \nBalance: $" +
          bankAccounts[i].info.balance.amount
      );
    }
  }
  return response.join("\n");
};
//Return the resposne to the question
exports.getMessage = getMessage = async function(question1) {
  var response = "";

  const question = question1.toLowerCase();
  if (question.includes("spend")) {
    response = await getSpend(question);
    return { answer: response };
  } else if (question.includes("budget")) {
    response = await getBudget(question);
    return { answer: response };
  } else if (question.includes("nodes")) {
    response = await getNodes();
    return { answer: response };
  } else if (question.includes("savings")) {
    response = await getSavings();
    return { answer: response };
  } else if (question.includes("checkings")) {
    response = await getCheckings();
    return { answer: response };
  } else if (question.includes("balance")) {
    response = await getTotalBalance();
    return { answer: response };
  }
  return { answer: "" };
};
