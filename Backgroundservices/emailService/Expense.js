const dotenv = require('dotenv');
const sendMail = require('../helpers/sendMail');
const Expense = require('../models/Expense');

dotenv.config();

const expenseEmail = async () => {
  const expenses = await Expense.find();
  const totalExpense = expenses.reduce(
    (acc, expense) => acc + expense.value,
    0
  );
  if (totalExpense > 10000) {
    let messageOption = {
      from: process.env.EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: 'Your Expenses have blazed over 10.000$',
      text: `Your total expenses are ${totalExpense} please review your expenses!`,
    };
    await sendMail(messageOption);
  }
};

module.exports = expenseEmail;
