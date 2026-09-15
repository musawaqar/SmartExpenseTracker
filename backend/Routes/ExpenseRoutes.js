const router = require('express').Router();
const authMiddleware = require('../Middleware/auth.js'); 
const Expense = require('../Models/Expense'); 

// GET all expenses for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching expenses', error: err.message });
  }
});

// POST a new expense linked to the authenticated user
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, amount, category, date } = req.body;

    const newExpense = new Expense({
      name,
      amount,
      category,
      date,
      userId: req.user
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(500).json({ message: 'Server error saving expense', error: err.message });
  }
}); // <-- Properly closed POST route here

// DELETE an expense (Moved outside of the POST route)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error deleting expense', error: err.message });
  }
});

// UPDATE an expense by ID
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, amount, category, date } = req.body;

    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      { name, amount, category, date },
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ message: 'Server error updating expense', error: err.message });
  }
});
module.exports = router;