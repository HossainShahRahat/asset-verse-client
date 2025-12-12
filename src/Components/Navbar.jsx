import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import useUserStatus from "../Hooks/useUserStatus";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [role, roleLoading, status] = useUserStatus();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const getHomeLink = () => {
    if (!user) return "/";
    if (role === "hr") return "/asset-list";
    if (role === "employee") return "/my-assets";
    return "/";
  };

  const navOptions = (
    <>
      {!user && (
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
      )}

      {!user && (
        <>
          <li>
            <NavLink to="/join-employee">Join as Employee</NavLink>
          </li>
          <li>
            <NavLink to="/join-hr">Join as HR</NavLink>
          </li>
        </>
      )}

      {user && role === "hr" && (
        <>
          <li>
            <NavLink to="/asset-list">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/add-asset">Add Asset</NavLink>
          </li>
          <li>
            <NavLink to="/all-requests">All Requests</NavLink>
          </li>
          <li>
            <NavLink to="/employee-list">Employee List</NavLink>
          </li>
          <li>
            <NavLink to="/subscription">Subscription</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </>
      )}

      {user && role === "employee" && (
        <>
          <li>
            <NavLink to="/my-assets">My Assets</NavLink>
          </li>
          <li>
            <NavLink to="/my-team">My Team</NavLink>
          </li>
          <li>
            <NavLink to="/request-asset">Request Asset</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 text-base-content shadow-sm w-full px-4 md:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navOptions}
          </ul>
        </div>
        <Link to={getHomeLink()} className="btn btn-ghost normal-case text-xl">
          <img
            src="https://img.icons8.com/color/48/company.png"
            alt="logo"
            className="w-8 h-8 mr-2"
          />
          AssetVerse
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        {user && role === "hr" && status.type === "Premium" && (
          <div className="badge badge-lg badge-accent text-white font-semibold mr-3">
            {status.type}
          </div>
        )}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    user.photoURL || "https://img.icons8.com/color/48/user.png"
                  }
                  alt="profile"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
