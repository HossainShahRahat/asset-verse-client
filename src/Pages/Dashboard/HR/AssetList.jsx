const AssetList = () => {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Asset List</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Asset Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Data will be mapped here later */}
            <tr>
              <td colSpan="5" className="text-center">
                No assets found. Add some assets to get started.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetList;
