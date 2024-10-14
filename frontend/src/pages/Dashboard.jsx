import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/dashboard", {
        withCredentials: true,
      });
      if (res.data.statusCode === 200) {
        setAuth(true);
        setName(res.data.data.firstname);
        setEmail(res.data.data.email);
      } else {
        setAuth(false);
        setError(res.data.message || "Failed to fetch user data");
      }
    } catch (error) {
      setAuth(false);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogOut = async () => {
    const res = await axios.post('http://localhost:8000/api/v1/user/logout', {}, { withCredentials: true });
    navigate('/login');
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!auth) {
    return <div>Please Log in</div>;
  } else {
    return (
      <>
        <h1>Welcome {name}</h1>
        <h1>Email: {email}</h1>
        {error && <div className="text-red-600">{error}</div>}
        <button className="bg-red-700 text-white py-3 px-4 rounded" onClick={handleLogOut}>Logout</button>
      </>
    );
  }
};

export default Dashboard;
