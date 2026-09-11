# 📋 TaskFlow Pro - Collaborative Project Management Tool

A modern, full-stack collaborative project management application inspired by Trello and Asana, built as part of the **CodeAlpha Full-Stack Web Development Internship (Task 3)**[cite: 1].

---

## ✨ Features

- **Group Project Workspaces:** Create and manage collaborative team projects with full ownership and member access controls[cite: 1].
- **Interactive Kanban Boards:** Organize project workflows across dynamic columns (`To Do`, `In Progress`, `Done`)[cite: 1].
- **Task Cards & Metadata:** Create task cards with title, description, priority tags (Low, Medium, High), and assignees[cite: 1].
- **Task Communication:** In-card commenting system allowing team members to communicate, share status updates, and view activity history[cite: 1].
- **Role-Based Authentication:** Secure user registration and login using JWT (JSON Web Tokens) and bcrypt password encryption[cite: 1].
- **Responsive UI:** Clean, modern interface designed with Tailwind CSS and Lucide React icons.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS (v4)
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **HTTP Client:** Axios

### **Backend**
- **Runtime:** Node.js[cite: 1]
- **Framework:** Express.js[cite: 1]
- **Database:** MongoDB (Mongoose ODM)[cite: 1]
- **Authentication:** JWT, bcryptjs[cite: 1]
- **Environment Handling:** Dotenv, CORS

---

## 📁 Project Structure

```text
CodeAlpha_ProjectManagementTool/
├── BackEnd/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Project.js
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   └── taskRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── FrontEnd/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Board.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
└── README.md

## 🚀 Getting Started

### 1. Prerequisites
* **Node.js** (v18+)
* **MongoDB** (Running locally or MongoDB Atlas connection URI)

---

### 2. Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd BackEnd

Install dependencies:

```bash
npm install
```

Configure Environment Variables:
Create a .env file in the BackEnd/ root directory:

```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/codealpha_ecommerce
JWT_SECRET=super_secret_jwt_key_2026
```

sample catalog data:

```bash
sample catalog data:
```

Start the backend development server:

```bash
npm run dev
```
Backend runs on http://localhost:5000.

3. **Frontend Setup**
Open a new terminal and navigate to the frontend directory:
```bash
cd FrontEnd

Install dependencies:

```bash
npm install
```

Start Vite dev server:

```bash
npm run dev
```
Frontend runs on http://localhost:5173.

## 📡 REST API Endpoints

### **Overview**

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login & receive JWT token | No |
| `GET` | `/api/auth/users` | Fetch registered team members | Yes (`Bearer <token>`) |
| `GET` | `/api/projects` | Fetch all user project workspaces | Yes (`Bearer <token>`) |
| `POST` | `/api/projects` | Create a new project workspace | Yes (`Bearer <token>`) |
| `GET` | `/api/tasks/project/:projectId` | Fetch tasks by project ID | Yes (`Bearer <token>`) |
| `POST` | `/api/tasks` | Create a new task card | Yes (`Bearer <token>`) |
| `PATCH` | `/api/tasks/:id/status` | Update task workflow status | Yes (`Bearer <token>`) |
| `POST` | `/api/tasks/:id/comments` | Add comment to a task | Yes (`Bearer <token>`) |

---

## 👨‍💻 Developer

**Krishna Mahatma**
Project: CodeAlpha Full-Stack Internship (Task 3 - Project Management Tool)
Date: August 2026