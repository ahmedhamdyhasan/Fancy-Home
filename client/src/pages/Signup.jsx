import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../components/OAuth";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl text-center font-semibold my-7">Sign up</h1>
      <form onSubmit={submitHandler} className=" flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="username"
          className=" border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className=" border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className=" border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className=" text-white bg-slate-700 p-3 rounded-lg uppercase disabled:opacity-80 hover:opacity-95"
        >
          {loading ? "Loading ..." : "Sign up"}
        </button>
        <OAuth />
      </form>
      <div className=" flex gap-2 mt-5">
        <p> Have an Account?</p>
        <Link to={"/sign-in"}>
          <span className=" text-blue-700">Sign In</span>
        </Link>
      </div>
      {error && <p className=" text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default Signup;

