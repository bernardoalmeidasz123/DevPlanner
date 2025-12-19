
import React, { useState } from 'react';
import { useApp } from '../App';
import { Plus, Building2, MapPin, Tag, Calendar, ExternalLink, Trash2 } from 'lucide-react';
import { Job, JobStatus, JobType } from '../types';

const JobTracker: React.FC = () => {
  const { jobs, setJobs } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [newJob, setNewJob] = useState<Partial<Job>>({
    company: '',
    role: '',
    stack: [],
    type: 'Remote',
    status: 'Applied',
    notes: '',
    appliedDate: new Date().toISOString().split('T')[0]
  });
  const [tempStack, setTempStack] = useState('');

  const addJob = () => {
    if (!newJob.company || !newJob.role) return;
    const job: Job = {
      id: Math.random().toString(36).substr(2, 9),
      company: newJob.company!,
      role: newJob.role!,
      stack: newJob.stack || [],
      type: (newJob.type as JobType) || 'Remote',
      status: (newJob.status as JobStatus) || 'Applied',
      notes: newJob.notes || '',
      appliedDate: newJob.appliedDate || new Date().toISOString().split('T')[0]
    };
    setJobs([...jobs, job]);
    setShowModal(false);
    setNewJob({ company: '', role: '', stack: [], type: 'Remote', status: 'Applied', notes: '', appliedDate: new Date().toISOString().split('T')[0] });
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  const updateStatus = (id: string, status: JobStatus) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status } : j));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Career Board</h1>
          <p className="text-slate-500">Track applications, interviews, and follow-ups.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add Application</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="p-6 rounded-3xl bg-slate-800/30 border border-slate-800 hover:border-indigo-500/30 transition-all flex flex-col h-full">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Building2 className="w-6 h-6" />
              </div>
              <button 
                onClick={() => deleteJob(job.id)}
                className="p-2 text-slate-500 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-100">{job.role}</h3>
              <p className="text-slate-400 font-medium">{job.company}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.stack.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-mono font-bold text-slate-400 border border-slate-700">
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin className="w-3 h-3" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="w-3 h-3" />
                  <span>Applied {job.appliedDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Status</label>
              <select 
                value={job.status}
                onChange={(e) => updateStatus(job.id, e.target.value as JobStatus)}
                className={`w-full px-4 py-2 rounded-xl text-sm font-bold border outline-none transition-all ${
                  job.status === 'Interview' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                  job.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                  job.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                  'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
                <option value="Approved">Approved</option>
                <option value="Follow-up">Follow-up</option>
              </select>
            </div>
          </div>
        ))}

        {jobs.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-800 rounded-3xl">
            <Building2 className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No job applications yet. Start hunting!</p>
          </div>
        )}
      </div>

      {/* Add Job Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold text-white mb-6">New Application</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Company</label>
                  <input 
                    type="text" 
                    value={newJob.company}
                    onChange={(e) => setNewJob({...newJob, company: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl outline-none"
                    placeholder="Meta"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Role</label>
                  <input 
                    type="text" 
                    value={newJob.role}
                    onChange={(e) => setNewJob({...newJob, role: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl outline-none"
                    placeholder="Software Engineer"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Stack (press Enter to add)</label>
                <input 
                  type="text" 
                  value={tempStack}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && tempStack.trim()) {
                      setNewJob({...newJob, stack: [...(newJob.stack || []), tempStack.trim()]});
                      setTempStack('');
                    }
                  }}
                  onChange={(e) => setTempStack(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl outline-none"
                  placeholder="e.g. Node.js"
                />
                <div className="mt-2 flex flex-wrap gap-1">
                  {newJob.stack?.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 bg-indigo-600/20 text-indigo-400 rounded-md text-xs">{s}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Type</label>
                  <select 
                    value={newJob.type}
                    onChange={(e) => setNewJob({...newJob, type: e.target.value as JobType})}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl outline-none"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Applied Date</label>
                  <input 
                    type="date" 
                    value={newJob.appliedDate}
                    onChange={(e) => setNewJob({...newJob, appliedDate: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 px-4 bg-slate-800 text-slate-300 font-semibold rounded-xl">Cancel</button>
                <button onClick={addJob} className="flex-1 py-3 px-4 bg-indigo-600 text-white font-semibold rounded-xl">Track Job</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobTracker;
