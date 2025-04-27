const Expense = require('../models/Expense')

async function addExpense(req, res) {
    const { amount, category, description, date } = req.body
    try {
        const newExpense = new Expense({
            userId: req.user.id,
            amount,
            category,
            description,
            date
        })
        await newExpense.save()
        res.status(201).json(newExpense)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function getExpenses(req, res) {
    try {
        const expenses = await Expense.find({ userId: req.user.id })
        res.json(expenses)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function updateExpense(req, res) {
    const { id } = req.params
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true })
        res.json(updatedExpense)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function deleteExpense(req, res) {
    const { id } = req.params
    try {
        await Expense.findByIdAndDelete(id)
        res.json({ message: 'Expense deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { addExpense, getExpenses, updateExpense, deleteExpense }
