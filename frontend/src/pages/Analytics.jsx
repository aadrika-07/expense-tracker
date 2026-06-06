import ExpenseChart from "../components/ExpenseChart";
import MonthlyChart from "../components/MonthlyChart";

import React, {
  useEffect,
  useState,
} from "react";

import API from "../services/api";
import Layout from "../components/Layout";

const Analytics = () => {

  const [expenses, setExpenses] =
    useState([]);

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

  return (
    <Layout>

      <h1 className="text-3xl font-bold dark:text-white mb-6">
        📈Analytics
      </h1>

      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Visualize spending patterns and monthly expense trends.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <ExpenseChart
          expenses={expenses}
        />

        <MonthlyChart
          expenses={expenses}
        />

      </div>

      </Layout>
  );
};

export default Analytics;