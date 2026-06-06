import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white p-5 shadow-md">

      <h2 className="text-2xl font-bold mb-10 text-blue-600">
        Dashboard
      </h2>

      <ul className="space-y-5">

        <li>
          <Link to="/"
            className="hover:text-blue-500 transition"
          >
            🏠 Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/expenses"
            className="hover:text-blue-500 transition"
          >
            💸 Expenses
          </Link>
        </li>

        <li>
          <Link
            to="/budget"
            className="hover:text-blue-500 transition"
          >
            💰 Budget
          </Link>
        </li>

        <li>
          <Link
            to="/analytics"
            className="hover:text-blue-500 transition"
          >
            📊 Analytics
          </Link>
        </li>

        <li>
          <Link
            to="/ai"
            className="hover:text-blue-500 transition"
          >
            ✨ AI Insights
          </Link>
        </li>

        <li>
          <Link
            to="/assistant"
            className="hover:text-blue-500 transition"
          >
            🤖 Assistant
          </ Link>
        </li>

        <li>
          <Link
            to="/profile"
            className="hover:text-blue-500 transition"
          >
            👤 Profile
          </ Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;