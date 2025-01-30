const UserManagement = () => {
    // Replace this with actual data fetching
    const users = [
      { id: 1, name: 'John Doe', role: 'Admin', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', role: 'User', email: 'jane@example.com' },
    ];
  
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
        <table className="w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
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
  
  export default UserManagement;
  