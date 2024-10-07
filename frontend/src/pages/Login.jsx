import React from 'react'
import Input from "../components/Input";
import bg from "../images/bg.jpg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="relative w-full h-screen grid grid-cols-2">
      <div className="p-24 bg-black bg-opacity-70">
        <p className="font-medium text-sm text-gray-200">WELCOME BACK</p>
        <h1 className="text-5xl text-white font-bold my-5">
          Login To Your Account<span className="text-blue-400">.</span>
        </h1>
        <p className="text-gray-300">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400">
            Sign up
          </Link>
        </p>
        <form className="mt-8 flex flex-col gap-8 w-full">
          <Input
            placeholder="Enter a email"
            type="email"
            name="email"
            label="Email"
          />
          <Input
            placeholder="Enter a password"
            type="password"
            name="password"
            label="Password"
          />
          <button className="bg-blue-500 py-3 rounded col-span-2 text-white">
            Login
          </button>
        </form>
      </div>
      <img src={bg} className="absolute w-full h-full top-0 left-0 -z-10 -scale-x-100 " />
    </div>
  )
}

export default Login
