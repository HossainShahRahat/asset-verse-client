import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;

    updateUserProfile(name, photo)
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Profile updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", "Could not update profile", "error");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl mb-6">Update Profile</h2>

          <div className="avatar mb-4">
            <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={user?.photoURL || "https://i.ibb.co/mJRkLW9/avatar.png"}
                alt="profile"
              />
            </div>
          </div>

          <div className="badge badge-lg badge-secondary mb-6">
            {user?.email}
          </div>

          <form onSubmit={handleUpdate} className="w-full">
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user?.displayName}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control w-full mb-6">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="url"
                name="photo"
                defaultValue={user?.photoURL}
                className="input input-bordered w-full"
                required
              />
            </div>

            <button className="btn btn-primary w-full">
              Update Information
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
