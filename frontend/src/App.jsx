import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Board from './pages/Board';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div
        className="
          min-h-screen
          flex
          flex-col
          bg-slate-50
          font-sans
          text-slate-900
          antialiased
        "
      >

        {/* ================= NAVBAR ================= */}

        <Navbar />

        {/* ================= MAIN CONTENT ================= */}

        <main
          className="
            flex-1
            w-full
          "
        >
          <Routes>

            {/* Dashboard */}

            <Route
              path="/"
              element={<Dashboard />}
            />

            {/* Project Board */}

            <Route
              path="/board/:id"
              element={<Board />}
            />

            {/* Authentication */}

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;