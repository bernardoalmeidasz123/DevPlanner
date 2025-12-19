
import React, { useState } from 'react';
import { useApp } from '../App';
import { Plus, Search, Filter, Trash2, CheckCircle, Circle, MoreVertical, Calendar } from 'lucide-react';
import { Task, TaskCategory, Priority, TaskStatus } from '../types';

const TaskManager: React.FC = () => {
  const { tasks, setTasks } = useApp();
  const [filter, setFilter] = useState<TaskStatus | 'All'>('All');
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    category: 'Project',
    priority: 'Medium',
    status: 'Pending',
    dueDate: new Date().toISOString().split('T')[0]
  });

  const addTask = () => {
    if (!newTask.title) return;
    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTask.title!,
      description: newTask.description || '',
      category: newTask.category as TaskCategory,
      priority: newTask.priority as Priority,
      status: 'Pending',
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, task]);
    setShowModal(false);
    setNewTask({ title: '', description: '', category: 'Project', priority: 'Medium', dueDate: new Date().toISOString().split('T')[0] });
  };

  const toggleStatus = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => filter === 'All' || t.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Backlog</h1>
          <p className="text-slate-500">Organize your projects, studies, and freelance tasks.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-5 h-5" />
          <span>New Task</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {['All', 'Pending', 'In Progress', 'Completed'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s as any)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === s 
              ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-600/30' 
              : 'bg-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filteredTasks.map((task) => (
          <div 
            key={task.id} 
            className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all ${
              task.status === 'Completed' ? 'bg-slate-900/40 border-slate-800 opacity-60' : 'bg-slate-800/30 border-slate-800 hover:border-slate-700'
            }`}
          >
            <button 
              onClick={() => toggleStatus(task.id)}
              className="text-slate-500 hover:text-indigo-400 transition-colors"
            >
              {task.status === 'Completed' ? <CheckCircle className="w-6 h-6 text-emerald-500" /> : <Circle className="w-6 h-6" />}
            </button>
            <div className="flex-1 min-w-0">
              <h4 className={`font-semibold text-slate-100 ${task.status === 'Completed' ? 'line-through' : ''}`}>
                {task.title}
              </h4>
              <p className="text-xs text-slate-500 truncate mt-1">{task.description}</p>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs font-medium uppercase tracking-wider">
              <span className={`px-2 py-0.5 rounded ${
                task.priority === 'High' ? 'text-red-400' : task.priority === 'Medium' ? 'text-yellow-400' : 'text-slate-400'
              }`}>
                {task.priority}
              </span>
              <span className="text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {task.dueDate}
              </span>
              <div className="px-3 py-1 bg-slate-800 text-slate-400 rounded-lg border border-slate-700">
                {task.category}
              </div>
            </div>
            <button 
              onClick={() => deleteTask(task.id)}
              className="p-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-slate-800 rounded-3xl">
            <CheckCircle className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No tasks found. Time to relax or start something new!</p>
          </div>
        )}
      </div>

      {/* Modal Backdrop */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold text-white mb-6">Create Task</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
                <input 
                  type="text" 
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="Review PR #45..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                <textarea 
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none h-24"
                  placeholder="Notes about implementation..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Priority</label>
                  <select 
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value as Priority})}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Due Date</label>
                  <input 
                    type="date" 
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={addTask}
                  className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
