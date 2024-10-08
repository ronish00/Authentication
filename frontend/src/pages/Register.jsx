import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import bg from "../images/bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

const Register = () => {

  const navigate = useNavigate();

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try{
      const res = await axios.post('http://localhost:8000/api/v1/user/register', {
        firstname,
        lastname,
        email,
        password
      })

      navigate('/login')

      console.log(res)
      
    } catch(err){
        console.log(err)
    }
  }

  return (
    <div className="relative w-full h-screen grid grid-cols-2">
      <div className="p-24 bg-black bg-opacity-70">
        <p className="font-medium text-sm text-gray-200">START FOR FREE</p>
        <h1 className="text-5xl text-white font-bold my-5">
          Create new account<span className="text-blue-400">.</span>
        </h1>
        <p className="text-gray-300">
          Already a member?{" "}
          <Link to="/login" className="text-blue-400">
            Log In
          </Link>
        </p>
        <form className="mt-8 grid grid-cols-2 gap-8 w-full" method="POST" action="/register" onSubmit={handleFormSubmit}>
          <Input
            placeholder="Enter a first name"
            type="text"
            name="firstName"
            label="First Name"
            value={firstname}
            onChange = {e => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Enter a last name"
            type="text"
            name="lastName"
            label="Last Name"
            value={lastname}
            onChange = {e => setLastName(e.target.value)}
          />
          <Input
            placeholder="Enter a email"
            type="email"
            name="email"
            label="Email"
            value={email}
            onChange = {e => setEmail(e.target.value)}
          />
          <Input
            placeholder="Enter a password"
            type="password"
            name="password"
            label="Password"
            value={password}
            onChange = {e => setPassword(e.target.value)}
          />
          <button className="bg-blue-500 py-3 rounded col-span-2 text-white">
            Create Account
          </button>
        </form>
      </div>
      <img src={bg} className="absolute w-full h-full top-0 left-0 -z-10 -scale-x-100 " />
    </div>
  );
};

export default Register;
