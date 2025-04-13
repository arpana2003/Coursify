import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from "../Redux/Slices/AuthSlice";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  async function onLogin(event) {
    event.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }

    const response = await dispatch(login(loginData));

    if (response.meta.requestStatus === "fulfilled") {
      navigate("/");
    }

    setLoginData({
      email: "",
      password: "",
    });
  }

  return (
    <HomeLayout>
      <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={onLogin}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Login Page</h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              onChange={handleUserInput}
              value={loginData.email}
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email..."
              className="bg-transparent px-2 py-1 border"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              onChange={handleUserInput}
              value={loginData.password}
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter your password..."
              className="bg-transparent px-2 py-1 border"
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer mt-2"
          >
            Login
          </button>

          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="link text-accent cursor-pointer">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Login;
