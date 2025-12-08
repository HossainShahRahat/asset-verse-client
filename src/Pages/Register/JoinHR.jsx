import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const JoinHR = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const companyName = form.companyName.value;
    const companyLogo = form.companyLogo.value;
    const email = form.email.value;
    const password = form.password.value;
    const dob = form.dob.value;

    if (password.length < 6) {
      Swal.fire("Error", "Password should be at least 6 characters", "error");
      return;
    }

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, companyLogo);

      const hrData = {
        name,
        email,
        role: "hr",
        companyName,
        companyLogo,
        packageLimit: 5,
        currentEmployees: 0,
        subscription: "basic",
        dateOfBirth: dob,
        createdAt: new Date(),
      };

      // Note: This will fail until server is running, but logic is correct
      await axios.post("http://localhost:5000/users", hrData);

      Swal.fire({
        title: "Success!",
        text: "HR Account Created Successfully",
        icon: "success",
        confirmButtonText: "Go to Dashboard",
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
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
          <h1 className="text-5xl font-bold">Join as HR Manager</h1>
          <p className="py-6">
            Start managing your company assets efficiently.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Company Name</span>
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Company Logo URL</span>
              </label>
              <input
                type="url"
                name="companyLogo"
                placeholder="https://..."
                className="input input-bordered"
                required
              />
            </div>

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
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Date of Birth</span>
              </label>
              <input
                type="date"
                name="dob"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Register Company</button>
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

export default JoinHR;
