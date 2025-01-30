const ProductManagement = () => {
    // Replace this with actual data fetching
    const products = [
      { id: 1, name: 'MacBook Pro', category: 'Electronics', price: '$1500' },
      { id: 2, name: 'Vintage Car', category: 'Vehicles', price: '$20000' },
    ];
  
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
        <table className="w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-t">
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">{product.price}</td>
                <td className="p-4">
                  <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ProductManagement;
  