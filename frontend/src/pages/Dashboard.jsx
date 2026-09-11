
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import {
  FolderKanban,
  Plus,
  Users,
  ArrowRight,
  X,
  Sparkles,
} from 'lucide-react';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    fetchProjects();
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/projects', formData);

      setProjects([...projects, res.data]);

      setShowModal(false);

      setFormData({
        title: '',
        description: '',
      });
    } catch (err) {
      alert(
        err.response?.data?.message ||
        'Failed to create project'
      );
    }
  };

  const closeModal = () => {
    setShowModal(false);

    setFormData({
      title: '',
      description: '',
    });
  };

  /* Loading */

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-11 w-11 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>

          <p className="text-sm font-medium text-slate-500">
            Loading your projects...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Dashboard */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

        {/* Header */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <Sparkles className="w-4 h-4" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Workspace
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Project Boards
            </h1>

            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Manage team projects, cards, and workflows
            </p>
          </div>

          {/* New Project Button */}

          <button
            onClick={() => setShowModal(true)}
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              bg-indigo-600
              hover:bg-indigo-500
              text-white
              px-5
              py-3
              rounded-xl
              text-sm
              font-semibold
              shadow-lg
              shadow-indigo-600/20
              hover:shadow-indigo-600/30
              hover:-translate-y-0.5
              transition-all
              duration-200
              cursor-pointer
            "
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />

            New Project
          </button>
        </div>

        {/* Project Count */}

        {projects.length > 0 && (
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                Your Projects
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                {projects.length}{' '}
                {projects.length === 1
                  ? 'project'
                  : 'projects'}{' '}
                available
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}

        {projects.length === 0 ? (
          <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm">

            {/* Decorative background */}

            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-indigo-100/60 blur-3xl"></div>

            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-purple-100/50 blur-3xl"></div>

            <div className="relative max-w-lg mx-auto p-10 sm:p-16 text-center">

              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                <FolderKanban className="w-10 h-10" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                No Projects Yet
              </h3>

              <p className="text-sm leading-6 text-slate-500 mb-7">
                Create your first collaborative project board
                and start organizing tasks with your team.
              </p>

              <button
                onClick={() => setShowModal(true)}
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-indigo-600
                  hover:bg-indigo-500
                  text-white
                  px-5
                  py-2.5
                  rounded-xl
                  text-sm
                  font-semibold
                  shadow-lg
                  shadow-indigo-600/20
                  transition
                  cursor-pointer
                "
              >
                <Plus className="w-4 h-4" />

                Create Your First Project
              </button>
            </div>
          </div>
        ) : (

          /* Project Cards */

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">

            {projects.map((project) => (
              <div
                key={project._id}
                className="
                  group
                  relative
                  overflow-hidden
                  bg-white
                  rounded-2xl
                  border
                  border-slate-200/80
                  p-6
                  shadow-sm
                  hover:shadow-xl
                  hover:shadow-indigo-100/50
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  flex
                  flex-col
                  justify-between
                "
              >

                {/* Top Accent */}

                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div>

                  {/* Icon + Members */}

                  <div className="flex items-center justify-between mb-5">

                    <span
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-indigo-50
                        text-indigo-600
                        group-hover:bg-indigo-600
                        group-hover:text-white
                        group-hover:scale-105
                        transition-all
                        duration-300
                      "
                    >
                      <FolderKanban className="w-5 h-5" />
                    </span>

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        bg-slate-100
                        text-slate-600
                        font-semibold
                        px-2.5
                        py-1.5
                        rounded-lg
                        text-xs
                      "
                    >
                      <Users className="w-3.5 h-3.5" />

                      {(project.members?.length || 0) + 1}
                    </span>
                  </div>

                  {/* Project Name */}

                  <h3
                    className="
                      text-lg
                      font-bold
                      text-slate-900
                      mb-2
                      group-hover:text-indigo-600
                      transition-colors
                    "
                  >
                    {project.title}
                  </h3>

                  {/* Description */}

                  <p className="text-slate-500 text-sm leading-6 line-clamp-2 mb-7">
                    {project.description ||
                      'No description provided.'}
                  </p>
                </div>

                {/* Open Board */}

                <Link
                  to={`/board/${project._id}`}
                  className="
                    group/link
                    flex
                    items-center
                    justify-between
                    border-t
                    border-slate-100
                    pt-4
                    mt-2
                    text-sm
                    font-semibold
                    text-indigo-600
                    hover:text-indigo-700
                  "
                >
                  <span>
                    Open Kanban Board
                  </span>

                  <span
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-lg
                      bg-indigo-50
                      group-hover/link:bg-indigo-600
                      group-hover/link:text-white
                      transition-all
                    "
                  >
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Project Modal */}

      {showModal && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-slate-950/50
            backdrop-blur-sm
            p-4
          "
          onClick={closeModal}
        >
          <div
            className="
              relative
              w-full
              max-w-md
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-2xl
              animate-[fadeIn_0.2s_ease-out]
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Create New Project
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  Set up a new workspace for your team.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  hover:bg-slate-100
                  hover:text-slate-700
                  transition
                  cursor-pointer
                "
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}

            <form
              onSubmit={handleCreateProject}
              className="p-6 space-y-5"
            >

              {/* Title */}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600 mb-2">
                  Project Title
                </label>

                <input
                  type="text"
                  required
                  className="
                    w-full
                    px-4
                    py-3
                    bg-slate-50
                    border
                    border-slate-200
                    rounded-xl
                    text-sm
                    text-slate-900
                    placeholder:text-slate-400
                    focus:bg-white
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-500/10
                    transition
                  "
                  placeholder="e.g. Website Redesign"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              {/* Description */}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600 mb-2">
                  Description
                </label>

                <textarea
                  rows="4"
                  className="
                    w-full
                    resize-none
                    px-4
                    py-3
                    bg-slate-50
                    border
                    border-slate-200
                    rounded-xl
                    text-sm
                    text-slate-900
                    placeholder:text-slate-400
                    focus:bg-white
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-500/10
                    transition
                  "
                  placeholder="Goals and objectives of this project..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={closeModal}
                  className="
                    px-4
                    py-2.5
                    rounded-xl
                    text-sm
                    font-semibold
                    text-slate-600
                    hover:bg-slate-100
                    transition
                    cursor-pointer
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-5
                    py-2.5
                    rounded-xl
                    bg-indigo-600
                    hover:bg-indigo-500
                    text-white
                    text-sm
                    font-semibold
                    shadow-lg
                    shadow-indigo-600/20
                    transition
                    cursor-pointer
                  "
                >
                  <Plus className="w-4 h-4" />

                  Create Project
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;