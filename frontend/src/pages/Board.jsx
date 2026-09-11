import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import {
  Plus,
  MessageSquare,
  ChevronRight,
  CheckCircle2,
  CircleDot,
  Clock,
  ArrowLeft,
  X,
  Users,
  Layers3,
  ClipboardList,
} from 'lucide-react';

const COLUMNS = ['To Do', 'In Progress', 'Done'];

const Board = () => {
  const { id: projectId } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [showTaskModal, setShowTaskModal] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Medium',
    assignedTo: '',
  });

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      const [projRes, tasksRes, usersRes] = await Promise.all([
        API.get(`/projects/${projectId}`),
        API.get(`/tasks/project/${projectId}`),
        API.get('/auth/users'),
      ]);

      setProject(projRes.data);
      setTasks(tasksRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/tasks', {
        ...newTask,
        project: projectId,
      });

      setTasks([res.data, ...tasks]);

      setShowTaskModal(false);

      setNewTask({
        title: '',
        description: '',
        status: 'To Do',
        priority: 'Medium',
        assignedTo: '',
      });
    } catch (err) {
      alert('Failed to add task');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const res = await API.patch(
        `/tasks/${taskId}/status`,
        { status: newStatus }
      );

      setTasks(
        tasks.map((t) =>
          t._id === taskId ? res.data : t
        )
      );

      if (selectedTask?._id === taskId) {
        setSelectedTask(res.data);
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    try {
      const res = await API.post(
        `/tasks/${selectedTask._id}/comments`,
        { text: newComment }
      );

      setTasks(
        tasks.map((t) =>
          t._id === selectedTask._id ? res.data : t
        )
      );

      setSelectedTask(res.data);
      setNewComment('');
    } catch (err) {
      alert('Failed to add comment');
    }
  };

  const getPriorityBadge = (priority) => {
    const map = {
      High: 'bg-red-50 text-red-700 border-red-200',
      Medium: 'bg-amber-50 text-amber-700 border-amber-200',
      Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };

    return (
      map[priority] ||
      'bg-slate-50 text-slate-700 border-slate-200'
    );
  };

  const getColumnStyle = (column) => {
    const styles = {
      'To Do': {
        wrapper:
          'bg-slate-100/80 border-slate-200',
        icon:
          'bg-slate-200 text-slate-600',
        count:
          'bg-white text-slate-600',
      },

      'In Progress': {
        wrapper:
          'bg-amber-50/70 border-amber-100',
        icon:
          'bg-amber-100 text-amber-600',
        count:
          'bg-white text-amber-700',
      },

      Done: {
        wrapper:
          'bg-emerald-50/60 border-emerald-100',
        icon:
          'bg-emerald-100 text-emerald-600',
        count:
          'bg-white text-emerald-700',
      },
    };

    return styles[column];
  };

  const getColumnIcon = (column) => {
    if (column === 'To Do') {
      return <CircleDot className="w-4 h-4" />;
    }

    if (column === 'In Progress') {
      return <Clock className="w-4 h-4" />;
    }

    return <CheckCircle2 className="w-4 h-4" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mb-8">

        <Link
          to="/"
          className="
            inline-flex
            items-center
            gap-1.5
            text-xs
            font-semibold
            text-slate-500
            hover:text-indigo-600
            mb-4
            transition
          "
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Dashboard
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

          <div>

            <div className="flex items-center gap-2 mb-2">

              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-indigo-100
                  text-indigo-600
                "
              >
                <Layers3 className="w-4 h-4" />
              </div>

              <span
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-indigo-600
                "
              >
                Project Board
              </span>

            </div>

            <h1
              className="
                text-3xl
                sm:text-4xl
                font-extrabold
                tracking-tight
                text-slate-900
              "
            >
              {project?.title || 'Project Board'}
            </h1>

            <p className="text-sm text-slate-500 mt-2 max-w-2xl">
              {project?.description ||
                'Manage your project tasks and keep your team workflow organized.'}
            </p>

          </div>

          <button
            onClick={() => setShowTaskModal(true)}
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
              shrink-0
            "
          >
            <Plus
              className="
                w-4
                h-4
                group-hover:rotate-90
                transition-transform
                duration-200
              "
            />

            Add Task Card
          </button>

        </div>
      </div>

      {/* =====================================================
          BOARD SUMMARY
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          gap-3
          mb-6
        "
      >

        <div
          className="
            bg-white
            border
            border-slate-200
            rounded-xl
            px-4
            py-3
            shadow-sm
          "
        >
          <div className="flex items-center gap-2">

            <ClipboardList className="w-4 h-4 text-indigo-500" />

            <span className="text-xs font-semibold text-slate-500">
              Total Tasks
            </span>

          </div>

          <p className="text-xl font-bold text-slate-900 mt-1">
            {tasks.length}
          </p>
        </div>

        <div
          className="
            bg-white
            border
            border-slate-200
            rounded-xl
            px-4
            py-3
            shadow-sm
          "
        >
          <div className="flex items-center gap-2">

            <Users className="w-4 h-4 text-indigo-500" />

            <span className="text-xs font-semibold text-slate-500">
              Members
            </span>

          </div>

          <p className="text-xl font-bold text-slate-900 mt-1">
            {users.length}
          </p>
        </div>

        <div
          className="
            hidden
            sm:block
            bg-white
            border
            border-slate-200
            rounded-xl
            px-4
            py-3
            shadow-sm
          "
        >
          <div className="flex items-center gap-2">

            <CheckCircle2 className="w-4 h-4 text-emerald-500" />

            <span className="text-xs font-semibold text-slate-500">
              Completed
            </span>

          </div>

          <p className="text-xl font-bold text-slate-900 mt-1">
            {tasks.filter((t) => t.status === 'Done').length}
          </p>
        </div>

      </div>

      {/* =====================================================
          KANBAN BOARD
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-5
          lg:gap-6
          items-start
        "
      >

        {COLUMNS.map((col) => {

          const colTasks = tasks.filter(
            (t) => t.status === col
          );

          const style = getColumnStyle(col);

          return (
            <div
              key={col}
              className={`
                ${style.wrapper}
                rounded-2xl
                border
                p-4
                min-h-[420px]
              `}
            >

              {/* Column Header */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-4
                "
              >

                <div className="flex items-center gap-2.5">

                  <div
                    className={`
                      ${style.icon}
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                    `}
                  >
                    {getColumnIcon(col)}
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-slate-800">
                      {col}
                    </h3>

                    <p className="text-[10px] text-slate-400">
                      {col === 'To Do'
                        ? 'Upcoming work'
                        : col === 'In Progress'
                          ? 'Currently working'
                          : 'Completed work'}
                    </p>
                  </div>

                </div>

                <span
                  className={`
                    ${style.count}
                    min-w-7
                    text-center
                    text-xs
                    font-bold
                    px-2
                    py-1
                    rounded-full
                    shadow-sm
                  `}
                >
                  {colTasks.length}
                </span>

              </div>

              {/* Tasks */}

              <div className="space-y-3">

                {colTasks.map((task) => (

                  <div
                    key={task._id}
                    onClick={() => setSelectedTask(task)}
                    className="
                      group
                      relative
                      bg-white
                      p-4
                      rounded-xl
                      border
                      border-slate-200
                      shadow-sm
                      hover:shadow-lg
                      hover:-translate-y-0.5
                      hover:border-indigo-200
                      transition-all
                      duration-200
                      cursor-pointer
                    "
                  >

                    {/* Top Accent */}

                    <div
                      className="
                        absolute
                        left-0
                        top-3
                        bottom-3
                        w-1
                        rounded-r-full
                        bg-indigo-500
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                      "
                    />

                    {/* Priority + User */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-2
                        mb-3
                      "
                    >

                      <span
                        className={`
                          text-[10px]
                          font-bold
                          px-2
                          py-1
                          rounded-md
                          border
                          uppercase
                          tracking-wide
                          ${getPriorityBadge(task.priority)}
                        `}
                      >
                        {task.priority}
                      </span>

                      {task.assignedTo && (
                        <span
                          className="
                            flex
                            items-center
                            gap-1
                            max-w-[110px]
                            bg-indigo-50
                            text-indigo-600
                            border
                            border-indigo-100
                            font-semibold
                            px-2
                            py-1
                            rounded-md
                            text-[10px]
                          "
                        >
                          <span
                            className="
                              flex
                              h-4
                              w-4
                              items-center
                              justify-center
                              rounded-full
                              bg-indigo-200
                              text-indigo-700
                              text-[8px]
                              font-bold
                            "
                          >
                            {task.assignedTo.name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </span>

                          <span className="truncate">
                            {task.assignedTo.name?.split(' ')[0]}
                          </span>
                        </span>
                      )}

                    </div>

                    {/* Title */}

                    <h4
                      className="
                        font-bold
                        text-sm
                        text-slate-900
                        mb-1.5
                        group-hover:text-indigo-600
                        transition-colors
                      "
                    >
                      {task.title}
                    </h4>

                    {/* Description */}

                    <p
                      className="
                        text-xs
                        text-slate-500
                        leading-5
                        line-clamp-2
                        mb-4
                      "
                    >
                      {task.description ||
                        'No description provided.'}
                    </p>

                    {/* Bottom */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        pt-3
                        border-t
                        border-slate-100
                      "
                    >

                      <span
                        className="
                          flex
                          items-center
                          gap-1.5
                          text-[11px]
                          text-slate-400
                          font-medium
                        "
                      >
                        <MessageSquare className="w-3.5 h-3.5" />

                        {task.comments?.length || 0}
                      </span>

                      <span
                        className="
                          text-indigo-600
                          flex
                          items-center
                          gap-0.5
                          text-[11px]
                          font-bold
                          opacity-70
                          group-hover:opacity-100
                          transition
                        "
                      >
                        View

                        <ChevronRight
                          className="
                            w-3.5
                            h-3.5
                            group-hover:translate-x-0.5
                            transition-transform
                          "
                        />
                      </span>

                    </div>

                  </div>

                ))}

                {/* Empty Column */}

                {colTasks.length === 0 && (
                  <div
                    className="
                      flex
                      min-h-[180px]
                      flex-col
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-dashed
                      border-slate-300
                      bg-white/40
                      text-center
                      px-5
                    "
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-white
                        text-slate-400
                        shadow-sm
                        mb-3
                      "
                    >
                      <ClipboardList className="w-5 h-5" />
                    </div>

                    <p className="text-xs font-semibold text-slate-500">
                      No tasks here
                    </p>

                    <p className="text-[10px] text-slate-400 mt-1">
                      Tasks will appear in this column.
                    </p>
                  </div>
                )}

              </div>
            </div>
          );
        })}

      </div>

      {/* =====================================================
          CREATE TASK MODAL
      ====================================================== */}

      {showTaskModal && (
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
          onClick={() => setShowTaskModal(false)}
        >

          <div
            className="
              relative
              w-full
              max-w-lg
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-2xl
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-100
                px-6
                py-5
              "
            >

              <div>

                <div className="flex items-center gap-2 mb-1">

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-indigo-100
                      text-indigo-600
                    "
                  >
                    <Plus className="w-4 h-4" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    Create Task Card
                  </h3>

                </div>

                <p className="text-xs text-slate-500">
                  Add a new task to your project board.
                </p>

              </div>

              <button
                type="button"
                onClick={() => setShowTaskModal(false)}
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

            {/* Form */}

            <form
              onSubmit={handleCreateTask}
              className="p-6 space-y-5"
            >

              {/* Title */}

              <div>

                <label
                  className="
                    block
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-slate-600
                    mb-2
                  "
                >
                  Task Title
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
                  placeholder="e.g. Design login page"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      title: e.target.value,
                    })
                  }
                />

              </div>

              {/* Description */}

              <div>

                <label
                  className="
                    block
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-slate-600
                    mb-2
                  "
                >
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
                  placeholder="Describe what needs to be completed..."
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      description: e.target.value,
                    })
                  }
                />

              </div>

              {/* Priority + Member */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>

                  <label
                    className="
                      block
                      text-xs
                      font-bold
                      uppercase
                      tracking-wide
                      text-slate-600
                      mb-2
                    "
                  >
                    Priority
                  </label>

                  <select
                    className="
                      w-full
                      px-4
                      py-3
                      bg-slate-50
                      border
                      border-slate-200
                      rounded-xl
                      text-sm
                      text-slate-700
                      focus:bg-white
                      focus:border-indigo-500
                      focus:ring-4
                      focus:ring-indigo-500/10
                      transition
                    "
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        priority: e.target.value,
                      })
                    }
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>

                </div>

                <div>

                  <label
                    className="
                      block
                      text-xs
                      font-bold
                      uppercase
                      tracking-wide
                      text-slate-600
                      mb-2
                    "
                  >
                    Assign Member
                  </label>

                  <select
                    className="
                      w-full
                      px-4
                      py-3
                      bg-slate-50
                      border
                      border-slate-200
                      rounded-xl
                      text-sm
                      text-slate-700
                      focus:bg-white
                      focus:border-indigo-500
                      focus:ring-4
                      focus:ring-indigo-500/10
                      transition
                    "
                    value={newTask.assignedTo}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        assignedTo: e.target.value,
                      })
                    }
                  >
                    <option value="">
                      Unassigned
                    </option>

                    {users.map((u) => (
                      <option
                        key={u._id}
                        value={u._id}
                      >
                        {u.name}
                      </option>
                    ))}
                  </select>

                </div>

              </div>

              {/* Buttons */}

              <div
                className="
                  flex
                  justify-end
                  gap-3
                  pt-2
                  border-t
                  border-slate-100
                "
              >

                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
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
                  Create Card
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          TASK DETAILS MODAL
      ====================================================== */}

      {selectedTask && (
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
          onClick={() => setSelectedTask(null)}
        >

          <div
            className="
              relative
              w-full
              max-w-xl
              max-h-[90vh]
              flex
              flex-col
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-2xl
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* Details Header */}

            <div
              className="
                flex
                items-start
                justify-between
                gap-4
                border-b
                border-slate-100
                px-6
                py-5
              "
            >

              <div>

                <span
                  className={`
                    inline-flex
                    text-[10px]
                    font-bold
                    px-2.5
                    py-1
                    rounded-md
                    border
                    uppercase
                    tracking-wide
                    ${getPriorityBadge(selectedTask.priority)}
                  `}
                >
                  {selectedTask.priority} Priority
                </span>

                <h3
                  className="
                    text-xl
                    font-bold
                    text-slate-900
                    mt-2
                  "
                >
                  {selectedTask.title}
                </h3>

              </div>

              <button
                onClick={() => setSelectedTask(null)}
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
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

            {/* Details Content */}

            <div
              className="
                overflow-y-auto
                flex-1
                px-6
                py-5
                space-y-6
              "
            >

              {/* Description */}

              <div>

                <h5
                  className="
                    text-[11px]
                    font-bold
                    text-slate-500
                    uppercase
                    tracking-wider
                    mb-2
                  "
                >
                  Description
                </h5>

                <div
                  className="
                    bg-slate-50
                    border
                    border-slate-100
                    p-4
                    rounded-xl
                  "
                >
                  <p className="text-sm text-slate-600 leading-6">
                    {selectedTask.description ||
                      'No description provided.'}
                  </p>
                </div>

              </div>

              {/* Status */}

              <div>

                <h5
                  className="
                    text-[11px]
                    font-bold
                    text-slate-500
                    uppercase
                    tracking-wider
                    mb-2
                  "
                >
                  Change Status
                </h5>

                <div className="grid grid-cols-3 gap-2">

                  {COLUMNS.map((col) => (

                    <button
                      key={col}
                      onClick={() =>
                        handleStatusChange(
                          selectedTask._id,
                          col
                        )
                      }
                      className={`
                        px-3
                        py-2.5
                        rounded-xl
                        text-xs
                        font-semibold
                        transition
                        cursor-pointer
                        border
                        ${selectedTask.status === col
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/20'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }
                      `}
                    >
                      {col}
                    </button>

                  ))}

                </div>

              </div>

              {/* Comments */}

              <div
                className="
                  border-t
                  border-slate-100
                  pt-5
                "
              >

                <h5
                  className="
                    text-xs
                    font-bold
                    text-slate-600
                    uppercase
                    tracking-wider
                    mb-4
                    flex
                    items-center
                    gap-2
                  "
                >
                  <MessageSquare className="w-4 h-4 text-indigo-500" />

                  Comments & Activity

                  <span
                    className="
                      bg-indigo-50
                      text-indigo-600
                      px-2
                      py-0.5
                      rounded-full
                      text-[10px]
                    "
                  >
                    {selectedTask.comments?.length || 0}
                  </span>
                </h5>

                <div
                  className="
                    space-y-3
                    mb-4
                    max-h-48
                    overflow-y-auto
                    pr-1
                  "
                >

                  {selectedTask.comments?.length > 0 ? (
                    selectedTask.comments.map((c, i) => (

                      <div
                        key={i}
                        className="
                          bg-slate-50
                          p-3
                          rounded-xl
                          border
                          border-slate-100
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            justify-between
                            gap-3
                            mb-1.5
                          "
                        >

                          <span
                            className="
                              text-xs
                              font-bold
                              text-slate-800
                            "
                          >
                            {c.userName}
                          </span>

                          <span
                            className="
                              text-[10px]
                              text-slate-400
                            "
                          >
                            {new Date(
                              c.createdAt
                            ).toLocaleTimeString(
                              [],
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                              }
                            )}
                          </span>

                        </div>

                        <p className="text-xs text-slate-600 leading-5">
                          {c.text}
                        </p>

                      </div>

                    ))
                  ) : (
                    <div
                      className="
                        rounded-xl
                        border
                        border-dashed
                        border-slate-200
                        bg-slate-50/50
                        py-7
                        text-center
                      "
                    >
                      <MessageSquare className="w-5 h-5 mx-auto text-slate-300 mb-2" />

                      <p className="text-xs text-slate-400">
                        No comments yet.
                      </p>
                    </div>
                  )}

                </div>

                {/* Add Comment */}

                <form
                  onSubmit={handleAddComment}
                  className="flex gap-2"
                >

                  <input
                    type="text"
                    required
                    placeholder="Add a comment or update..."
                    className="
                      flex-1
                      min-w-0
                      px-4
                      py-2.5
                      bg-slate-50
                      border
                      border-slate-200
                      rounded-xl
                      text-xs
                      text-slate-900
                      placeholder:text-slate-400
                      focus:bg-white
                      focus:border-indigo-500
                      focus:ring-4
                      focus:ring-indigo-500/10
                      transition
                    "
                    value={newComment}
                    onChange={(e) =>
                      setNewComment(e.target.value)
                    }
                  />

                  <button
                    type="submit"
                    className="
                      bg-indigo-600
                      hover:bg-indigo-500
                      text-white
                      px-4
                      py-2.5
                      rounded-xl
                      text-xs
                      font-semibold
                      shadow-md
                      shadow-indigo-600/10
                      transition
                      cursor-pointer
                    "
                  >
                    Post
                  </button>

                </form>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Board;