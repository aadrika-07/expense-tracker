import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  if (localStorage.getItem("user")) {
    navigate("/");
  }

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://127.0.0.1:5000/register",
        {
          username,
          email,
          password,
        }
      );

      alert(
        "Registration Successful"
      );

      navigate("/login");

    } catch (error) {

      alert(
        "Registration Failed"
      );

      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
          required
        />

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
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          Register
        </button>

        <p className="text-center mt-4">
            Already have an account?{" "}
            <a
                href="/login"
                className="text-blue-600 font-semibold"
            >
                Login
            </a>
        </p>

      </form>

    </div>
  );
}

export default Register;