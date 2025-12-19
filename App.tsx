
import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Briefcase, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  Settings, 
  Menu, 
  X,
  Bell,
  Search,
  Plus,
  Zap,
  Star
} from 'lucide-react';
import { Task, Job, UserProfile, CalendarEvent } from './types';
import Dashboard from './components/Dashboard';
import TaskManager from './components/TaskManager';
import JobTracker from './components/JobTracker';
import DeveloperCalendar from './components/Calendar';
import AIAssistant from './components/AIAssistant';
import SettingsView from './components/Settings';
import PremiumView from './components/PremiumView';

// Context for global state
interface AppState {
  tasks: Task[];
  jobs: Job[];
  user: UserProfile;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  upgradeToPremium: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tasks' | 'jobs' | 'calendar' | 'ai' | 'settings' | 'premium'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [user, setUser] = useState<UserProfile>({
    name: 'Dev Hero',
    email: 'hero@devplanner.ai',
    isPremium: false,
    avatar: 'https://picsum.photos/seed/dev/200/200'
  });

  const upgradeToPremium = () => {
    setUser(prev => ({ ...prev, isPremium: true }));
  };

  // Mock initial data
  useEffect(() => {
    setTasks([
      { id: '1', title: 'Finish React Refactor', description: 'Clean up components and use hooks', category: 'Project', priority: 'High', status: 'In Progress', dueDate: '2023-12-30', createdAt: new Date().toISOString() },
      { id: '2', title: 'Study Data Structures', description: 'Review Trees and Graphs', category: 'Study', priority: 'Medium', status: 'Pending', dueDate: '2023-12-28', createdAt: new Date().toISOString() },
    ]);
    setJobs([
      { id: '1', company: 'Google', role: 'Frontend Engineer', stack: ['React', 'TypeScript'], type: 'Remote', status: 'Interview', notes: 'Scheduled for next Tuesday', appliedDate: '2023-12-15' },
    ]);
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'jobs', label: 'Job Tracker', icon: Briefcase },
    { id: 'ai', label: 'AI Assistant', icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'tasks': return <TaskManager />;
      case 'calendar': return <DeveloperCalendar />;
      case 'jobs': return <JobTracker />;
      case 'ai': return <AIAssistant />;
      case 'settings': return <SettingsView />;
      case 'premium': return <PremiumView />;
      default: return <Dashboard />;
    }
  };

  return (
    <AppContext.Provider value={{ tasks, jobs, user, setTasks, setJobs, setUser, upgradeToPremium }}>
      <div className="flex h-screen bg-[#0f172a] text-slate-200 overflow-hidden">
        {/* Mobile Backdrop */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#1e293b] border-r border-slate-800 transition-transform duration-300 lg:translate-x-0 lg:static lg:block
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full">
            <div className="p-6 flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                DevPlanner AI
              </span>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id as any); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === item.id 
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
              {user.isPremium ? (
                <div className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-600/10 border border-indigo-600/30 rounded-xl font-semibold text-indigo-400 mb-4">
                  <Star className="w-4 h-4 fill-indigo-400" />
                  <span>Premium Active</span>
                </div>
              ) : (
                <button 
                  onClick={() => { setActiveTab('premium'); setIsSidebarOpen(false); }}
                  className="w-full group relative flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-indigo-500/20 transition-all mb-4"
                >
                  <Zap className="w-4 h-4" />
                  <span>Go Premium</span>
                </button>
              )}
              
              <button
                onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all"
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </button>

              <div className="mt-4 flex items-center gap-3 px-4 py-3 bg-slate-800/50 rounded-2xl">
                <img src={user.avatar} className={`w-10 h-10 rounded-full border-2 ${user.isPremium ? 'border-amber-400' : 'border-indigo-500'}`} alt="avatar" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold truncate flex items-center gap-1">
                    {user.name}
                    {user.isPremium && <Star className="w-3 h-3 fill-amber-400 text-amber-400" />}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#0f172a] overflow-hidden">
          {/* Header */}
          <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-[#0f172a]/50 backdrop-blur-md sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-400 hover:text-slate-200"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-lg font-semibold text-slate-100 capitalize">
                {activeTab === 'dashboard' ? 'Overview' : activeTab.replace('-', ' ')}
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700">
                <Search className="w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  className="bg-transparent border-none outline-none text-sm w-40 lg:w-64 focus:ring-0" 
                />
              </div>
              <button className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></span>
              </button>
            </div>
          </header>

          {/* View Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto h-full">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default App;
