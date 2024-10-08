import React, { useState } from 'react'
import Input from "../components/Input";
import bg from "../images/bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = async(e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/login", {
        email,
        password
      })

      navigate("/dashboard");

      console.log(res)

    } catch (error) {
      console.log(error)
    }
  }

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
        <form className="mt-8 flex flex-col gap-8 w-full" method='POST'onSubmit={handleFormSubmit}>
          <Input
            placeholder="Enter a email"
            type="email"
            name="email"
            label="Email"
            value= {email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            placeholder="Enter a password"
            type="password"
            name="password"
            label="Password"
            value= {password}
            onChange={e => setPassword(e.target.value)}
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
