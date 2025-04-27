
# 🚀 Full Stack Project

A full-stack web application built with **Node.js** (Express) for the backend and **React** (Vite) for the frontend.  
Database used is **MongoDB Atlas**.

---

![Node.js](https://img.shields.io/badge/Backend-Node.js-green) ![React](https://img.shields.io/badge/Frontend-React-blue) ![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)

---

## 🏗 Project Structure

```
/backend   → Node.js + Express server
/frontend  → React (Vite) frontend
```

---

## 📋 Requirements

- Node.js (v16 or above)
- NPM
- MongoDB Atlas account

---

## 🛠 Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### ➡ Environment Variables

Create a `.env` file inside `backend/` folder with the following:

```env
MONGO_URI=your-mongodb-atlas-connection-string
```

(Replace `your-mongodb-atlas-connection-string` with your actual MongoDB URI.)

---

#### ▶ Run the Backend Server

```bash
npm start
```

- Server will run at: `http://localhost:5000` (default)

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

---

#### ▶ Run the Frontend App

```bash
npm run dev
```

- Frontend will run at: `http://localhost:5173` (default)

---

## ⚙ Project Flow

1. Start the backend server first.
2. Then start the frontend app.
3. Make sure your backend URL is properly set in the frontend while making API requests.

---

## 🌐 Tech Stack

| Technology | Purpose |
|------------|---------|
| React (Vite) | Frontend |
| Node.js + Express | Backend |
| MongoDB Atlas | Database |

---

## 📢 Important Points

- Update API URLs correctly in frontend if backend is deployed separately.
- Ensure network/firewall settings allow MongoDB Atlas connection.

---

## 👨‍💻 Author

- [Suraj Omar](https://github.com/suraj5621)

