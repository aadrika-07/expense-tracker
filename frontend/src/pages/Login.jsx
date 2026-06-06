import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  if (localStorage.getItem("user")) {
    navigate("/");
  }

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response =
        await axios.post(
          "http://127.0.0.1:5000/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert(
        "Login Successful"
      );

      navigate("/");

    } catch (error) {

      alert(
        "Invalid Email or Password"
      );

      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </a>
        </p>

      </form>
    </div>
  );
}

export default Login;