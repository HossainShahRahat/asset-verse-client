import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAsset = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const type = form.type.value;
    const quantity = parseInt(form.quantity.value);
    const image = form.image.value;

    const info = {
      productName: name,
      productType: type,
      productQuantity: quantity,
      availableQuantity: quantity,
      productImage: image,
      dateAdded: new Date(),
      hrEmail: user?.email,
      companyName: user?.displayName,
      companyLogo: user?.photoURL,
    };

    try {
      await axios.post("http://localhost:5000/assets", info, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });

      Swal.fire({
        title: "Success",
        text: "Item added successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/asset-list");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-10">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-6">Add New Asset</h2>

          <form onSubmit={handleAdd}>
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Product Image URL</span>
              </label>
              <input
                type="url"
                name="image"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="flex gap-4 mb-4">
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text">Type</span>
                </label>
                <select name="type" className="select select-bordered" required>
                  <option value="Returnable">Returnable</option>
                  <option value="Non-returnable">Non-returnable</option>
                </select>
              </div>

              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text">Quantity</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  className="input input-bordered"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <button className="btn btn-primary w-full">Add Asset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAsset;
