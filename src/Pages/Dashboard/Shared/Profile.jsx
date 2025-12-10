import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    updateUserProfile(name, photo)
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Profile updated successfully",
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-10 bg-base-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">My Profile</h2>

      <div className="card w-full max-w-lg mx-auto bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-center mb-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user?.photoURL || "https://i.ibb.co/mJRkLW9/avatar.png"}
                  alt="profile"
                />
              </div>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user?.displayName}
                className="input input-bordered"
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email (Read Only)</span>
              </label>
              <input
                type="text"
                value={user?.email || ""}
                className="input input-bordered"
                readOnly
                disabled
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Profile Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                defaultValue={user?.photoURL}
                className="input input-bordered"
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Update Profile</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
