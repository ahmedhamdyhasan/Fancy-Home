import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <nav className=" bg-slate-100 shadow-md ">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-2">
        <Link to="/">
          <h1 className=" font-bold text-sm sm:text-xl flex flex-wrap">
            <span className=" text-slate-500">Ahmed</span>
            <span className=" text-slate-700">State</span>
          </h1>
        </Link>
        <form className=" bg-slate-200 p-3 flex items-center rounded-lg">
          <input
            className=" bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="Search"
          />
          <FaSearch className=" text-slate-600" />
        </form>
        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser?.avatar}
                alt="profile"
              />
            ) : (
              <Link to={"/sign-in"}>
                <li className=" text-slate-700 hover:underline"> Sign in</li>
              </Link>
            )}
          </Link>
        </ul>
        {/* <ul className="flex gap-4">
          <Link to="/">
            <li className=" hidden sm:inline text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">About</li>
          </Link>
          <Link to="/sign-in">
            <li className="hidden sm:inline text-slate-700 hover:underline">Sign In</li>
          </Link>
        </ul> */}
      </div>
    </nav>
  );
};

export default Navbar;
