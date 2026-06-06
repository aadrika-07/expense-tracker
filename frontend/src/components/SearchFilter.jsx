import React from "react";

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md mb-6">

      <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
        🔍 Search & Filter
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Search Input */}
        <input
          type="text"
          placeholder="🔍 Search expenses..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">
            📂 All Categories
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

      </div>
    </div>
  );
};

export default SearchFilter;