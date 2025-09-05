const Transaction = require("../models/Transaction");
const { Op } = require("sequelize");

exports.addTransaction = async (req, res) => {
  try {
    const { amount, description, date, category } = req.body;
    const transaction = await Transaction.create({
      userId: req.user.id,
      amount,
      description,
      date,
      category
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { category, startDate, endDate } = req.query;

    const filter = { userId: req.user.id };
    if (category) filter.category = category;
    if (startDate && endDate) {
      filter.date = { [Op.between]: [startDate, endDate] };
    }

    const transactions = await Transaction.findAll({
      where: filter,
      order: [["date", "DESC"]],
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({ where: { id, userId: req.user.id } });
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    await transaction.update(req.body);
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({ where: { id, userId: req.user.id } });
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    await transaction.destroy();
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
