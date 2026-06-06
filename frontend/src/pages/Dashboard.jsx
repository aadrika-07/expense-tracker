import React, {
  useEffect,
  useState,
  useRef,
} from "react";

import ExpenseCard from "../components/ExpenseCard";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import MonthlyChart from "../components/MonthlyChart";
import SearchFilter from "../components/SearchFilter";
import API from "../services/api";
import BudgetTracker from "../components/BudgetTracker";
import Layout from "../components/Layout";


const Dashboard = () => {

  const formRef = useRef(null);

  // Expenses State
  const [expenses, setExpenses] = useState([]);

  const [budget, setBudget] = useState(10000);

  const [editingExpense, setEditingExpense] =
  useState(null);

  // Search State
  const [searchTerm, setSearchTerm] =
    useState("");

  // Category Filter State
  const [selectedCategory, setSelectedCategory] =
    useState("All");

    useEffect(() => {
  fetchExpenses();
}, []);

  const fetchExpenses = async () => {
    try {
      const response = await API.get("/expenses");

      setExpenses(response.data);

    } catch (error) {
      console.error(error);
    }
  };
  

  // Add Expense
  const handleAddExpense = async (expense) => {

    try {
  
      await API.post(
        "/expenses",
        expense
      );
  
      fetchExpenses();
  
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Expense
  const handleDelete = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);

      fetchExpenses();

    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleUpdateExpense = async (
    updatedExpense
  ) => {
    try {
  
      await API.put(
        `/expenses/${updatedExpense.id}`,
        updatedExpense
      );
  
      fetchExpenses();
  
      setEditingExpense(null);
  
    } catch (error) {
      console.error(error);
    }
  };

  // Total Expenses
  const totalExpense = expenses.reduce(
    (total, expense) =>
      total + Number(expense.amount),
    0
  );

  //remaining budget
  const remainingBudget =
  budget - totalExpense;

  const budgetUsedPercent =
  budget > 0
    ? (totalExpense / budget) * 100
    : 0;

  // Filter Expenses
  const filteredExpenses = expenses.filter(
    (expense) => {
      const matchesSearch = expense.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        expense.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }
  );

  return (
    <Layout>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 mb-6">

            <h2 className="text-2xl font-bold text-blue-600">
              Welcome Back 👋
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Track expenses, manage budgets, and get AI-powered financial insights.
            </p>

          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

            <ExpenseCard
              title="💸 Total Expenses"
              amount={`₹${totalExpense}`}
            />

            <ExpenseCard
              title="📋 Total Transactions"
              amount={expenses.length}
            />

            <ExpenseCard
              title="🏷 Categories"
              amount={
                new Set(
                  expenses.map(
                    (expense) => expense.category
                  )
                ).size
              }
            />

          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-black dark:text-white">
            Recent Expenses
          </h2>

          <ExpenseList
            expenses={filteredExpenses.slice(0, 5)}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
    </Layout>
   );
};

export default Dashboard;