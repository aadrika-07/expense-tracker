import React from "react";

const BudgetTracker = ({
  budget,
  setBudget,
  totalExpense,
  remainingBudget,
  budgetUsedPercent,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-6">

      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        Budget Tracker
      </h2>

      <input
        type="number"
        value={budget}
        onChange={(e) =>
          setBudget(Number(e.target.value))
        }
        placeholder="Set Monthly Budget"
        className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white p-3 rounded-xl mb-4"
      />

      <div className="space-y-2">

        <p className="font-semibold">
          Budget: ₹{budget}
        </p>

        <p className="font-semibold">
          Spent: ₹{totalExpense}
        </p>

        <p className="font-semibold">
          Remaining: ₹{remainingBudget}
        </p>

      </div>

      <div className="w-full bg-gray-300 rounded-full h-4 mt-4">

        <div
          className="bg-blue-600 h-4 rounded-full transition-all"
          style={{
            width: `${Math.min(
              budgetUsedPercent,
              100
            )}%`,
          }}
        />

      </div>

      <p className="mt-2 text-sm">
        {budgetUsedPercent.toFixed(1)}%
        Budget Used
      </p>

    </div>
  );
};

export default BudgetTracker;