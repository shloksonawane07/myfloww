import React, { useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [showCreateTask, setShowCreateTask] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete project proposal",
      description: "Prepare the final project proposal document.",
      priority: "High",
      status: "In Progress",
      assignee: "John",
      dueDate: "2026-09-30",
    },
    {
      id: 2,
      title: "Client meeting",
      description: "Discuss project requirements with client.",
      priority: "Medium",
      status: "Pending",
      assignee: "Sarah",
      dueDate: "2026-10-02",
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    assignee: "John",
    dueDate: "",
  });

  const handleChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTask = (e) => {
    e.preventDefault();

    if (!newTask.title.trim()) {
      alert("Please enter a task title");
      return;
    }

    const task = {
      id: Date.now(),
      ...newTask,
    };

    setTasks((oldTasks) => [task, ...oldTasks]);

    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
      assignee: "John",
      dueDate: "",
    });

    setShowCreateTask(false);
    setActivePage("Tasks");
  };

  const deleteTask = (id) => {
    setTasks((oldTasks) =>
      oldTasks.filter((task) => task.id !== id)
    );
  };

  const changeStatus = (id, status) => {
    setTasks((oldTasks) =>
      oldTasks.map((task) =>
        task.id === id
          ? { ...task, status }
          : task
      )
    );
  };

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">W</div>
          <span>Workflow</span>
        </div>

        <div className="workspace-title">
          MY WORKSPACE
        </div>

        <nav>
          <button
            className={
              activePage === "Dashboard"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActivePage("Dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className={
              activePage === "Tasks"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActivePage("Tasks")}
          >
            <span>✓</span>
            Tasks
            <b>{tasks.length}</b>
          </button>

          <button
            className={
              activePage === "Projects"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActivePage("Projects")}
          >
            <span>▣</span>
            Projects
          </button>

          <button
            className={
              activePage === "Team"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActivePage("Team")}
          >
            <span>♙</span>
            Team
          </button>

          <button
            className={
              activePage === "Reports"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActivePage("Reports")}
          >
            <span>▥</span>
            Reports
          </button>

          <button
            className={
              activePage === "Settings"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActivePage("Settings")}
          >
            <span>⚙</span>
            Settings
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-box">
            <strong>Upgrade workspace</strong>
            <p>
              Unlock more features and
              unlimited tasks.
            </p>
            <button>Upgrade</button>
          </div>

          <div className="profile">
            <div className="avatar">A</div>
            <div>
              <strong>Admin</strong>
              <small>admin@example.com</small>
            </div>
            <span>•••</span>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">

        {/* TOPBAR */}
        <header className="topbar">
          <div className="breadcrumb">
            Workspace / <strong>{activePage}</strong>
          </div>

          <div className="topbar-right">
            <div className="search">
              🔍
              <input
                placeholder="Search..."
              />
            </div>

            <button className="icon-button">
              🔔
            </button>

            <button
              className="new-task-btn"
              onClick={() => setShowCreateTask(true)}
            >
              + New Task
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <section className="content">

          {activePage === "Dashboard" && (
            <>
              <div className="page-header">
                <div>
                  <h1>Good morning, Admin 👋</h1>
                  <p>
                    Here's what's happening in your
                    workspace today.
                  </p>
                </div>

                <button
                  className="primary-btn"
                  onClick={() => setShowCreateTask(true)}
                >
                  + Create Task
                </button>
              </div>

              {/* STATS */}
              <div className="stats">

                <div className="stat-card">
                  <div className="stat-icon purple">
                    ✓
                  </div>
                  <div>
                    <span>Total Tasks</span>
                    <strong>{totalTasks}</strong>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon orange">
                    ◷
                  </div>
                  <div>
                    <span>Pending</span>
                    <strong>{pendingTasks}</strong>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon blue">
                    ↗
                  </div>
                  <div>
                    <span>In Progress</span>
                    <strong>{progressTasks}</strong>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon green">
                    ✓
                  </div>
                  <div>
                    <span>Completed</span>
                    <strong>{completedTasks}</strong>
                  </div>
                </div>

              </div>

              <div className="dashboard-grid">

                {/* RECENT TASKS */}
                <div className="card">
                  <div className="card-header">
                    <div>
                      <h2>Recent Tasks</h2>
                      <p>Your latest workspace tasks</p>
                    </div>

                    <button
                      className="link-btn"
                      onClick={() =>
                        setActivePage("Tasks")
                      }
                    >
                      View all →
                    </button>
                  </div>

                  <div className="task-list">
                    {tasks.slice(0, 5).map((task) => (
                      <Task
                        key={task.id}
                        task={task}
                        onDelete={deleteTask}
                        onStatusChange={changeStatus}
                      />
                    ))}
                  </div>
                </div>

                {/* ACTIVITY */}
                <div className="card">
                  <div className="card-header">
                    <div>
                      <h2>Activity</h2>
                      <p>Latest workspace activity</p>
                    </div>
                  </div>

                  <div className="activity">
                    <div className="activity-icon">
                      +
                    </div>
                    <div>
                      <strong>Workspace active</strong>
                      <p>Tasks are being managed</p>
                      <small>Just now</small>
                    </div>
                  </div>

                  <div className="activity">
                    <div className="activity-icon">
                      ✓
                    </div>
                    <div>
                      <strong>
                        Task management
                      </strong>
                      <p>
                        Keep your workflow organized
                      </p>
                      <small>Today</small>
                    </div>
                  </div>
                </div>

              </div>

              {/* QUICK ACTIONS */}
              <div className="card quick-card">
                <div className="card-header">
                  <div>
                    <h2>Quick Actions</h2>
                    <p>Manage your workspace faster</p>
                  </div>
                </div>

                <div className="quick-actions">
                  <button
                    onClick={() =>
                      setShowCreateTask(true)
                    }
                  >
                    <span>+</span>
                    <strong>Create Task</strong>
                    <small>
                      Add a new task
                    </small>
                  </button>

                  <button
                    onClick={() =>
                      setActivePage("Tasks")
                    }
                  >
                    <span>✓</span>
                    <strong>View Tasks</strong>
                    <small>
                      Manage all tasks
                    </small>
                  </button>

                  <button
                    onClick={() =>
                      setActivePage("Team")
                    }
                  >
                    <span>♙</span>
                    <strong>Team</strong>
                    <small>
                      Manage your team
                    </small>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* TASKS PAGE */}
          {activePage === "Tasks" && (
            <>
              <div className="page-header">
                <div>
                  <h1>Tasks</h1>
                  <p>
                    Manage and track all your tasks.
                  </p>
                </div>

                <button
                  className="primary-btn"
                  onClick={() => setShowCreateTask(true)}
                >
                  + Create Task
                </button>
              </div>

              <div className="card">

                <div className="tasks-toolbar">
                  <input
                    className="task-search"
                    placeholder="Search tasks..."
                  />

                  <select>
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>

                  <select>
                    <option>All Priority</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div className="task-list">
                  {tasks.length === 0 ? (
                    <div className="empty">
                      <div>✓</div>
                      <h3>No tasks yet</h3>
                      <p>
                        Create your first task to get
                        started.
                      </p>
                      <button
                        className="primary-btn"
                        onClick={() =>
                          setShowCreateTask(true)
                        }
                      >
                        + Create Task
                      </button>
                    </div>
                  ) : (
                    tasks.map((task) => (
                      <Task
                        key={task.id}
                        task={task}
                        onDelete={deleteTask}
                        onStatusChange={changeStatus}
                      />
                    ))
                  )}
                </div>

              </div>
            </>
          )}

          {/* OTHER PAGES */}
          {activePage === "Projects" && (
            <SimplePage
              title="Projects"
              text="Manage your projects here."
            />
          )}

          {activePage === "Team" && (
            <SimplePage
              title="Team"
              text="Manage your team members here."
            />
          )}

          {activePage === "Reports" && (
            <SimplePage
              title="Reports"
              text="View workspace reports here."
            />
          )}

          {activePage === "Settings" && (
            <SimplePage
              title="Settings"
              text="Configure your workspace settings."
            />
          )}

        </section>
      </main>

      {/* CREATE TASK MODAL */}
      {showCreateTask && (
        <div
          className="modal-overlay"
          onClick={() => setShowCreateTask(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>Create New Task</h2>
                <p>
                  Add a new task to your workspace.
                </p>
              </div>

              <button
                className="close-btn"
                onClick={() =>
                  setShowCreateTask(false)
                }
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateTask}>

              <label>Task Title</label>
              <input
                name="title"
                value={newTask.title}
                onChange={handleChange}
                placeholder="Enter task title"
              />

              <label>Description</label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleChange}
                placeholder="Enter task description"
              />

              <div className="form-row">

                <div>
                  <label>Priority</label>
                  <select
                    name="priority"
                    value={newTask.priority}
                    onChange={handleChange}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div>
                  <label>Status</label>
                  <select
                    name="status"
                    value={newTask.status}
                    onChange={handleChange}
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>

              </div>

              <div className="form-row">

                <div>
                  <label>Assignee</label>
                  <select
                    name="assignee"
                    value={newTask.assignee}
                    onChange={handleChange}
                  >
                    <option>John</option>
                    <option>Sarah</option>
                    <option>Admin</option>
                  </select>
                </div>

                <div>
                  <label>Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={newTask.dueDate}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowCreateTask(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  Create Task
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

function Task({
  task,
  onDelete,
  onStatusChange,
}) {
  return (
    <div className="task">

      <div className="task-check">
        {task.status === "Completed"
          ? "✓"
          : "○"}
      </div>

      <div className="task-main">
        <div className="task-title">
          {task.title}
        </div>

        <div className="task-description">
          {task.description || "No description"}
        </div>

        <div className="task-meta">

          <span
            className={`priority ${task.priority.toLowerCase()}`}
          >
            {task.priority}
          </span>

          <span>
            👤 {task.assignee}
          </span>

          {task.dueDate && (
            <span>
              📅 {formatDate(task.dueDate)}
            </span>
          )}

        </div>
      </div>

      <select
        className="status-select"
        value={task.status}
        onChange={(e) =>
          onStatusChange(
            task.id,
            e.target.value
          )
        }
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
      >
        🗑
      </button>

    </div>
  );
}

function SimplePage({ title, text }) {
  return (
    <div className="simple-page">
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}

function formatDate(date) {
  const d = new Date(date + "T00:00:00");

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default App;