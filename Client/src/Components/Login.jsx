// import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting form data:", formData);
      const res = await axios.post("http://localhost:5000/api/login", formData);
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg p-4 flex items-center justify-center flex-col md:w-[500px]">
        <div className="w-xs flex justify-center flex-col items-center">
          <div className="rounded-full w-8 h-8 bg-gray-400 p-3 my-4"></div>
          <h2 className="md:text-xl">Log In</h2>
          <p className="text-[14px] md:text-[11px] mb-2">
            Don't have an account?{" "}
            <a className="underline" href="">
              Sign Up
            </a>{" "}
          </p>
          <div className="rounded-4xl border border-gray-500 w-full p-5 h-4 mt-3 flex items-center justify-center text-[14px]">
            <p>Login with Facebook</p>
          </div>
          <div className="rounded-4xl border border-gray-500 w-full p-5 h-4 my-3 flex items-center justify-center text-[14px]">
            <p>Login with Google</p>
          </div>

          <div>
            <p className="text-center text-gray-500">OR</p>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <label
              className="my-2 self-start text-xs text-gray-500"
              htmlFor="text"
            >
              Your email
            </label>
            <input
              name="email"
              value={formData.email}
              type="text"
              onChange={handleChange}
              className="p-1 w-full border border-gray-300 rounded-sm"
            />

            <label
              className="my-2 self-start text-xs text-gray-500"
              htmlFor="password"
            >
              Your password
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="p-1 w-full border border-gray-300 rounded-sm"
            />
            <span className="self-end">
              <a
                href=""
                className="text-xs text-gray-400 cursor-pointer underline hover:text-black"
              >
                Forget Password
              </a>
            </span>

            <button
              type="submit"
              className="w-full my-4 p-2 rounded-2xl bg-gray-300 text-sm text-white font-bold cursor-pointer hover:bg-gray-800 "
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
