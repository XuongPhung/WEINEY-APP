let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');

function addTransaction() {
  const type = document.getElementById('type').value;
  const account = document.getElementById('account').value;
  const subAccount = document.getElementById('subAccount').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const note = document.getElementById('note').value;

  if (!type || !account || !subAccount || isNaN(amount)) {
    alert("Please fill out all fields correctly.");
    return;
  }

  const entry = {
    date: new Date().toLocaleString(),
    type,
    account,
    subAccount,
    amount: type.toLowerCase() === 'expense' ? -Math.abs(amount) : Math.abs(amount),
    note
  };

  transactions.push(entry);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  document.getElementById('status').innerText = "✅ Transaction saved!";
  displayTransactions();
  displayBalances();
}

function displayTransactions() {
  const list = document.getElementById('transactionList');
  list.innerHTML = '';
  transactions.forEach((t) => {
    list.innerHTML += `<li>${t.date} | ${t.type} | ${t.account}/${t.subAccount} | $${t.amount.toFixed(2)} | ${t.note}</li>`;
  });
}

function displayBalances() {
  const accountTotals = {};
  const subAccountTotals = {};

  transactions.forEach(t => {
    // Total by account
    if (!accountTotals[t.account]) accountTotals[t.account] = 0;
    accountTotals[t.account] += t.amount;

    // Total by sub-account
    const key = `${t.account}/${t.subAccount}`;
    if (!subAccountTotals[key]) subAccountTotals[key] = 0;
    subAccountTotals[key] += t.amount;
  });

  // Display account balances
  const accList = document.getElementById('accountBalances');
  accList.innerHTML = '';
  for (let acc in accountTotals) {
    accList.innerHTML += `<li><strong>${acc}</strong>: $${accountTotals[acc].toFixed(2)}</li>`;
  }

  // Display sub-account balances
  const subList = document.getElementById('subAccountBalances');
  subList.innerHTML = '';
  for (let sub in subAccountTotals) {
    subList.innerHTML += `<li>${sub}: $${subAccountTotals[sub].toFixed(2)}</li>`;
  }
}

displayTransactions();
displayBalances();
