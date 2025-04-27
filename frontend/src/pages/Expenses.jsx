import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import API from '../services/api'

export default function Expenses() {
  const [expenses, setExpenses] = useState([])
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)

  async function fetchExpenses() {
    setLoading(true)
    try {
      const res = await API.get('/expenses')
      setExpenses(res.data)
    } catch (err) {
      toast.error('Failed to load expenses')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!amount || !category || !description || !date) {
      return toast.error('Please fill all fields')
    }
    setButtonLoading(true)
    try {
      if (editingId) {
        await API.put(`/expenses/${editingId}`, { amount, category, description, date })
        toast.success('Expense updated')
      } else {
        await API.post('/expenses', { amount, category, description, date })
        toast.success('Expense added')
      }
      resetForm()
      fetchExpenses()
    } catch (err) {
      toast.error('Failed to submit')
    }
    setButtonLoading(false)
  }

  function resetForm() {
    setAmount('')
    setCategory('')
    setDescription('')
    setDate('')
    setEditingId(null)
  }

  function handleEdit(expense) {
    setAmount(expense.amount)
    setCategory(expense.category)
    setDescription(expense.description)
    setDate(expense.date.slice(0, 10))
    setEditingId(expense._id)
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete?')) return
    try {
      await API.delete(`/expenses/${id}`)
      toast.success('Expense deleted')
      fetchExpenses()
    } catch (err) {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 mb-6">
        <h2 className="text-2xl font-bold">{editingId ? 'Edit Expense' : 'Add Expense'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="p-2 border rounded w-full" required />
          <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded w-full" required />
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded w-full" required />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="p-2 border rounded w-full" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded flex justify-center">
          {buttonLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div> : (editingId ? 'Update' : 'Add')}
        </button>
      </form>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Expenses List</h2>
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense._id} className="border-b">
                    <td className="p-2">{expense.amount}</td>
                    <td className="p-2">{expense.category}</td>
                    <td className="p-2">{expense.description}</td>
                    <td className="p-2">{new Date(expense.date).toLocaleDateString()}</td>
                    <td className="p-2 flex gap-2">
                      <button onClick={() => handleEdit(expense)} className="text-blue-600">Edit</button>
                      <button onClick={() => handleDelete(expense._id)} className="text-red-600">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
