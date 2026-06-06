import React, {
    useState,
    useEffect,
  } from "react";
  
  import API from "../services/api";
  import Layout from "../components/Layout";
  
  
  const Budget = () => {
  
    const [budget, setBudget] = useState(() => {
      const savedBudget =
        localStorage.getItem("budget");
    
      return savedBudget
        ? Number(savedBudget)
        : 10000;
    });
  
    const [expenses, setExpenses] =
      useState([]);
  
    useEffect(() => {
      fetchExpenses();
    }, []);

    useEffect(() => {
      localStorage.setItem(
        "budget",
        budget
      );
    }, [budget]);
  
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
        (total, expense) =>
          total +
          Number(expense.amount),
        0
      );
  
    const remainingBudget =
      budget - totalExpense;
  
    const budgetUsedPercent =
      budget > 0
        ? (totalExpense / budget) * 100
        : 0;
  
        return (
          <Layout>
  
        <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
          Budget Tracker
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Monitor your spending and stay within your monthly budget.
        </p>
  
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-3 mb-4">

          <div className="text-4xl">
            💰
          </div>

          <div>
            <h2 className="font-bold text-black dark:text-white">
              Monthly Budget
            </h2>

            <p className="text-gray-500">
              Track spending habits
            </p>
          </div>

        </div>
  
          <input
            type="number"
            value={budget}
            onChange={(e) =>
              setBudget(
                Number(e.target.value)
              )
            }
            placeholder="Monthly Budget"
            className="w-full border p-3 rounded-xl mb-5"
          />
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            <div className="bg-blue-50 dark:bg-slate-700 p-5 rounded-xl text-black dark:text-white">
              <h3>💰 Budget</h3>
              <p className="text-3xl font-bold">
                ₹{budget}
              </p>
            </div>

            <div className="bg-red-50 dark:bg-slate-700 p-5 rounded-xl text-black dark:text-white">
              <h3>💸 Spent</h3>
              <p className="text-3xl font-bold">
                ₹{totalExpense}
              </p>
            </div>

            <div className="bg-green-50 dark:bg-slate-700 p-5 rounded-xl text-black dark:text-white">
              <h3>✅ Remaining</h3>
              <p className="text-3xl font-bold">
                ₹{remainingBudget}
              </p>
            </div>

          </div>
  
          <div className="mt-5">

            {/* Progress Bar */}
            <div className="w-full bg-gray-300 dark:bg-slate-600 h-4 rounded-full overflow-hidden">
              <div
                style={{
                  width: `${Math.min(budgetUsedPercent, 100)}%`,
                }}
                className={`h-4 rounded-full transition-all duration-500 ${
                  budgetUsedPercent < 50
                    ? "bg-green-500"
                    : budgetUsedPercent < 80
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              />
            </div>

            {/* Text Below Bar */}
            <div className="mt-4">
              <p className="font-semibold text-lg text-black dark:text-white">
                {budgetUsedPercent.toFixed(1)}% Budget Used
              </p>

              <p
                className={`mt-1 font-medium ${
                  budgetUsedPercent < 50
                    ? "text-green-600"
                    : budgetUsedPercent < 80
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {budgetUsedPercent < 50
                  ? "🟢 Excellent Spending"
                  : budgetUsedPercent < 80
                  ? "🟡 Watch Your Spending"
                  : "🔴 Budget Limit Near"}
              </p>
            </div>

          </div>
  
        </div>
  
        </Layout>
    );
  };
  
  export default Budget;