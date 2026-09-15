import { useState, useEffect } from 'react';
import "./Expense.css"; 

export default function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem('token');

  // 1. Fetch expenses from backend on load with auth header
  const fetchExpenses = () => {
    fetch('http://localhost:5000/api/expenses', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error('Error fetching expenses:', err));
  };

  useEffect(() => {
    fetchExpenses();
  }, [token]);

  // 2. Handle delete from backend with auth header
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  // 3. Populate form fields when Edit is clicked
  const handleEditClick = (expense) => {
    setEditId(expense._id);
    setName(expense.name);
    setAmount(expense.amount);
    setCategory(expense.category || '');
    setDate(expense.date ? expense.date.substring(0, 10) : '');
  };

  // 4. Handle Form Submit (Handles both Create and Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseData = {
        name,
        amount: Number(amount),
        category: category || "General",
        date: date || new Date().toISOString().split('T')[0]
      };

      if (editId) {
        // UPDATE existing expense (Fixed backticks here)
        const response = await fetch(`http://localhost:5000/api/expenses/${editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(expenseData)
        });
        if (!response.ok) throw new Error('Failed to update expense');
        setEditId(null); // Clear edit mode after saving
      } else {
        // CREATE new expense
        const response = await fetch('http://localhost:5000/api/expenses', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(expenseData),
        });
        if (!response.ok) throw new Error('Failed to add expense');
      }

      // Reset form fields and refresh list
      setName('');
      setAmount('');
      setCategory('');
      setDate('');
      fetchExpenses();
    } catch (err) {
      console.error('Error saving expense:', err);
    }
  };

  // Calculate total expenses
  const totalAmount = expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);

  return (
    <div className="expense-container">
      <h1>Expenses</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input 
          type="text" 
          placeholder="Expense Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Amount" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Category" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
        />
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
        <button type="submit" className="add-btn">
          {editId ? "Update Expense" : "+ Add Expense"}
        </button>

        {editId && (
          <button 
            type="button" 
            onClick={() => { 
              setEditId(null); 
              setName(''); 
              setAmount(''); 
              setCategory(''); 
              setDate(''); 
            }} 
            style={{ background: '#ccc', border: 'none', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px' }}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="custom-table">
        <thead>
          <tr>
            <th>Expense Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.name}</td>
              <td>{expense.amount}</td>
              <td>{expense.category || "General"}</td>
              <td>{expense.date ? expense.date.substring(0, 10) : "N/A"}</td>
              <td>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button 
                    className="edit-btn" 
                    onClick={() => handleEditClick(expense)}
                    style={{ background: '#f0ad4e', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDelete(expense._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="Total-expense">
        <p>Total Expenses = {totalAmount}</p>
      </div>
    </div>
  );
}