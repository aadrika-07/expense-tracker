import React from "react";

const ExpenseList = ({
  expenses,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md">

      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        📋 Expense List
      </h2>

      {expenses.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
        📭 No expenses added yet.
        Add your first expense to start tracking your spending.
        </p>
      ) : (
        <div className="space-y-4">

          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-3"
            >

              {/* Expense Details */}
              <div>

                <h3 className="text-lg font-semibold dark:text-white">
                  {expense.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-300">
                  {expense.category}
                </p>

              </div>

              {/* Amount + Delete */}
              <div className="flex items-center gap-2">

                <h2 className="text-3xl font-bold text-blue-500">
                  ₹{expense.amount}
                </h2>

                <button
                  onClick={() => onEdit(expense)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(expense.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default ExpenseList;