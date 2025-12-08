import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const JoinEmployee = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const dob = form.dob.value;

    // Password validation (min 6 chars)
    if (password.length < 6) {
      Swal.fire("Error", "Password must be at least 6 characters", "error");
      return;
    }

    try {
      // 1. Create User in Firebase
      const result = await createUser(email, password);
      const user = result.user;

      // 2. Update Profile (Name)
      await updateUserProfile(name);

      // 3. Prepare data for Database
      const userInfo = {
        name: name,
        email: email,
        role: "employee",
        dateOfBirth: dob,
        createAt: new Date(),
      };

      // 4. Save to Database
      // Note: server is not running yet, so this might fail until backend is ready
      await axios.post("http://localhost:5000/users", userInfo);

      Swal.fire({
        title: "Success!",
        text: "Welcome to the team! Registration successful.",
        icon: "success",
        confirmButtonText: "Go to Dashboard",
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200 py-10">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Join as Employee</h1>
          <p className="py-6">
            Register to manage your assets and track your equipment.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
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
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Date of Birth</span>
              </label>
              <input
                name="dob"
                type="date"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinEmployee;
