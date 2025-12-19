
import React, { useEffect, useState } from 'react';
import { useApp } from '../App';
import { 
  ArrowUpRight, 
  Clock, 
  Calendar as CalendarIcon, 
  Briefcase, 
  CheckCircle2, 
  Activity,
  Plus
} from 'lucide-react';
import { summarizeDay } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const { tasks, jobs } = useApp();
  const [aiSummary, setAiSummary] = useState("Analyzing your day...");

  useEffect(() => {
    summarizeDay(tasks, jobs).then(setAiSummary);
  }, [tasks, jobs]);

  const stats = [
    { label: 'Active Tasks', value: tasks.filter(t => t.status !== 'Completed').length, icon: CheckCircle2, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Interviews', value: jobs.filter(j => j.status === 'Interview').length, icon: CalendarIcon, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Applications', value: jobs.length, icon: Briefcase, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { label: 'Completion Rate', value: `${tasks.length ? Math.round((tasks.filter(t => t.status === 'Completed').length / tasks.length) * 100) : 0}%`, icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* AI Summary Header */}
      <section className="relative overflow-hidden p-8 rounded-3xl bg-slate-800/50 border border-slate-700/50">
        <div className="absolute top-0 right-0 p-4">
          <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-400 rounded-full border border-indigo-500/30">
            DevPlanner AI Assistant
          </div>
        </div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Dev.</h1>
          <p className="text-slate-400 leading-relaxed italic">
            "{aiSummary}"
          </p>
        </div>
        {/* Background blobs for flair */}
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full"></div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-slate-800/30 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500" />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Upcoming Tasks</h3>
            <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300">View All</button>
          </div>
          <div className="space-y-3">
            {tasks.filter(t => t.status !== 'Completed').slice(0, 4).map((task) => (
              <div key={task.id} className="group flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-slate-800 hover:bg-slate-800/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-10 rounded-full ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-slate-500'}`} />
                  <div>
                    <h4 className="font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors">{task.title}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Due {task.dueDate}
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-lg bg-slate-800 text-xs font-medium text-slate-400 border border-slate-700">
                  {task.category}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Activity */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Career Pipeline</h3>
          <div className="p-6 rounded-3xl bg-slate-800/30 border border-slate-800">
            <div className="space-y-6">
              {jobs.slice(0, 3).map((job) => (
                <div key={job.id} className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-indigo-400">
                    {job.company[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-100 truncate">{job.role}</p>
                    <p className="text-xs text-slate-500 truncate">{job.company}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        job.status === 'Interview' ? 'bg-purple-500/20 text-purple-400' : 
                        job.status === 'Applied' ? 'bg-blue-500/20 text-blue-400' : 
                        'bg-slate-500/20 text-slate-400'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-all border border-slate-700">
                Manage Applications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
