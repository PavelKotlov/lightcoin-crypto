class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    if (this.transactions.length === 0) {
      return 0;
    }

    let balance = 0;
    for (const transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance.toFixed("2");
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;

  }

}

class Withdrawal extends Transaction {

  get value () {
    return -this.amount;
  }

  get isAllowed () {
    return (this.account.balance - this.amount >= 0);
  }

}

class Deposit extends Transaction {

  get value () {
    return this.amount;
  }

  get isAllowed() {
    return true;
  }

}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

console.log("new account created under username:", myAccount.username, "\n");

t1 = new Deposit(9.9999999999999999999, myAccount);
console.log(`user: ${myAccount.username} would like to deposit $${t1.amount}. processing.....`);
console.log(`transaction status: ${t1.commit() ? "success" : "failed"}`);
console.log(`user's account balance: $${myAccount.balance}\n`);

t2 = new Deposit(60, myAccount);
console.log(`user: ${myAccount.username} would like to deposit $${t2.amount}. processing.....`);
console.log(`transaction status: ${t2.commit() ? "success" : "failed"}`);
console.log(`user's account balance: $${myAccount.balance}\n`);

t3 = new Withdrawal(50.25, myAccount);
console.log(`user: ${myAccount.username} would like to withdraw $${t3.amount}. processing.....`);
console.log(`transaction status: ${t3.commit()  ? "success" : "failed"}`);
console.log(`user's account balance: $${myAccount.balance}\n`);

t4 = new Withdrawal(9.99, myAccount);
console.log(`user: ${myAccount.username} would like to withdraw $${t4.amount}. processing.....`);
console.log(`transaction status: ${t4.commit() ? "success" : "failed"}`);
console.log(`user's account balance: $${myAccount.balance}\n`);

t5 = new Deposit(120.00, myAccount);
console.log(`user: ${myAccount.username} would like to deposit $${t5.amount}. processing.....`);
console.log(`transaction status: ${t5.commit()  ? "success" : "failed"}`);
console.log(`user's account balance: $${myAccount.balance}\n`);

console.log(`user's transaction history YTD:\n`);
for (const transaction of myAccount.transactions) {
  console.log(transaction);
}
