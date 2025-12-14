import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleNavigation = (email) => {
    setTimeout(() => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/user/${email}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => {
          if (res.data.role === "hr") {
            navigate("/asset-list", { replace: true });
          } else {
            navigate("/my-assets", { replace: true });
          }
        })
        .catch(() => {
          navigate(from, { replace: true });
        });
    }, 500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        Swal.fire("Success", "Login Successful", "success");
        handleNavigation(email);
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          email: result.user.email,
          name: result.user.displayName,
          role: "employee",
          photo: result.user.photoURL,
        };
        axios
          .post(`${import.meta.env.VITE_API_URL}/users`, userInfo)
          .then(() => {
            Swal.fire("Success", "Google Login Successful", "success");
            handleNavigation(result.user.email);
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8 lg:gap-16">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Access your AssetVerse dashboard.</p>
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
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <div className="divider">OR</div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-outline"
            >
              <FaGoogle /> Continue with Google
            </button>

            <div className="mt-4 text-center text-sm">
              <p>New here?</p>
              <div className="flex justify-center gap-2 mt-1">
                <Link
                  to="/join-employee"
                  className="text-blue-600 font-bold hover:underline"
                >
                  Join as Employee
                </Link>
                <span>|</span>
                <Link
                  to="/join-hr"
                  className="text-purple-600 font-bold hover:underline"
                >
                  Join as HR
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
