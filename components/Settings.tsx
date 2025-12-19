
import React from 'react';
import { useApp } from '../App';
import { User, Bell, Lock, Palette, Smartphone, Globe, Eye, EyeOff } from 'lucide-react';

const SettingsView: React.FC = () => {
  const { user, setUser } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-500">Manage your account and app preferences.</p>
      </header>

      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-400" />
          Profile Information
        </h3>
        <div className="p-8 rounded-3xl bg-slate-800/30 border border-slate-800 space-y-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <img src={user.avatar} className="w-24 h-24 rounded-3xl border-2 border-indigo-600 object-cover shadow-2xl" alt="profile" />
              <button className="absolute inset-0 bg-black/40 text-white text-xs font-bold flex items-center justify-center rounded-3xl opacity-0 group-hover:opacity-100 transition-all">
                Change
              </button>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  value={user.name}
                  onChange={(e) => setUser({...user, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl outline-none focus:border-indigo-500 transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  value={user.email}
                  disabled
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl outline-none opacity-50 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
          <Bell className="w-5 h-5 text-indigo-400" />
          Notifications
        </h3>
        <div className="p-8 rounded-3xl bg-slate-800/30 border border-slate-800 divide-y divide-slate-800">
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-semibold text-slate-100">Interview Reminders</p>
              <p className="text-sm text-slate-500">Get alerted 1 hour before scheduled interviews.</p>
            </div>
            <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-semibold text-slate-100">Task Deadlines</p>
              <p className="text-sm text-slate-500">Daily summary of tasks due today.</p>
            </div>
            <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-4">
        <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all">
          Reset Changes
        </button>
        <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
