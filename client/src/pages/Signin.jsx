import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailed } from "../redux/userSlice";
import OAuth from "../components/OAuth";
const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  // const [error, setError] = useState({});
  // const [loading, setLoading] = useState(true);
  const { loading, error } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        // setError(data.message)
        // setLoading(false)
        dispatch(signInFailed(data.message));
        return;
      }
      // setLoading(false)
      // setError(null)
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      // setLoading(false)
      // setError(error.message)
      dispatch(signInFailed(error.message));
    }
  };
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={submitHandler} className=" flex flex-col gap-4">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          className=" border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className=" border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className=" text-white bg-slate-700 p-3 rounded-lg uppercase disabled:opacity-80 hover:opacity-95"
        >
          {loading ? "Loading ..." : "Sign in"}
        </button>
        <OAuth/>
      </form>
      <div className=" flex gap-2 mt-5">
        <p>Don't Have an Account?</p>
        <Link to={"/sign-up"}>
/           <span className=" text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className=" text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default Signin;
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from '../redux/userSlice';
// import OAuth from '../components/OAuth';

// export default function SignIn() {
//   const [formData, setFormData] = useState({});
//   const { loading, error } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(signInStart());
//       const res = await fetch('/api/auth/signin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       console.log(data);
//       if (data.success === false) {
//         dispatch(signInFailure(data.message));
//         return;
//       }
//       dispatch(signInSuccess(data));
//       navigate('/');
//     } catch (error) {
//       dispatch(signInFailure(error.message));
//     }
//   };
//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//       <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//         <input
//           type='email'
//           placeholder='email'
//           className='border p-3 rounded-lg'
//           id='email'
//           onChange={handleChange}
//         />
//         <input
//           type='password'
//           placeholder='password'
//           className='border p-3 rounded-lg'
//           id='password'
//           onChange={handleChange}
//         />

//         <button
//           disabled={loading}
//           className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
//         >
//           {loading ? 'Loading...' : 'Sign In'}
//         </button>
//         <OAuth/>
//       </form>
//       <div className='flex gap-2 mt-5'>
//         <p>Dont have an account?</p>
//         <Link to={'/sign-up'}>
//           <span className='text-blue-700'>Sign up</span>
//         </Link>
//       </div>
//       {error && <p className='text-red-500 mt-5'>{error}</p>}
//     </div>
//   );
// }
