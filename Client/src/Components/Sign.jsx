import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-white rounded-lg p-4 flex items-center justify-center flex-col md:w-[500px]">
        <div className="w-xs flex justify-center flex-col items-center">
          <div className="rounded-full w-8 h-8 bg-gray-400 p-3 my-4"></div>
          <h2 className="md:text-xl">Create an account</h2>
          <p className="text-[14px] md:text-[11px] mb-2">
            Already have an account?{" "}
            <a className="underline" href="">
              Log in
            </a>{" "}
          </p>
          <div className="rounded-4xl border border-gray-500 w-full p-5 h-4 mt-3 flex items-center justify-center text-[14px]">
            <p>Continue with Facebook</p>
          </div>
          <div className="rounded-4xl border border-gray-500 w-full p-5 h-4 my-3 flex items-center justify-center text-[14px]">
            <p>Continue with Google</p>
          </div>

          <div>
            <p className="text-center">OR</p>
          </div>

          <p className="text-xs text-gray-500">
            Enter your email address to create an account
          </p>
          <label
            className="my-2 self-start text-xs text-gray-500"
            htmlFor="text"
          >
            Your email
          </label>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            className="p-1 w-full border border-gray-300 rounded-sm"
          />

          <label
            className="my-2 self-start text-xs text-gray-500"
            htmlFor="password"
          >
            Your password
          </label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            className="p-1 w-full border border-gray-300 rounded-sm"
          />

          <button
            onClick={() => {
              navigate("/form");
            }}
            type="button"
            className="w-full my-4 p-2 rounded-2xl bg-gray-300 text-sm text-white font-bold cursor-pointer hover:bg-gray-800 "
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
