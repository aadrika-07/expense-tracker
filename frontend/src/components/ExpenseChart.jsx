import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A020F0",
];

const ExpenseChart = ({ expenses }) => {
  // Category totals
  const categoryData = [];

  expenses.forEach((expense) => {
    const existing = categoryData.find(
      (item) => item.name === expense.category
    );

    if (existing) {
      existing.value += Number(expense.amount);
    } else {
      categoryData.push({
        name: expense.category,
        value: Number(expense.amount),
      });
    }
  });

  if (categoryData.length === 0) {
    return (
      <div className="bg-white p-5 rounded-2xl shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">
          📊 Expense Analytics
        </h2>

        <div className="h-[350px] flex items-center justify-center text-gray-500">
          No expense data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">
        📊 Expense Analytics
      </h2>

      <div className="w-full h-[350px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;