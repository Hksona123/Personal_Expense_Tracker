// src/pages/Transactions.jsx
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import API from "../utils/api"; 
import "./Transactions.css"; // import plain CSS

const categories = [
  "Salary",
  "Business",
  "Food",
  "Transport",
  "Shopping",
  "Health",
  "Entertainment",
  "Other",
];

const COLORS = [
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#6366F1",
  "#EC4899",
  "#14B8A6",
  "#6B7280",
];

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: "",
    category: categories[0],
  });
  const [editId, setEditId] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTransactions = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await API.get("/transactions");
      setTransactions(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validateForm = () => {
    if (form.amount === "" || form.description.trim() === "" || form.date === "") {
      setError("Please fill in amount, description and date.");
      return false;
    }
    const amountNum = Number(form.amount);
    if (Number.isNaN(amountNum)) {
      setError("Amount must be a valid number.");
      return false;
    }
    if (amountNum === 0) {
      setError("Amount cannot be zero.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      amount: Number(form.amount),
      description: form.description.trim(),
      date: form.date,
      category: form.category,
    };

    setLoading(true);
    try {
      if (editId) {
        await API.put(`/transactions/${editId}`, payload);
        setEditId(null);
      } else {
        await API.post("/transactions", payload);
      }
      setForm({ amount: "", description: "", date: "", category: categories[0] });
      fetchTransactions();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save transaction.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tx) => {
    setEditId(tx.id);
    setForm({
      amount: String(tx.amount),
      description: tx.description,
      date: tx.date ? tx.date.split("T")[0] : "",
      category: tx.category || categories[0],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;
    setLoading(true);
    try {
      await API.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete transaction.");
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions
    .filter((tx) => (filters.category ? tx.category === filters.category : true))
    .filter((tx) => (filters.startDate ? new Date(tx.date) >= new Date(filters.startDate) : true))
    .filter((tx) => (filters.endDate ? new Date(tx.date) <= new Date(filters.endDate) : true))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalIncome = filteredTransactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalExpense = filteredTransactions.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome + totalExpense;

  const pieData = categories
    .map((cat) => {
      const value = filteredTransactions.filter((t) => t.category === cat).reduce((s, t) => s + t.amount, 0);
      return { name: cat, value: Math.abs(value) };
    })
    .filter((d) => d.value > 0);

  return (
    <div className="transactions-container">
      <h1 className="page-title">Transactions</h1>

      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-label">Total Income</div>
          <div className="summary-value income">₹{totalIncome.toFixed(2)}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Total Expenses</div>
          <div className="summary-value expense">₹{Math.abs(totalExpense).toFixed(2)}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Balance</div>
          <div className="summary-value balance">₹{balance.toFixed(2)}</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="transaction-form">
        <h2>{editId ? "Edit Transaction" : "Add Transaction"}</h2>
        {error && <div className="error-msg">{error}</div>}
        <div className="form-grid">
          <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" />
          <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description" />
          <input type="date" name="date" value={form.date} onChange={handleChange} />
          <select name="category" value={form.category} onChange={handleChange}>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading}>{editId ? "Update" : "Add"}</button>
          {editId && <button type="button" onClick={() => setEditId(null)}>Cancel</button>}
        </div>
      </form>

      <div className="filters">
        <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="date" value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} />
        <input type="date" value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} />
        <button type="button" onClick={() => setFilters({ category: "", startDate: "", endDate: "" })}>Reset</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th><th>Description</th><th>Category</th><th>Amount</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr><td colSpan="5">No transactions found</td></tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{(tx.date || "").split("T")[0]}</td>
                  <td>{tx.description}</td>
                  <td>{tx.category}</td>
                  <td className={tx.amount > 0 ? "income" : "expense"}>₹{tx.amount.toFixed(2)}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(tx)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(tx.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="chart-card">
        <h2>Breakdown by Category</h2>
        {pieData.length === 0 ? (
          <div>No data to display</div>
        ) : (
          <div className="chart">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
