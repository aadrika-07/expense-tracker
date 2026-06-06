import React, {
  useState,
  useEffect,
} from "react";

const AddExpenseForm = ({
  onAddExpense,
  onUpdateExpense,
  editingExpense,
}) => {

  const [formData, setFormData] =
    useState({
      title: "",
      amount: "",
      category: "",
      date: "",
    });

    useEffect(() => {
      if (editingExpense) {
        setFormData(editingExpense);
      }
    }, [editingExpense]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (
      !formData.title ||
      !formData.amount ||
      !formData.category ||
      !formData.date
    ) {
      alert("Please fill all fields");
      return;
    }
  
    if (editingExpense) {
      onUpdateExpense(formData);
    } else {
      onAddExpense(formData);
    }
  
    setFormData({
      title: "",
      amount: "",
      category: "",
      date: "",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-5 dark:text-white">
        {editingExpense
          ? "✏️ Edit Expense"
          : "➕ Add Expense"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Expense Title"
          value={formData.title}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Amount */}
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            Select Category
          </option>

          <option value="Food">
            Food
          </option>

          <option value="Travel">
            Travel
          </option>

          <option value="Shopping">
            Shopping
          </option>

          <option value="Bills">
            Bills
          </option>

          <option value="Entertainment">
            Entertainment
          </option>
        </select>

        {/* Date */}
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className={`text-white p-3 rounded-xl col-span-1 md:col-span-2 transition ${
            editingExpense
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingExpense
            ? "Update Expense"
            : "Add Expense"}
        </button>

      </form>
    </div>
  );
};

export default AddExpenseForm;