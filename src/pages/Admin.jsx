import { useState, useEffect } from "react"
import apiMethod from "../services/api.js"

const Admin = () => {
    const [users, setUsers] = useState([])
    const [todos, setTodos] = useState([])
    const [activeTab, setActiveTab] = useState("users")

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const usersData = await apiMethod.getAllUsersAdmin()
            setUsers(usersData)

            const todosData = await apiMethod.getAllTodosAdmin()
            setTodos(todosData)
        } catch (e) {
            // Error handled in apiMethod
        }
    }

    return (
        <div className="min-vh-100 p-4" style={{ backgroundColor: "var(--bg-primary)" }}>
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-4" style={{ borderColor: "var(--border-color) !important" }}>
                    <div>
                        <h1 className="text-white fw-bold mb-2">Admin Dashboard</h1>
                        <p className="text-secondary mb-0">Manage system users and all tasks.</p>
                    </div>
                </div>

                <div className="d-flex gap-3 mb-4">
                    <button
                        className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ backgroundColor: activeTab === 'users' ? 'var(--accent-primary)' : 'var(--bg-tertiary)', border: 'none' }}
                        onClick={() => setActiveTab('users')}
                    >
                        Users Management
                    </button>
                    <button
                        className={`btn ${activeTab === 'todos' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ backgroundColor: activeTab === 'todos' ? 'var(--accent-primary)' : 'var(--bg-tertiary)', border: 'none' }}
                        onClick={() => setActiveTab('todos')}
                    >
                        All Tasks
                    </button>
                </div>

                {activeTab === 'users' && (
                    <div className="glass-panel p-0 overflow-hidden shadow-lg">
                        <div className="table-responsive">
                            <table className="table table-dark table-hover mb-0" style={{ backgroundColor: "transparent" }}>
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 border-bottom" style={{ borderColor: "var(--border-color)" }}>ID</th>
                                        <th className="px-4 py-3 border-bottom" style={{ borderColor: "var(--border-color)" }}>Username</th>
                                        <th className="px-4 py-3 border-bottom" style={{ borderColor: "var(--border-color)" }}>Email</th>
                                        <th className="px-4 py-3 border-bottom" style={{ borderColor: "var(--border-color)" }}>Role</th>
                                        <th className="px-4 py-3 border-bottom" style={{ borderColor: "var(--border-color)" }}>Status</th>
                                        <th className="px-4 py-3 border-bottom" style={{ borderColor: "var(--border-color)" }}>Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.userId}>
                                            <td className="px-4 py-3 text-secondary">{user.userId}</td>
                                            <td className="px-4 py-3 text-white">{user.username}</td>
                                            <td className="px-4 py-3 text-secondary">{user.email}</td>
                                            <td className="px-4 py-3">
                                                <span className={`badge ${user.role === 'ADMIN' ? 'bg-danger' : 'bg-primary'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                {user.isAccountVerified ?
                                                    <span className="text-success">Verified</span> :
                                                    <span className="text-warning">Unverified</span>}
                                            </td>
                                            <td className="px-4 py-3 text-secondary">{user.createdAt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'todos' && (
                    <div className="glass-panel p-0 overflow-hidden shadow-lg">
                        <div className="table-responsive">
                            <table className="table table-dark table-hover mb-0" style={{ backgroundColor: "transparent" }}>
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 border-bottom" style={{ borderColor: "var(--border-color)" }}>Task ID</th>
                                        <th className="px-4 py-3 border-bottom" style={{ borderColor: "var(--border-color)" }}>Task</th>
                                        <th className="px-4 py-3 border-bottom" style={{ borderColor: "var(--border-color)" }}>Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todos.map(todo => (
                                        <tr key={todo.id}>
                                            <td className="px-4 py-3 text-secondary" style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis" }}>{todo.id}</td>
                                            <td className="px-4 py-3 text-white fw-medium">{todo.task}</td>
                                            <td className="px-4 py-3 text-secondary">{todo.createdAt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Admin
