import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";

const JoinHR = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile, googleSignIn } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        updateUserProfile(data.name, data.companyLogo).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            role: "hr",
            companyName: data.companyName,
            companyLogo: data.companyLogo,
            package: "basic",
          };
          axios
            .post(`${import.meta.env.VITE_API_URL}/users`, userInfo)
            .then((res) => {
              if (res.data.insertedId) {
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "HR Account created successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/asset-list");
              }
            });
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  };

  const handleGoogleRegister = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          name: result.user.displayName,
          email: result.user.email,
          role: "hr",
          companyName: "",
          companyLogo: result.user.photoURL,
          package: "basic",
        };
        axios
          .post(`${import.meta.env.VITE_API_URL}/users`, userInfo)
          .then(() => {
            Swal.fire("Success", "HR Account created with Google!", "success");
            navigate("/asset-list");
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Join as HR Manager</h1>
          <p className="py-6">Start managing your company assets today.</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Company Name</span>
              </label>
              <input
                type="text"
                {...register("companyName", { required: true })}
                className="input input-bordered"
              />
              {errors.companyName && (
                <span className="text-red-600">Company Name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Company Logo URL</span>
              </label>
              <input
                type="text"
                {...register("companyLogo", { required: true })}
                className="input input-bordered"
              />
              {errors.companyLogo && (
                <span className="text-red-600">Logo URL is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input input-bordered"
              />
              {errors.password && (
                <span className="text-red-600">
                  Password must be 6 characters
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>

            <div className="divider">OR</div>
            <button
              type="button"
              onClick={handleGoogleRegister}
              className="btn btn-outline w-full"
            >
              <FaGoogle /> Join with Google
            </button>

            <p className="mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinHR;
