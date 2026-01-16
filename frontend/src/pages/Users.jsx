import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Users.css";
import {
    getAllUsers,
    deleteUser,
    updateUserName,
} from "../api/user";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const navigate = useNavigate();

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;

        try {
            await deleteUser(id); // ✅ success only
            setUsers((prev) => prev.filter((u) => u._id !== id));
            navigate("/login");
        } catch (error) {
            // ✅ STOP UI change
            if (error.response?.status === 403) {
                alert("You cannot delete another user");
            } else if (error.response?.status === 401) {
                alert("Please login again");
            } else {
                alert("Delete failed");
            }
        }
    };


    const handleUpdate = async (id) => {
        const newName = prompt("Enter new name");
        if (!newName) return;

        try {
            const res = await updateUserName(id, newName);

            // Use the data returned from the server to update the state
            // Note: Check if your server returns { user: ... } or just the user object
            setUsers((prevUsers) =>
                prevUsers.map((u) => (u._id === id ? (res.user || res) : u))
            );

            alert("Update successful!");
        } catch (error) {
            console.error("Failed to update user:", error);
            alert(`Failed to update: ${error.message}`);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <div className="list-wrapper">
                <div className="list-card">
                    <div className="list-header">
                        <h2 className="list-title">Users Directory</h2>
                        <span style={{ color: "#64748b", fontSize: "14px" }}>
                            Total: {users.length}
                        </span>
                    </div>

                    {users.length > 0 ? (
                        users.map((user) => (
                            <div key={user._id} className="user-item">
                                <div className="user-info">
                                    <span className="user-name">{user.name}</span>
                                    <span className="user-email">{user.email}</span>
                                </div>

                                <div className="action-group">
                                    <button
                                        className="btn-edit"
                                        onClick={() => handleUpdate(user._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: "center", color: "#94a3b8" }}>No users found.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Users;
