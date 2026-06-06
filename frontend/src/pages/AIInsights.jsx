import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import Layout from "../components/Layout";

const AIInsights = () => {
  const [expenses, setExpenses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {

      setLoading(true);
      setError(false);
    
      const res =
        await axios.get(
          "http://127.0.0.1:5000/expenses"
        );
    
      setExpenses(res.data);
    
    } catch (error) {
    
      console.error(error);
    
      setError(true);
    
    } finally {
    
      setLoading(false);
    
    }
  };

  // =========================
  // Basic Statistics
  // =========================

  const totalSpending = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const highestExpense =
    expenses.length > 0
      ? Math.max(
          ...expenses.map((expense) =>
            Number(expense.amount)
          )
        )
      : 0;

  const averageExpense =
    expenses.length > 0
      ? (totalSpending / expenses.length).toFixed(2)
      : 0;

  const anomalyExpenses =
    expenses.filter(
      (expense) =>
        Number(expense.amount) >
        averageExpense * 2
    );

  // =========================
  // Category Analysis
  // =========================

  const categoryTotals = {};

  expenses.forEach((expense) => {
    const category = expense.category;

    categoryTotals[category] =
      (categoryTotals[category] || 0) +
      Number(expense.amount);
  });

  const topCategories =
  Object.entries(categoryTotals)
    .sort(
      ([, a], [, b]) => b - a
    )
    .slice(0, 3);

    let savingSuggestion = "";

    if (
      topCategories.length > 0 &&
      totalSpending > 0
    ) {
      const topCategory =
        topCategories[0][0];
    
      const topAmount =
        topCategories[0][1];
    
      const percentage = (
        (topAmount /
          totalSpending) *
        100
      ).toFixed(1);
    
      const potentialSaving =
        (topAmount * 0.1).toFixed(0);
    
      savingSuggestion =
        `You spend ${percentage}% of your money on ${topCategory}. Reducing it by 10% could save approximately Rs. ${potentialSaving}.`;
    }

  const highestCategory =
    Object.keys(categoryTotals).length > 0
      ? Object.keys(categoryTotals).reduce(
          (a, b) =>
            categoryTotals[a] > categoryTotals[b]
              ? a
              : b
        )
      : "N/A";

  // =========================
  // Monthly Summary
  // =========================

  const monthlyTotals = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.date);

    const monthYear = date.toLocaleString(
      "default",
      {
        month: "short",
        year: "numeric",
      }
    );

    monthlyTotals[monthYear] =
      (monthlyTotals[monthYear] || 0) +
      Number(expense.amount);
  });

  const weeklyTotals = {};

  expenses.forEach((expense) => {

    const date =
      new Date(expense.date);

    const startOfYear =
      new Date(
        date.getFullYear(),
        0,
        1
      );

    const days =
      Math.floor(
        (date - startOfYear) /
        (1000 * 60 * 60 * 24)
      );

    const week =
      Math.ceil(
        (days + startOfYear.getDay() + 1) /
        7
      );

    const weekKey =
      `Week ${week}`;

    weeklyTotals[weekKey] =
      (weeklyTotals[weekKey] || 0) +
      Number(expense.amount);

  });

  const highestWeek =
    Object.keys(weeklyTotals)
      .length > 0
      ? Object.keys(weeklyTotals)
          .reduce(
            (a, b) =>
              weeklyTotals[a] >
              weeklyTotals[b]
                ? a
                : b
          )
      : "N/A";

      const sortedDates =
        expenses
          .map(
            (expense) =>
              expense.date
          )
          .filter(Boolean)
          .sort();
      
          let streak = 0;

          if (sortedDates.length > 0) {
          
            streak = 1;
          
            for (
              let i =
                sortedDates.length - 1;
              i > 0;
              i--
            ) {
          
              const current =
                new Date(
                  sortedDates[i]
                );
          
              const previous =
                new Date(
                  sortedDates[i - 1]
                );
          
              const difference =
                (
                  current -
                  previous
                ) /
                (
                  1000 *
                  60 *
                  60 *
                  24
                );
          
              if (
                difference <= 1
              ) {
                streak++;
              } else {
                break;
              }
          
            }
          
          }

  // =========================
  // Budget Analysis
  // =========================

  const budget =
    Number(localStorage.getItem("budget")) ||
    10000;

  const budgetUsedPercent =
    budget > 0
      ? (totalSpending / budget) * 100
      : 0;
  
      const monthlyEntries =
        Object.entries(monthlyTotals);
    
      let currentMonthTotal = 0;
      let previousMonthTotal = 0;
    
      if (monthlyEntries.length >= 2) {
        currentMonthTotal =
          monthlyEntries[
            monthlyEntries.length - 1
          ][1];
    
        previousMonthTotal =
          monthlyEntries[
            monthlyEntries.length - 2
          ][1];
      }

      let predictedSpending = 0;

      if (monthlyEntries.length > 0) {

        const totalMonthlySpending =
          monthlyEntries.reduce(
            (sum, [, total]) =>
              sum + total,
            0
          );

        predictedSpending =
          totalMonthlySpending /
          monthlyEntries.length;
      }

    let healthScore = 100;

    // Budget impact
    if (budgetUsedPercent >= 100) {
      healthScore -= 40;
    } else if (budgetUsedPercent >= 80) {
      healthScore -= 20;
    }

    // Spending trend impact
    if (
      currentMonthTotal >
        previousMonthTotal &&
      previousMonthTotal > 0
    ) {
      healthScore -= 10;
    }

    // Category concentration impact
    if (
      highestCategory !== "N/A" &&
      totalSpending > 0
    ) {
      const categoryPercentage =
        (categoryTotals[highestCategory] /
          totalSpending) *
        100;

      if (categoryPercentage > 50) {
        healthScore -= 10;
      }
    }

    healthScore = Math.max(
      0,
      healthScore
    );

    let healthStatus = "";

    if (healthScore >= 90) {
      healthStatus = "Excellent";
    } else if (healthScore >= 70) {
      healthStatus = "Good";
    } else if (healthScore >= 50) {
      healthStatus =
        "Needs Improvement";
    } else {
      healthStatus =
        "High Spending Risk";
    }

    const downloadReport = () => {
      const doc = new jsPDF();
    
      doc.setFontSize(18);
      doc.text(
        "AI Expense Insights Report",
        20,
        20
      );
    
      doc.setFontSize(12);
    
      doc.text(
        `Total Spending: Rs.${totalSpending}`,
        20,
        40
      );
    
      doc.text(
        `Highest Expense: Rs.${highestExpense}`,
        20,
        50
      );
    
      doc.text(
        `Average Expense: Rs.${averageExpense}`,
        20,
        60
      );
    
      doc.text(
        `Highest Category: ${highestCategory}`,
        20,
        70
      );
    
      doc.text(
        `Budget Used: ${budgetUsedPercent.toFixed(
          1
        )}%`,
        20,
        80
      );
    
      doc.text(
        `Financial Health: ${healthScore}/100 (${healthStatus})`,
        20,
        90
      );
    
      let y = 110;
    
      doc.text(
        "AI Suggestions:",
        20,
        y
      );
    
      y += 10;
    
      insights.forEach((item) => {
        doc.text(
          `• ${item}`,
          20,
          y
        );
    
        y += 10;
      });
    
      doc.save(
        "AI_Expense_Report.pdf"
      );
    };

  // =========================
  // AI Insights
  // =========================

  const insights = [];

  if (
    highestCategory !== "N/A" &&
    totalSpending > 0
  ) {
    const percentage = (
      (categoryTotals[highestCategory] /
        totalSpending) *
      100
    ).toFixed(1);

    insights.push(
      `${highestCategory} expenses are ${percentage}% of your total spending.`
    );
  }

  if (averageExpense > 1000) {
    insights.push(
      "Your average expense amount is relatively high. Consider reviewing large purchases."
    );
  }

  if (highestExpense > 0) {
    insights.push(
      `Your highest single expense was Rs. ${highestExpense}.`
    );
  }

  if (expenses.length > 10) {
    insights.push(
      `You have recorded ${expenses.length} expenses. Great job tracking your spending.`
    );
  }

  if (budgetUsedPercent >= 100) {
    insights.push(
      "ALERT: You have exceeded your monthly budget."
    );
  } else if (budgetUsedPercent >= 80) {
    insights.push(
      `WARNING: You have used ${budgetUsedPercent.toFixed(
        1
      )}% of your monthly budget.`
    );
  } else {
    insights.push(
      "✅ Your budget is currently under control."
    );
  }

  if (
    currentMonthTotal > 0 &&
    previousMonthTotal > 0
  ) {
    if (
      currentMonthTotal >
      previousMonthTotal
    ) {
      const increase = (
        ((currentMonthTotal -
          previousMonthTotal) /
          previousMonthTotal) *
        100
      ).toFixed(1);
  
      insights.push(
        `UP: Spending increased by ${increase}% compared to last month.`
      );
    } else if (
      currentMonthTotal <
      previousMonthTotal
    ) {
      const decrease = (
        ((previousMonthTotal -
          currentMonthTotal) /
          previousMonthTotal) *
        100
      ).toFixed(1);
  
      insights.push(
        `DOWN: Spending decreased by ${decrease}% compared to last month.`
      );
    } else {
      insights.push(
        "➡️ Spending is similar to last month."
      );
    }
  }

  if (predictedSpending > 0) {
    insights.push(
      `Predicted next month spending is Rs. ${predictedSpending.toFixed(
        0
      )}.`
    );
  }

  if (topCategories.length > 0) {
    insights.push(
      `Your highest spending category is ${topCategories[0][0]}.`
    );
  }

  if (savingSuggestion) {
    insights.push(
      savingSuggestion
    );
  }

  if (
    anomalyExpenses.length > 0
  ) {
    insights.push(
      `${anomalyExpenses.length} unusual expense(s) detected that are significantly higher than your average spending.`
    );
  }

  if (
    highestWeek !== "N/A"
  ) {
    insights.push(
      `Your highest spending occurred during ${highestWeek}.`
    );
  }

  if (streak > 0) {
    insights.push(
      `You have tracked expenses for ${streak} consecutive day(s).`
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[70vh]">
  
          <div className="text-center">
  
            <div
              className="
              animate-spin
              rounded-full
              h-16
              w-16
              border-b-4
              border-blue-600
              mx-auto
              "
            />
  
            <p className="mt-4 text-xl">
              Loading AI Insights...
            </p>
  
          </div>
  
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
  
        <div className="flex flex-col justify-center items-center h-[70vh]">
  
          <div className="text-6xl mb-4">
            ⚠️
          </div>
  
          <h2 className="text-3xl font-bold mb-3">
            Unable to Load AI Insights
          </h2>
  
          <p className="text-gray-500 dark:text-gray-400">
            Please check your Flask server and try again.
          </p>
  
        </div>
  
      </Layout>
    );
  }

  if (expenses.length === 0) {
    return (
      <Layout>
  
        <div className="flex flex-col justify-center items-center h-[70vh]">
  
          <div className="text-6xl mb-4">
            📊
          </div>
  
          <h2 className="text-3xl font-bold mb-3">
            No Expenses Found
          </h2>
  
          <p className="text-gray-500 dark:text-gray-400">
            Start adding expenses to generate AI insights.
          </p>
  
        </div>
  
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold dark:text-white">
            AI Insights
          </h1>

          <button
            onClick={downloadReport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Download PDF
          </button>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl mb-6">
          <h2 className="text-2xl centre font-bold">
            Smart Financial Analysis
          </h2>
          <p className="mt-2">
            AI-powered spending insights and saving recommendations.
          </p>
        </div>

        {/* Statistics Cards */}

        <h2 className="text-2xl font-bold dark:text-white mb-4">
          Overview
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <div className="
            bg-white
            dark:bg-gray-700
            text-black
            dark:text-white
            p-4
            rounded-xl
            shadow-md
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
            ">
            <h3 className="font-semibold">
              💰 Total Spending
            </h3>
            <p className="text-2xl font-bold">
              Rs. {totalSpending}
            </p>
          </div>

          <div className="
            bg-white
            dark:bg-gray-700
            text-black
            dark:text-white
            p-4
            rounded-xl
            shadow-md
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
            ">

            <h3 className="font-semibold">
              📈 Highest Expense
            </h3>
            <p className="text-2xl font-bold">
              Rs. {highestExpense}
            </p>
          </div>

          <div className="
            bg-white
            dark:bg-gray-700
            text-black
            dark:text-white
            p-4
            rounded-xl
            shadow-md
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
            ">
            <h3 className="font-semibold">
              📊 Average Expense
            </h3>
            <p>Rs.{averageExpense}</p>
          </div>

          <div className="
            bg-white
            dark:bg-gray-700
            text-black
            dark:text-white
            p-4
            rounded-xl
            shadow-md
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
            ">
            <h3 className="font-semibold">
              🎯 Budget Used
            </h3>
            <p>
              {budgetUsedPercent.toFixed(1)}%
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 text-black dark:text-white p-4 rounded">

            <h3 className="font-semibold mb-2">
              ❤️ Financial Health
            </h3>

            <p className="text-2xl font-bold">
              {healthScore}/100
            </p>

            <div className="w-full bg-gray-300 rounded-full h-3 mt-3">

              <div
                className={`h-3 rounded-full ${
                  healthScore >= 90
                    ? "bg-green-500"
                    : healthScore >= 70
                    ? "bg-blue-500"
                    : healthScore >= 50
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{
                  width: `${healthScore}%`,
                }}
              />

            </div>

            <p className="mt-2 text-sm">
              {healthStatus}
            </p>

          </div>

          <div className="bg-gray-700 text-white p-4 rounded">
            <h3 className="font-semibold">
              Forecast
            </h3>

            <p>
              Rs. {predictedSpending.toFixed(0)}
            </p>

            <p className="text-sm mt-1">
              Next Month
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 text-black dark:text-white p-4 rounded">
            <h3 className="font-semibold mb-2">
              Top Category
            </h3>

            <p className="font-bold">
              {topCategories.length > 0
                ? topCategories[0][0]
                : "N/A"}
            </p>

            <p className="text-sm mt-1">
              Rs.{" "}
              {topCategories.length > 0
                ? topCategories[0][1]
                : 0}
            </p>
          </div>

          <div
            className="
            bg-white
            dark:bg-gray-700
            text-black
            dark:text-white
            p-4
            rounded-xl
            shadow-md
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
            "
          >
            <h3 className="font-semibold">
              🔥 Tracking Streak
            </h3>

            <p className="text-xl font-bold">
              {streak}
            </p>

            <p className="text-sm mt-1">
              Consecutive Days
            </p>
          </div>

        </div>

        {/* Monthly Summary */}

        <div
          className="
          bg-white
          dark:bg-gray-800
          rounded-xl
          shadow-md
          p-5
          mb-8
          "
        >
          <h2 className="text-2xl font-bold dark:text-white mb-4">
            Monthly Spending Summary
          </h2>

          <div className="space-y-3">
            {Object.entries(monthlyTotals).map(
              ([month, total]) => (
                <div
                  key={month}
                  className="bg-gray-700 text-white p-4 rounded flex justify-between"
                >
                  <span>{month}</span>
                  <span>Rs.{total}</span>
                </div>
              )
            )}
          </div>
        </div>

        <div
          className="
          bg-white
          dark:bg-gray-800
          rounded-xl
          shadow-md
          p-5
          mb-8
          "
        >
          <h2 className="text-2xl font-bold dark:text-white mt-10 mb-4">
            Detailed Insights
          </h2>
          <h2 className="text-2xl font-bold dark:text-white mb-4">
            Top Spending Categories
          </h2>

          <div className="space-y-3">
            {topCategories.map(
              ([category, amount], index) => (
                <div
                  key={category}
                  className="bg-white dark:bg-gray-700 text-black dark:text-white p-4 rounded flex justify-between"
                >
                  <span>
                    #{index + 1} {category}
                  </span>

                  <span>
                    Rs. {amount}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <div
          className="
          bg-white
          dark:bg-gray-800
          rounded-xl
          shadow-md
          p-5
          mb-8
          "
        >

          <h2 className="text-2xl font-bold dark:text-white mt-10 mb-4">
            AI Analysis
          </h2>

          <h2 className="text-2xl font-bold dark:text-white mb-4">
            Smart Saving Opportunity
          </h2>

          <div className="bg-green-100 dark:bg-green-900 p-5 rounded-lg">

            <p className="font-medium">
              {savingSuggestion ||
                "Not enough data available."}
            </p>

          </div>

        </div>

        <div
          className="
          bg-white
          dark:bg-gray-800
          rounded-xl
          shadow-md
          p-5
          mb-8
          "
        >

          <h2 className="text-2xl font-bold dark:text-white mb-4">
            Expense Anomalies
          </h2>

          {anomalyExpenses.length === 0 ? (

            <div className="bg-green-100 dark:bg-green-900 p-4 rounded">

              No unusual expenses detected.

            </div>

          ) : (

            <div className="space-y-3">

              {anomalyExpenses.map(
                (expense) => (

                  <div
                    key={expense.id}
                    className="bg-red-100 dark:bg-red-900 p-4 rounded"
                  >

                    <p>
                      Rs. {expense.amount}
                    </p>

                    <p>
                      Category:
                      {" "}
                      {expense.category}
                    </p>

                    <p>
                      Date:
                      {" "}
                      {expense.date}
                    </p>

                  </div>

                )
              )}

            </div>

          )}

        </div>

        <div
          className="
          bg-white
          dark:bg-gray-800
          rounded-xl
          shadow-md
          p-5
          mb-8
          "
        >

          <h2 className="text-2xl font-bold dark:text-white mb-4">
            Weekly Spending
          </h2>

          <div className="space-y-3">

            {Object.entries(
              weeklyTotals
            ).map(
              ([week, amount]) => (

                <div
                  key={week}
                  className="
                  bg-white
                  dark:bg-gray-700
                  text-black
                  dark:text-white
                  p-4
                  rounded
                  flex
                  justify-between
                  "
                >

                  <span>
                    {week}
                  </span>

                  <span>
                    Rs. {amount}
                  </span>

                </div>

              )
            )}

          </div>

        </div>

        {/* AI Suggestions */}

        <div>
          <h2 className="text-2xl font-bold dark:text-white mb-4">
            AI Suggestions
          </h2>

          <div className="space-y-3">
            {insights.map(
              (insight, index) => (
                <div
                  key={index}
                  className="
                    bg-blue-100
                    dark:bg-blue-900
                    text-black
                    dark:text-white
                    p-4
                    rounded-lg
                    "
                >
                  🤖 {insight}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AIInsights;