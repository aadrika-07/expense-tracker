import React, {
  useEffect,
  useState,
} from "react";

import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import SearchFilter from "../components/SearchFilter";
import API from "../services/api";
import Layout from "../components/Layout";

const Expenses = () => {

  const [expenses, setExpenses] =
    useState([]);

  const [editingExpense, setEditingExpense] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

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

  const handleAddExpense = async (
    expense
  ) => {
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

  const handleDelete = async (id) => {
    try {

      await API.delete(
        `/expenses/${id}`
      );

      fetchExpenses();

    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
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

  const filteredExpenses =
    expenses.filter((expense) => {

      const matchesSearch =
        expense.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "All" ||
        expense.category ===
          selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  return (
    <Layout>

      <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
        Expenses
      </h1>

      <p className="text-gray-500 mb-6">
        Add, edit and manage your daily expenses.
      </p>

      <AddExpenseForm
        onAddExpense={handleAddExpense}
        onUpdateExpense={
          handleUpdateExpense
        }
        editingExpense={
          editingExpense
        }
      />

      <div className="mt-6">
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={
            selectedCategory
          }
          setSelectedCategory={
            setSelectedCategory
          }
        />
      </div>

      <div className="mt-6">
        <ExpenseList
          expenses={filteredExpenses}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      </Layout>
  );
};

export default Expenses;