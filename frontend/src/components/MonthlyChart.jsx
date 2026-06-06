import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const MonthlyChart = ({ expenses = [] }) => {
  const monthlyData = [
    { month: "Jan", total: 0 },
    { month: "Feb", total: 0 },
    { month: "Mar", total: 0 },
    { month: "Apr", total: 0 },
    { month: "May", total: 0 },
    { month: "Jun", total: 0 },
    { month: "Jul", total: 0 },
    { month: "Aug", total: 0 },
    { month: "Sep", total: 0 },
    { month: "Oct", total: 0 },
    { month: "Nov", total: 0 },
    { month: "Dec", total: 0 },
  ];

  expenses.forEach((expense) => {
    if (!expense?.date || !expense?.amount) return;

    const date = new Date(expense.date);

    if (isNaN(date.getTime())) return;

    const monthIndex = date.getMonth();

    monthlyData[monthIndex].total += Number(expense.amount);
  });

  if (expenses.length === 0) {
    return (
      <div className="bg-white p-5 rounded-2xl shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">
          📈 Monthly Expenses
        </h2>
  
        <div className="h-[350px] flex items-center justify-center text-gray-500">
          No expense data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 mt-6">
      <h2 className="text-xl font-semibold mb-4">
        📈 Monthly Expenses
      </h2>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="total"
              fill="#3B82F6"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyChart;