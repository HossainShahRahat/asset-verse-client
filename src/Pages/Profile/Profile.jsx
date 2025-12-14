import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useUserStatus from "../../Hooks/useUserStatus";
import axios from "axios";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, logOut, updateUserProfile } = useContext(AuthContext);
  const [role, loading, status] = useUserStatus();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhoto(user.photoURL || "");
    }
  }, [user]);

  const handleCancelSubscription = () => {
    if (status.type === "Basic") {
      Swal.fire("Info", "You are already on the Basic plan.", "info");
      return;
    }

    Swal.fire({
      title: "Confirm Downgrade?",
      text: "This will revert your plan to Basic (5 employee limit).",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Downgrade!",
    }).then((result) => {
      if (result.isConfirmed) {
        const downgradeInfo = {
          email: user.email,
          limit: 5,
          type: "Basic",
        };

        axios
          .patch(
            `${import.meta.env.VITE_API_URL}/users/upgrade`,
            downgradeInfo,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("access-token")}`,
              },
            }
          )
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire(
                "Downgraded!",
                "Your subscription is now set to the Basic plan.",
                "success"
              );
              window.location.reload();
            }
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Error", "Failed to process downgrade.", "error");
          });
      }
    });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const updateData = {
      name: name,
      photoURL: photo,
    };

    updateUserProfile(name, photo)
      .then(() => {
        axios
          .patch(
            `${import.meta.env.VITE_API_URL}/users/profile/${user.email}`,
            updateData,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("access-token")}`,
              },
            }
          )
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire("Success", "Profile updated successfully!", "success");
            } else {
              Swal.fire(
                "Info",
                "Profile updated locally, but no database changes detected.",
                "info"
              );
            }
          })
          .catch((dbError) => {
            console.error("MongoDB Update Error:", dbError);
            Swal.fire(
              "Error",
              "Profile updated locally, but failed to save to database.",
              "error"
            );
          });
      })
      .catch((firebaseError) => {
        console.error("Firebase Update Error:", firebaseError);
        Swal.fire(
          "Error",
          `Firebase Update Failed: ${firebaseError.message}`,
          "error"
        );
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-10 bg-base-200 min-h-screen text-base-content">
      <h2 className="text-3xl font-bold mb-8">User Profile</h2>
      <div className="card bg-base-100 shadow-xl max-w-lg mx-auto">
        <form onSubmit={handleUpdateProfile} className="card-body">
          <div className="avatar flex justify-center mb-4">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={photo || "https://img.icons8.com/color/48/user.png"}
                alt="Profile"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Link to your photo"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              value={user.email}
              className="input input-bordered w-full bg-base-200 cursor-not-allowed"
              readOnly
            />
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </div>

          {role === "hr" && (
            <div className="mt-6 border-t pt-4">
              <h4 className="text-xl font-semibold mb-3">Company Status</h4>
              <p>
                <strong>Role:</strong>{" "}
                <span className="badge badge-lg badge-info capitalize">
                  {role}
                </span>
              </p>
              <p className="mt-2">
                <strong>Current Plan:</strong>{" "}
                <span
                  className={`badge badge-lg ${
                    status.type === "Premium"
                      ? "badge-accent"
                      : status.type === "Standard"
                      ? "badge-success"
                      : "badge-warning"
                  } text-white`}
                >
                  {status.type}
                </span>
              </p>
              <p className="mt-2">
                <strong>Employee Limit:</strong> {status.limit || "N/A"}
              </p>

              {(status.type === "Standard" || status.type === "Premium") && (
                <div className="mt-6">
                  <button
                    onClick={handleCancelSubscription}
                    className="btn btn-error btn-sm text-white"
                  >
                    Cancel Subscription / Downgrade to Basic
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={logOut}
            className="btn btn-neutral mt-6"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
