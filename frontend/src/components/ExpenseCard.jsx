import React from "react";

const ExpenseCard = ({ title, amount }) => {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-gray-500 dark:text-gray-300 text-lg font-medium">
        {title}
      </h3>

      <h1 className="text-3xl font-bold text-blue-600 mt-2">
        {amount}
      </h1>

    </div>
  );
};

export default ExpenseCard;