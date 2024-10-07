import React, { useState } from "react";

const Input = ({ placeholder, type, name, label }) => {
  const [value, setValue] = useState("");


  return (
    <div className="flex flex-col gap-3">
      <label className="text-white" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-gray-800 p-3 placeholder:text-gray-400 rounded text-white"
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
