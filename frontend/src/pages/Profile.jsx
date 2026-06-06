import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import API from "../services/api";

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);
  
  const fetchExpenses = async () => {
    try {
  
      const response =
        await API.get("/expenses");
  
      setExpenses(response.data);
  
    } catch (error) {
      console.error(error);
    }
  };

  const totalExpense =
  expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0
  );

  const totalTransactions = expenses.length;

  const highestExpense =
  expenses.length > 0
    ? Math.max(
        ...expenses.map(
          expense => Number(expense.amount)
        )
      )
    : 0;
    const categoryCount = {};

    expenses.forEach((expense) => {
      categoryCount[expense.category] =
        (categoryCount[expense.category] || 0) + 1;
    });
    
    const mostUsedCategory =
      Object.keys(categoryCount).length > 0
        ? Object.keys(categoryCount).reduce(
            (a, b) =>
              categoryCount[a] >
              categoryCount[b]
                ? a
                : b
          )
        : "N/A";
    const averageExpense =
        totalTransactions > 0
          ? (
              totalExpense /
              totalTransactions
            ).toFixed(2)
          : 0;

    const budget =
        Number(
        localStorage.getItem("budget")
        ) || 10000;
        
    const budgetRemaining = budget - totalExpense;

  return (
    <Layout>

      <h1 className="text-3xl font-bold dark:text-white mb-6">
        👤 My Profile
      </h1>

      <p className="text-gray-500 dark:text-gray-400">
        Manage your account and track your financial performance.
      </p>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">

        <div className="space-y-4">
            <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                {user?.username?.charAt(0).toUpperCase()}
                </div>
            </div>

          <p className="text-lg">
            <strong>Username:</strong>{" "}
            {user?.username}
          </p>

          <p className="break-all">
            <strong>Email:</strong>{" "}
            {user?.email}
          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">

        <div className="bg-white dark:bg-gray-500 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold dark:text-white">
            Total Expenses
            </h2>

            <p className="text-3xl font-bold mt-2">
            ₹{totalExpense}
            </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold dark:text-white">
            Transactions
            </h2>

            <p className="text-3xl font-bold mt-2">
            {totalTransactions}
            </p>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold dark:text-white">
            Highest Expense
            </h2>

            <p className="text-3xl font-bold mt-2">
            ₹{highestExpense}
            </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold dark:text-white">
            Most Used Category
            </h2>

            <p className="text-3xl font-bold mt-2">
            {mostUsedCategory}
            </p>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold dark:text-white">
            Average Expense
            </h2>

            <p className="text-3xl font-bold mt-2">
            ₹{averageExpense}
            </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold dark:text-white">
            Budget Remaining
            </h2>

            <p className="text-3xl font-bold mt-2">
            ₹{budgetRemaining}
            </p>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;