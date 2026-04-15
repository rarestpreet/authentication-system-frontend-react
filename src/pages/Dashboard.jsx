import { useState, useEffect } from "react"
import { useAppContext } from "../context/AppContext.js"
import apiMethod from "../services/api.js"
import handleToast from "../util/toast.js"

const Dashboard = () => {
    const { userData } = useAppContext()
    const [todos, setTodos] = useState([])
    const [newTask, setNewTask] = useState("")
    const [editingTodo, setEditingTodo] = useState(null)
    const [editTask, setEditTask] = useState("")

    useEffect(() => {
        if (userData?.username) {
            fetchTodos()
        }
    }, [userData])

    const fetchTodos = async () => {
        const data = await apiMethod.getTodos()
        setTodos(data)
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        if (!newTask.trim()) return

        try {
            await apiMethod.createTodo(newTask)
            setNewTask("")
            fetchTodos()
        } catch (ex) {
            // Error handled in apiMethod
        }
    }

    const handleEditStart = (todo) => {
        setEditingTodo(todo.id)
        setEditTask(todo.task)
    }

    const handleEditSave = async (id) => {
        if (!editTask.trim()) {
            handleToast.notifyError("Task cannot be empty")
            return
        }
        try {
            await apiMethod.updateTodo(id, editTask)
            setEditingTodo(null)
            fetchTodos()
        } catch (ex) {
            // Error handled in apiMethod
        }
    }

    const handleDelete = async (id) => {
        try {
            await apiMethod.deleteTodo(id)
            fetchTodos()
        } catch (ex) {
            // Error handled in apiMethod
        }
    }

    return (
        <div className="min-vh-100 p-4" style={{ backgroundColor: "var(--bg-primary)" }}>
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h1 className="text-white fw-bold mb-1">
                            Welcome back, <span className="text-gradient">{userData?.username}</span>!
                        </h1>
                        <p className="text-secondary mb-0">Manage your tasks for today.</p>
                    </div>
                    <span className="badge p-2 fs-6" style={{ backgroundColor: "var(--bg-tertiary)", color: "var(--text-primary)" }}>
                        {userData?.role}
                    </span>
                </div>

                <div className="glass-panel p-4 mb-5 shadow-lg">
                    <form onSubmit={handleCreate} className="d-flex gap-3">
                        <input
                            type="text"
                            className="input-field"
                            placeholder="What needs to be done?"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                        <button type="submit" className="btn-primary flex-shrink-0" style={{ padding: "0.75rem 2rem" }}>
                            Add Task
                        </button>
                    </form>
                </div>

                <div className="row g-4">
                    {todos.length === 0 ? (
                        <div className="col-12 text-center py-5">
                            <p className="text-muted fs-5">No tasks found. Create one above!</p>
                        </div>
                    ) : (
                        todos.map(todo => (
                            <div className="col-md-6 col-lg-4" key={todo.id}>
                                <div className="glass-panel p-4 h-100 d-flex flex-column todo-card">
                                    {editingTodo === todo.id ? (
                                        <div className="d-flex flex-column gap-3 h-100">
                                            <textarea
                                                className="input-field flex-grow-1"
                                                value={editTask}
                                                onChange={(e) => setEditTask(e.target.value)}
                                                rows="3"
                                                style={{ resize: 'none' }}
                                            />
                                            <div className="d-flex gap-2 justify-content-end mt-auto">
                                                <button
                                                    onClick={() => setEditingTodo(null)}
                                                    className="btn btn-sm btn-secondary"
                                                    style={{ backgroundColor: "var(--bg-tertiary)", border: "none" }}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => handleEditSave(todo.id)}
                                                    className="btn btn-sm btn-primary"
                                                    style={{ backgroundColor: "var(--success)", border: "none" }}
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="d-flex flex-column h-100">
                                            <p className="text-white flex-grow-1 fs-5 mb-4" style={{ lineHeight: "1.5" }}>
                                                {todo.task}
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center mt-auto border-top pt-3" style={{ borderColor: "var(--border-color) !important" }}>
                                                <small className="text-secondary">{todo.createdAt}</small>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        onClick={() => handleEditStart(todo)}
                                                        className="btn btn-sm"
                                                        style={{ color: "var(--text-secondary)", backgroundColor: "var(--bg-tertiary)" }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(todo.id)}
                                                        className="btn btn-sm text-white"
                                                        style={{ backgroundColor: "var(--danger)" }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
