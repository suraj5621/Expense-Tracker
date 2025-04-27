import { useState, useEffect } from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import API from '../services/api'

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

export default function Dashboard() {
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await API.get('/expenses')
        setExpenses(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  const categoryData = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount)
    return acc
  }, {})

  const monthData = expenses.reduce((acc, curr) => {
    const month = new Date(curr.date).toLocaleString('default', { month: 'short', year: 'numeric' })
    acc[month] = (acc[month] || 0) + Number(curr.amount)
    return acc
  }, {})

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 text-center">Expenses by Category</h3>
          <Pie
            data={{
              labels: Object.keys(categoryData),
              datasets: [
                {
                  data: Object.values(categoryData),
                  backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
                },
              ],
            }}
          />
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 text-center">Monthly Expenses</h3>
          <Bar
            data={{
              labels: Object.keys(monthData),
              datasets: [
                {
                  label: 'Amount',
                  data: Object.values(monthData),
                  backgroundColor: '#3B82F6',
                },
              ],
            }}
            options={{
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
