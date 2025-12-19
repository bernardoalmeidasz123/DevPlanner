
import React from 'react';
import { useApp } from '../App';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Plus } from 'lucide-react';

const DeveloperCalendar: React.FC = () => {
  const { tasks, jobs } = useApp();
  
  // Simplified static calendar for demo purposes
  const days = Array.from({ length: 35 }, (_, i) => i - 3); // Dec 2023 mock
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Match tasks/jobs to days (simplified logic for demo)
  const getEventsForDay = (day: number) => {
    if (day <= 0 || day > 31) return [];
    const dateStr = `2023-12-${day < 10 ? '0' + day : day}`;
    const dayTasks = tasks.filter(t => t.dueDate === dateStr);
    const dayJobs = jobs.filter(j => j.appliedDate === dateStr); // simplified
    return [...dayTasks.map(t => ({ title: t.title, type: 'Task' })), ...dayJobs.map(j => ({ title: `${j.company} App`, type: 'Job' }))];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Project Timeline</h1>
          <p className="text-slate-500">Manage your deadlines and interview schedule.</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 transition-all"><ChevronLeft className="w-5 h-5" /></button>
          <span className="font-semibold text-slate-200">December 2023</span>
          <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 transition-all"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="bg-slate-800/30 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="grid grid-cols-7 border-b border-slate-800">
          {weekDays.map(d => (
            <div key={d} className="py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-800/50">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, idx) => {
            const events = getEventsForDay(day);
            const isToday = day === new Date().getDate();
            const isCurrentMonth = day > 0 && day <= 31;

            return (
              <div 
                key={idx} 
                className={`min-h-[120px] p-2 border-r border-b border-slate-800 flex flex-col gap-1 transition-all hover:bg-slate-800/20 ${!isCurrentMonth ? 'bg-slate-900/40' : ''}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-sm font-bold ${isToday ? 'w-6 h-6 flex items-center justify-center bg-indigo-600 text-white rounded-full' : isCurrentMonth ? 'text-slate-400' : 'text-slate-700'}`}>
                    {day > 0 && day <= 31 ? day : ''}
                  </span>
                  {isCurrentMonth && <button className="p-1 text-slate-700 hover:text-slate-400 opacity-0 group-hover:opacity-100"><Plus className="w-3 h-3" /></button>}
                </div>
                {events.map((e, i) => (
                  <div key={i} className={`px-2 py-1 rounded-md text-[10px] font-bold truncate ${
                    e.type === 'Task' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                  }`}>
                    {e.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DeveloperCalendar;
