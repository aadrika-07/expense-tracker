function Navbar({
  darkMode,
  setDarkMode,
}) {

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-md p-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-blue-600 whitespace-nowrap">
        Expense Tracker
      </h1>

      <p className="text-xs text-gray-500">
        Smart Personal Finance Dashboard
      </p>

      <div className="flex gap-3 items-center">

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <p className="font-semibold text-gray-700 dark:text-gray-300">
          👤 {user?.username}
        </p>

        <button
          onClick={() => {
            window.location.href = "/profile";
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Profile
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;