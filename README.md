# instaMoneyDashboard


Browser app om status in te zien van transacties


Rekening overzichten:

/bank/bank-nl/internal-accounts

/bank/bank-nl/customer-accounts

/bank/bank-aus/

/accounts/<account-id>


Datamodel details:

account: { balance:400,transactions: []}

transaction: { from: <account-id>, to: <account-id>, amount: 300.10, cur: EUR, state: booked }


Transaction states: requested, booked

Cur: EUR, AUS


