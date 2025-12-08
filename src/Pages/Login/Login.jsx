import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "Success",
          text: "User Login Successful",
          icon: "success",
          confirmButtonText: "Ok",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "Close",
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Access your asset management dashboard and stay updated.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>

            <div className="divider">OR</div>

            <div className="form-control">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="btn btn-outline"
              >
                <FaGoogle className="mr-2 text-red-500" /> Google
              </button>
            </div>

            <label className="label mt-4 justify-center flex-col">
              <span className="label-text-alt">New to AssetVerse?</span>
              <div className="flex gap-2 mt-2">
                <Link to="/join-employee" className="link link-primary">
                  Join as Employee
                </Link>
                <span>|</span>
                <Link to="/join-hr" className="link link-secondary">
                  Join as HR
                </Link>
              </div>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
