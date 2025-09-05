require("dotenv").config();
const { sequelize, User, Transaction } = require("./models"); // adjust path if needed
const bcrypt = require("bcryptjs");

const seed = async () => {
  try {
    // 1. Connect & sync DB
    await sequelize.sync({ force: true }); // drops tables and recreates
    console.log("Database synced");

    // 2. Create users
    const hashedPassword = await bcrypt.hash("123456", 10);

    const user1 = await User.create({
      fullName: "Test User",
      email: "testuser@example.com",
      password: hashedPassword,
    });

    const user2 = await User.create({
      fullName: "Demo User",
      email: "demo@example.com",
      password: hashedPassword,
    });

    // 3. Create transactions for user1
    const transactions = [
      {
        userId: user1.id,
        amount: 50000,
        description: "Salary",
        category: "Salary",
        date: "2025-08-01",
      },
      {
        userId: user1.id,
        amount: -5000,
        description: "Groceries",
        category: "Food",
        date: "2025-08-03",
      },
      {
        userId: user1.id,
        amount: -2000,
        description: "Transport",
        category: "Transport",
        date: "2025-08-04",
      },
      {
        userId: user1.id,
        amount: 2000,
        description: "Freelance",
        category: "Business",
        date: "2025-08-05",
      },
    ];

    await Transaction.bulkCreate(transactions);

    console.log("Seed data created successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
