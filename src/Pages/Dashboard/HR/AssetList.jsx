import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt, FaSearch } from "react-icons/fa";

const AssetList = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axios
        .get(
          `http://localhost:5000/assets?email=${user.email}&search=${search}&sort=${sort}&page=${page}&limit=10`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        )
        .then((res) => {
          setItems(res.data);
          setLoading(false);
        });
    }
  }, [user, search, sort, page]);

  const remove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/assets/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          })
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Item has been deleted.", "success");
              const remaining = items.filter((item) => item._id !== id);
              setItems(remaining);
            }
          });
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    setSearch(text);
    setPage(0);
  };

  return (
    <div className="p-10 bg-base-200 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold">Asset List</h2>

        <div className="flex gap-4">
          <form onSubmit={handleSearch} className="join">
            <input
              type="text"
              name="search"
              placeholder="Search product..."
              className="input input-bordered join-item"
            />
            <button className="btn btn-primary join-item">
              <FaSearch />
            </button>
          </form>

          <select
            onChange={(e) => setSort(e.target.value)}
            className="select select-bordered"
          >
            <option value="">Sort by Quantity</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table w-full">
          <thead className="bg-neutral text-neutral-content">
            <tr>
              <th>Product</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-xl">
                          <img src={item.productImage} alt="product" />
                        </div>
                      </div>
                      <div className="font-bold">{item.productName}</div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        item.productType === "Returnable"
                          ? "badge-info"
                          : "badge-ghost"
                      }`}
                    >
                      {item.productType}
                    </span>
                  </td>
                  <td
                    className={
                      item.availableQuantity < 5 ? "text-red-500 font-bold" : ""
                    }
                  >
                    {item.availableQuantity}
                  </td>
                  <td>{new Date(item.dateAdded).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-ghost btn-xs text-info">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => remove(item._id)}
                      className="btn btn-ghost btn-xs text-error"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-8 join">
        <button
          onClick={() => setPage(page > 0 ? page - 1 : 0)}
          className="join-item btn"
          disabled={page === 0}
        >
          «
        </button>
        <button className="join-item btn">Page {page + 1}</button>
        <button
          onClick={() => setPage(page + 1)}
          className="join-item btn"
          disabled={items.length < 10}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default AssetList;
