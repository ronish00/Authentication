const Input = ({ placeholder, type, name, label, value, onChange }) => {

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
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
