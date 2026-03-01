
    import React, { useState, useEffect, useRef } from 'react';
    import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { 
    LayoutDashboard, MessageSquare, Files, LogOut, 
    Bell, Menu, X, CheckCircle2, Download, Plus, Send, Rocket, FileText, 
    Users, Shield, ChevronRight, Search, 
    Edit3, MoreVertical, Sparkles, Loader2, ChevronDown, Upload, CloudUpload
    } from 'lucide-react';
    import { useAuth } from '../context/AuthContext';
    import { useAppState } from '../context/AppStateContext';
    import { STAGES } from '../constants';
    import { Project, Message, ProjectFile, ActivityLog, User } from '../types';
    import { LogoNavbar, LogoIcon } from '../components/BrandLogos';
    import { GoogleGenAI } from "@google/genai";

    /**
     * DASHBOARD ENTRY POINT
     */
    const Dashboard: React.FC = () => {
    const { user, isLoading: authLoading } = useAuth();
    const { isLoading: appLoading } = useAppState();

    if (authLoading || appLoading) return (
        <div className="bg-slate-950 min-h-screen flex flex-col items-center justify-center text-white font-black uppercase tracking-[0.4em]">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-6" />
        <span className="animate-pulse">Initializing System...</span>
        </div>
    );

    if (!user) return <Navigate to="/login" replace />;

    return (
        <Routes>
        <Route path="client/*" element={user.role === 'client' ? <ClientDashboard /> : <Navigate to="/dashboard/admin" replace />} />
        <Route path="admin/*" element={user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/dashboard/client" replace />} />
        <Route path="*" element={<Navigate to={user.role === 'admin' ? "admin" : "client"} replace />} />
        </Routes>
    );
    };

    // ==========================================
    // CLIENT DASHBOARD
    // ==========================================

    const ClientDashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const { projects, messages, refreshData } = useAppState();
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);

    const handleLogout = () => { logout(); navigate('/'); };

    // Refresh messages periodically to get notifications
    useEffect(() => {
        refreshData();
        const interval = setInterval(() => {
            refreshData();
        }, 30000); // Refresh every 30 seconds
        return () => clearInterval(interval);
    }, [refreshData]);

    // Only show projects that belong to this client
    const ownedProjects = projects.filter((p: Project) => {
      if (!user) return false;
      if (typeof p.clientId === 'string') {
        return p.clientId === user.id;
      }
      const cid = (p.clientId as Partial<User>).id;
      return cid === user.id;
    });

    const clientProject = ownedProjects[0];

    return (
        <div className="bg-slate-950 min-h-screen flex text-slate-300">
        <aside className={`${isSidebarOpen ? 'w-80' : 'w-24'} bg-slate-900 border-r border-white/5 transition-all duration-300 flex flex-col h-screen`}>
            <div className="p-4 lg:p-8 flex items-center justify-between flex-shrink-0">
            <Link to="/" className="relative z-10">
                {isSidebarOpen ? <LogoNavbar size="sm" /> : <LogoIcon size={32} />}
            </Link>
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                {isSidebarOpen ? <X size={18} className="text-slate-500" /> : <Menu size={18} className="text-slate-500" />}
            </button>
            </div>
            
            <nav className="flex-grow px-4 lg:px-5 space-y-2 mt-4 lg:mt-10 overflow-y-auto">
            <ClientSidebarLink to="/dashboard/client" icon={<LayoutDashboard />} label="Project Hub" isOpen={isSidebarOpen} />
            <ClientSidebarLink to="/dashboard/client/messages" icon={<MessageSquare />} label="Team Chat" isOpen={isSidebarOpen} />
            <ClientSidebarLink to="/dashboard/client/files" icon={<Files />} label="Assets" isOpen={isSidebarOpen} />
            </nav>
            
            {/* Profile Section */}
            <div className="p-4 lg:p-6 border-t border-white/5 flex-shrink-0 bg-slate-950/30">
                {isSidebarOpen && (
                    <div className="flex items-center gap-3 lg:gap-4 mb-4 p-3 lg:p-4 bg-slate-900/50 rounded-xl border border-white/5">
                        <img src={user?.avatar} alt={user?.name} className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-indigo-600 border border-indigo-500 object-cover flex-shrink-0" />
                        <div className="flex-grow min-w-0">
                            <p className="text-white font-black text-xs lg:text-sm truncate">{user?.name}</p>
                            <p className="text-slate-500 text-[10px] lg:text-xs font-bold uppercase tracking-widest truncate">{user?.email}</p>
                        </div>
                    </div>
                )}
                {!isSidebarOpen && (
                    <div className="flex justify-center mb-4">
                        <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-xl bg-indigo-600 border border-indigo-500 object-cover" />
                    </div>
                )}
                <button onClick={handleLogout} className="w-full flex items-center gap-3 lg:gap-4 p-3 lg:p-4 text-slate-600 hover:text-white transition-all group">
                    <LogOut size={20} className="group-hover:text-red-500 transition-colors" />
                    {isSidebarOpen && <span className="font-black text-xs uppercase tracking-widest">Sign Out</span>}
                </button>
            </div>
        </aside>

        <main className="flex-grow flex flex-col min-w-0 ml-0 lg:ml-0">
            <header className="h-16 lg:h-20 flex items-center justify-between px-4 md:px-6 lg:px-12 border-b border-white/5">
            <h2 className="text-lg lg:text-xl font-black text-white tracking-tight">Hello, {user?.name.split(' ')[0]} 👋</h2>
            <div className="flex items-center gap-4 lg:gap-8">
                <div className="relative">
                <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-slate-500 hover:text-white transition-colors"
                >
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-950"></span>
                </button>
                {showNotifications && (
                    <div className="absolute right-0 mt-4 w-80 glass-card p-4 rounded-2xl z-[60] border border-white/10 max-h-96 overflow-y-auto">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-3">Recent Updates</p>
                    {clientProject ? (() => {
                        const projectMessages = messages.filter((m: Message) => m.projectId === clientProject.id && m.isSystem);
                        const recentNotifications = projectMessages.slice(-5).reverse();
                        return recentNotifications.length > 0 ? (
                            <div className="space-y-3">
                                {recentNotifications.map((m: Message) => (
                                    <div key={m.id} className="text-[11px] text-white p-3 bg-white/5 rounded-xl border border-white/5">
                                        {m.text}
                                        <p className="text-[9px] text-slate-500 mt-1">{new Date(m.createdAt).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-[11px] text-slate-500">No recent updates</div>
                        );
                    })() : (
                        <div className="text-[11px] text-slate-500">No project assigned</div>
                    )}
                    </div>
                )}
                </div>
                <div className="flex items-center gap-4 bg-slate-900/50 px-4 py-2 rounded-2xl border border-white/5">
                <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-xl bg-indigo-600 border border-indigo-500 object-cover" />
                <div className="hidden md:block text-right">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">{user?.name}</p>
                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">{user?.role}</p>
                </div>
                </div>
            </div>
            </header>

            <div className="p-4 md:p-6 lg:p-12 flex-grow max-w-7xl overflow-x-hidden">
            <Routes>
                <Route path="/" element={<ClientHome project={clientProject} />} />
                <Route path="/messages" element={<ClientMessages project={clientProject} />} />
                <Route path="/files" element={<ClientFiles project={clientProject} />} />
            </Routes>
            </div>
        </main>
        </div>
    );
    };

    const ClientSidebarLink = ({ to, icon, label, isOpen }: any) => {
    const location = useLocation();
    const active = location.pathname === to;
    return (
        <Link to={to} className={`flex items-center gap-5 p-4 rounded-[1.5rem] transition-all duration-300 ${
        active 
            ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40' 
            : 'text-slate-500 hover:text-white hover:bg-white/5'
        }`}>
        {React.cloneElement(icon, { size: 20 })}
        {isOpen && <span className="font-black text-xs uppercase tracking-widest">{label}</span>}
        </Link>
    );
    };

    const ClientHome = ({ project }: { project: Project }) => {
    const [projectActivities, setProjectActivities] = useState<ActivityLog[]>([]);
    const [aiInsight, setAiInsight] = useState<string | null>(null);
    const [isAiLoading, setIsAiLoading] = useState(false);
    
    useEffect(() => {
        if (!project) {
        setProjectActivities([]);
        return;
        }
        // Activities are stored in ActivityLog model, but for now we'll use empty array
        // In production, you'd fetch from an activities endpoint
        setProjectActivities([]);
    }, [project]);

    const getAiInsight = async () => {
        if (!project) return;
        setIsAiLoading(true);
        try {
        // Try multiple ways to get API key (vite config defines process.env.API_KEY from GEMINI_API_KEY)
        const apiKey = (process.env as any).API_KEY || (process.env as any).GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
        
        if (!apiKey) {
            throw new Error('API key not configured. Please set GEMINI_API_KEY in .env file');
        }
        
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Analyze this project and give 3 strategic next steps to accelerate growth:
            Title: ${project.title}
            Description: ${project.description}
            Stage: ${project.stage}`,
            config: {
            systemInstruction: "You are a world-class startup consultant. Keep your suggestions bold, professional, and under 100 words."
            }
        });
        setAiInsight(response.text || "Unable to generate insights at this time.");
        } catch (err: any) {
        console.error('AI Error:', err);
        setAiInsight(err.message?.includes('API key') 
            ? "AI API key not configured. Please contact admin." 
            : "AI Consultant temporarily offline. Please try again later.");
        } finally {
        setIsAiLoading(false);
        }
    };

    return (
        <div className="space-y-12">
        {project ? (
            <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="lg:col-span-2 glass-card p-6 lg:p-14 rounded-[2rem] lg:rounded-[4rem] relative overflow-hidden group border border-indigo-500/10 shadow-2xl"
                >
                <div className="absolute top-0 right-0 p-16 opacity-5"><Rocket size={250} className="text-indigo-400" /></div>
                <div className="mb-14 relative z-10">
                    <span className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">ACTIVE PROJECT PIPELINE</span>
                    <h1 className="text-3xl lg:text-6xl font-black text-white tracking-tighter mb-4 lg:mb-6">{project.title}</h1>
                    <p className="text-slate-400 text-base lg:text-xl max-w-2xl leading-relaxed font-medium">{project.description}</p>
                </div>
                <div className="space-y-8 relative z-10">
                    <div className="flex justify-between items-end">
                    <div>
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-3">CURRENT MILESTONE</p>
                        <p className="text-3xl font-black text-white flex items-center gap-4">
                        <span className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.5)]"></span>
                        {project.stage}
                        </p>
                    </div>
                    <p className="text-5xl font-black text-indigo-500 tracking-tighter">{project.progressPercent}%</p>
                    </div>
                    <div className="h-5 bg-slate-900 rounded-full overflow-hidden border border-white/5 p-1.5 shadow-inner">
                    <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${project.progressPercent}%` }} 
                        className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.3)]" 
                    />
                    </div>
                </div>
                </motion.div>

                <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-10 rounded-[3rem] border border-indigo-500/20 bg-indigo-600/5 relative flex flex-col justify-between"
                >
                <div>
                    <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="text-indigo-400" size={24} />
                    <h3 className="text-xl font-black text-white uppercase tracking-widest">AI Strategy</h3>
                    </div>
                    {aiInsight ? (
                    <p className="text-slate-300 text-sm leading-relaxed font-medium italic">"{aiInsight}"</p>
                    ) : (
                    <p className="text-slate-500 text-sm font-medium">Generate a real-time strategic audit of your current project roadmap using OSF-AI.</p>
                    )}
                </div>
                <button 
                    onClick={getAiInsight}
                    disabled={isAiLoading}
                    className="mt-8 w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles size={16} />}
                    {isAiLoading ? "Analyzing..." : "Refresh Audit"}
                </button>
                </motion.div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="glass-card p-12 rounded-[3.5rem] shadow-xl">
                <h3 className="text-2xl font-black text-white mb-10 tracking-tight">Project Roadmap</h3>
                <div className="space-y-6">
                    {STAGES.map((s, i) => {
                    const currentIdx = STAGES.indexOf(project.stage);
                    const isDone = i < currentIdx;
                    const isNow = i === currentIdx;
                    return (
                        <div key={s} className={`flex items-center gap-6 p-5 rounded-3xl border transition-all duration-500 ${isNow ? 'bg-indigo-600/10 border-indigo-600/30 shadow-lg' : 'border-transparent opacity-40'}`}>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isDone ? 'bg-emerald-500 text-slate-950' : isNow ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-700'}`}>
                            {isDone ? <CheckCircle2 size={24} /> : <span className="text-sm font-black tracking-tighter">{i+1}</span>}
                        </div>
                        <div>
                            <p className={`text-lg font-black tracking-tight ${isNow ? 'text-white' : 'text-slate-500'}`}>{s}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mt-1">{isDone ? 'PHASE COMPLETED' : isNow ? 'ACTIVE SPRINT' : 'UPCOMING PHASE'}</p>
                        </div>
                        </div>
                    );
                    })}
                </div>
                </div>
                
                <div className="glass-card p-12 rounded-[3.5rem] bg-indigo-600/5 shadow-xl border-indigo-500/5">
                <h3 className="text-2xl font-black text-white mb-10 tracking-tight">System Feed</h3>
                <div className="space-y-10 relative">
                    <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-white/5"></div>
                    {projectActivities.length > 0 ? projectActivities.map((act: ActivityLog) => (
                    <div key={act.id} className="flex gap-8 relative z-10">
                        <div className="w-4 h-4 rounded-full bg-slate-950 border-[3px] border-indigo-600 shadow-[0_0_10px_rgba(99,102,241,0.4)] mt-1.5"></div>
                        <div>
                        <p className="text-slate-300 font-bold text-lg leading-tight mb-2">{act.content}</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">{new Date(act.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                    </div>
                    )) : (
                    <p className="text-slate-500 font-bold uppercase tracking-widest py-10 text-center opacity-30">No activity yet</p>
                    )}
                </div>
                </div>
            </div>
            </>
        ) : (
            <div className="py-20 text-center glass-card rounded-[3rem]">
            <Rocket size={64} className="mx-auto text-slate-700 mb-6" />
            <h2 className="text-3xl font-black text-white mb-4">No Active Sprints</h2>
            <p className="text-slate-500 max-w-md mx-auto">Your project is currently in the deployment queue. Our team will initialize your hub shortly.</p>
            </div>
        )}
        </div>
    );
    };

    // ==========================================
    // ADMIN DASHBOARD
    // ==========================================

    const AdminDashboard: React.FC = () => {
    const { logout, user } = useAuth();
    const { projects, activities } = useAppState();
    const navigate = useNavigate();

    return (
        <div className="bg-slate-950 min-h-screen flex flex-col lg:flex-row text-slate-300">
        <aside className="w-full lg:w-72 bg-slate-900 border-r border-white/5 flex flex-col shadow-2xl z-50 h-screen">
            <div className="p-4 lg:p-8 border-b border-white/5 bg-slate-950/50 flex flex-col gap-4 lg:gap-8 flex-shrink-0">
            <Link to="/" className="inline-block">
                <LogoNavbar size="sm" />
            </Link>
            <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-3 lg:p-4 flex items-center gap-3 lg:gap-4">
                <Shield size={18} className="lg:w-5 lg:h-5 text-indigo-500" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Admin Control</span>
            </div>
            </div>
            
            <nav className="flex-grow p-4 lg:p-6 space-y-2 overflow-y-auto">
            <AdminSidebarLink to="/dashboard/admin" icon={<LayoutDashboard size={18} />} label="Overview" />
            <AdminSidebarLink to="/dashboard/admin/messages" icon={<MessageSquare size={18} />} label="Inbox" />
            <AdminSidebarLink to="/dashboard/admin/clients" icon={<Users size={18} />} label="Clients" />
            <AdminSidebarLink to="/dashboard/admin/projects" icon={<Rocket size={18} />} label="Master Hub" />
            <AdminSidebarLink to="/dashboard/admin/completed" icon={<CheckCircle2 size={18} />} label="Completed" />
            </nav>
            
            {/* Profile Section */}
            <div className="p-4 lg:p-6 border-t border-white/5 flex-shrink-0 bg-slate-950/30">
                <div className="flex items-center gap-3 lg:gap-4 mb-4 p-3 lg:p-4 bg-slate-900/50 rounded-xl border border-white/5">
                    <img src={user?.avatar} alt={user?.name} className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-indigo-600 border border-indigo-500 object-cover" />
                    <div className="flex-grow min-w-0">
                        <p className="text-white font-black text-xs lg:text-sm truncate">{user?.name}</p>
                        <p className="text-slate-500 text-[10px] lg:text-xs font-bold uppercase tracking-widest truncate">{user?.email}</p>
                    </div>
                </div>
                <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-3 lg:gap-4 p-3 lg:p-4 text-slate-500 hover:text-red-400 transition-all text-xs font-black uppercase tracking-widest">
                    <LogOut size={18} /> Logout
                </button>
            </div>
        </aside>

        <main className="flex-grow flex flex-col min-w-0 bg-slate-950">
            <header className="h-14 lg:h-16 bg-slate-900/30 border-b border-white/5 flex items-center justify-between px-4 lg:px-10 backdrop-blur-md sticky top-0 z-40">
            <div className="flex items-center gap-2 lg:gap-4 text-[8px] lg:text-[9px] font-black uppercase tracking-widest text-slate-500">
                <span className="hidden sm:inline">CORE</span>
                <ChevronRight size={10} className="lg:w-3 lg:h-3 opacity-20 hidden sm:inline" />
                <span className="text-white uppercase tracking-widest truncate">{useLocation().pathname.split('/').pop() || 'OVERVIEW'}</span>
            </div>
            <div className="flex items-center gap-3 lg:gap-6">
                <div className="bg-emerald-500/10 text-emerald-500 text-[8px] lg:text-[9px] font-black px-2 lg:px-3 py-1 lg:py-1.5 rounded-full tracking-[0.2em] border border-emerald-500/20">LIVE OPS ACTIVE</div>
            </div>
            </header>

            <div className="p-4 lg:p-10 flex-grow overflow-y-auto">
            <Routes>
                <Route path="/" element={<AdminHome projects={projects} activities={activities} />} />
                <Route path="/messages" element={<AdminMessages />} />
                <Route path="/clients" element={<AdminClients projects={projects} />} />
                <Route path="/projects" element={<AdminProjects />} />
                <Route path="/completed" element={<AdminCompletedProjects />} />
            </Routes>
            </div>
        </main>
        </div>
    );
    };

    const ClientMessages = ({ project }: { project: Project }) => {
    const { messages, sendMessage, refreshData } = useAppState();
    const { user } = useAuth();
    const [inputText, setInputText] = useState('');
    const [projectMessages, setProjectMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (!project) {
        setProjectMessages([]);
        return;
        }
        
        const fetchMessages = async () => {
        const token = localStorage.getItem('osf_token');
        if (!token) return;
        
        try {
            const res = await fetch(`/api/messages/${project.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            });
            if (res.ok) {
            const data = await res.json();
            setProjectMessages(data);
            }
        } catch (err) {
            console.error('Failed to fetch messages:', err);
        }
        };
        
        fetchMessages();
    }, [project]);

    const handleSend = async () => {
        if (!inputText.trim() || !project) return;
        await sendMessage(project.id, inputText);
        setInputText('');
        // Refresh messages after sending
        const token = localStorage.getItem('osf_token');
        if (token) {
        const res = await fetch(`/api/messages/${project.id}`, {
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            const data = await res.json();
            setProjectMessages(data);
        }
        }
    };

    return (
        <div className="h-[calc(100vh-14rem)] flex flex-col glass-card rounded-[4rem] overflow-hidden shadow-2xl border-white/5">
        <div className="p-12 border-b border-white/5 flex justify-between items-center bg-slate-900/20">
            <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-indigo-600/30"><MessageSquare size={32} /></div>
            <div>
                <h4 className="text-2xl font-black text-white tracking-tight">Project Concierge</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mt-1">TYPICAL RESPONSE: 2H</p>
            </div>
            </div>
        </div>
        <div className="flex-grow p-12 overflow-y-auto space-y-8 bg-slate-950/20">
            {!project ? (
            <div className="h-full flex items-center justify-center text-slate-600 uppercase tracking-widest font-black text-xs opacity-20">Messaging will be enabled once your project starts.</div>
            ) : projectMessages.map((m: Message) => (
            <div key={m.id} className={`flex ${m.isSystem ? 'justify-center' : m.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-8 rounded-[2.5rem] text-sm md:text-base leading-relaxed ${m.isSystem ? 'bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20 px-10 py-3 rounded-full text-xs uppercase tracking-widest' : m.senderId === user?.id ? 'bg-indigo-600 text-white rounded-tr-none shadow-xl' : 'bg-slate-900 border border-white/5 text-slate-300 rounded-tl-none shadow-lg'}`}>
                {!m.isSystem && (
                    <div className="flex items-center justify-between gap-10 mb-2">
                    <p className="text-[9px] font-black opacity-50 uppercase tracking-widest">{m.senderName}</p>
                    <p className="text-[9px] font-black opacity-30 uppercase">{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                )}
                <p className="font-medium">{m.text}</p>
                </div>
            </div>
            ))}
        </div>
        <div className="p-10 border-t border-white/5 bg-slate-900/50 flex gap-5">
            <input 
            disabled={!project}
            value={inputText} 
            onChange={e => setInputText(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && handleSend()} 
            placeholder={project ? "Message your dedicated partner..." : "Portal restricted..."}
            className="flex-grow bg-slate-950 border border-white/10 rounded-[2rem] px-10 py-6 text-white focus:outline-none focus:border-indigo-600/50 transition-all font-medium disabled:opacity-50" 
            />
            <button 
            disabled={!project}
            onClick={handleSend} 
            className="bg-indigo-600 w-20 h-20 rounded-[2rem] text-white hover:bg-indigo-500 shadow-2xl shadow-indigo-600/40 flex items-center justify-center transition-all active:scale-95 disabled:opacity-50"
            >
            <Send size={28} />
            </button>
        </div>
        </div>
    );
    };

    const ClientFiles = ({ project }: { project: Project }) => {
    const { files } = useAppState();
    const [projectFiles, setProjectFiles] = useState<ProjectFile[]>([]);

    useEffect(() => {
        if (!project) {
        setProjectFiles([]);
        return;
        }
        
        const fetchFiles = async () => {
        const token = localStorage.getItem('osf_token');
        if (!token) return;
        
        try {
            const res = await fetch(`/api/files/${project.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            });
            if (res.ok) {
            const data = await res.json();
            setProjectFiles(data);
            }
        } catch (err) {
            console.error('Failed to fetch files:', err);
        }
        };
        
        fetchFiles();
    }, [project]);

    const handleDownload = (fileName: string) => {
        const link = document.createElement('a');
        link.href = '#';
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-12">
        <div>
            <h3 className="text-4xl font-black text-white mb-3 tracking-tight">Project Deliverables</h3>
            <p className="text-slate-500 text-lg font-medium">Access your assets and documentation.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projectFiles.length > 0 ? projectFiles.map((file: ProjectFile) => (
            <div key={file.id} className="glass-card p-10 rounded-[3rem] border border-white/5 group hover:border-indigo-500/40 transition-all duration-500 shadow-xl">
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-indigo-400 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-lg">
                <FileText size={28} />
                </div>
                <h5 className="text-white text-xl font-black mb-2 truncate group-hover:text-indigo-400 transition-colors">{file.name}</h5>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">{file.size} • {file.createdAt}</p>
                <button 
                onClick={() => handleDownload(file.name)}
                className="mt-10 w-full flex items-center justify-center gap-3 py-5 bg-white/5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 border border-white/5"
                >
                <Download size={18} /> Download Asset
                </button>
            </div>
            )) : (
            <div className="col-span-full py-32 text-center opacity-20">
                <Files size={64} className="mx-auto mb-6" />
                <p className="font-black uppercase tracking-[0.3em]">No deliverables available yet</p>
            </div>
            )}
        </div>
        </div>
    );
    };

    const AdminSidebarLink = ({ to, icon, label }: any) => {
    const active = useLocation().pathname === to;
    return (
        <Link to={to} className={`flex items-center gap-4 p-4 rounded-xl text-xs font-black uppercase tracking-[0.1em] transition-all ${
        active ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'text-slate-500 hover:text-white hover:bg-white/5'
        }`}>
        {icon}<span>{label}</span>
        </Link>
    );
    };

    const AdminHome = ({ projects, activities }: any) => (
    <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AdminStat label="Live Projects" value={projects.length} color="indigo" trend="Managed" />
        <AdminStat label="Velocity Score" value="9.8" color="amber" trend="Excellence" />
        <AdminStat label="System Health" value="100%" color="emerald" trend="Optimal" />
        <AdminStat label="IP Assets" value="1.2k" color="slate" trend="Secured" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-950/20">
            <h3 className="font-black text-white uppercase text-[10px] tracking-[0.3em]">Master Operation Feed</h3>
            </div>
            <div className="divide-y divide-white/5">
            {projects.map((p: Project) => (
                <div key={p.id} className="p-8 flex items-center justify-between hover:bg-white/2 transition-all group">
                <div className="flex items-center gap-4 lg:gap-6 flex-grow min-w-0">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all flex-shrink-0"><Rocket size={20} className="lg:w-6 lg:h-6" /></div>
                    <div className="min-w-0 flex-grow">
                    <h4 className="font-black text-base lg:text-lg text-white group-hover:text-indigo-400 transition-colors tracking-tight truncate">{p.title}</h4>
                    <p className="text-[9px] lg:text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1 truncate">{p.stage} • {typeof p.clientId === 'string' ? p.clientId : (p.clientId as Partial<User>)?.name || (p.clientId as Partial<User>)?.id || 'Partner'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 lg:gap-12 w-full sm:w-auto">
                    <div className="flex-grow sm:w-40">
                    <div className="flex justify-between text-[9px] font-black mb-2">
                        <span className="text-slate-500 uppercase">PROGRESS</span>
                        <span className="text-white">{p.progressPercent}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: `${p.progressPercent}%` }}></div>
                    </div>
                    </div>
                    <Link to="/dashboard/admin/projects" className="p-3 bg-white/5 rounded-xl text-slate-500 hover:text-white hover:bg-white/10 transition-all border border-white/5"><Edit3 size={18} /></Link>
                </div>
                </div>
            ))}
            </div>
        </div>
        
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h3 className="font-black text-white uppercase text-[10px] tracking-[0.3em] mb-10 border-b border-white/5 pb-6">System Logs</h3>
            <div className="space-y-6">
            {activities && activities.length > 0 ? (
                activities.slice(0, 10).map((log: ActivityLog) => (
                    <div key={log.id} className="flex gap-5">
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div>
                        <p className="text-slate-300 text-sm font-bold leading-tight">{log.content}</p>
                        <p className="text-[9px] text-slate-600 font-black uppercase mt-1 tracking-tighter">{new Date(log.timestamp).toLocaleString()}</p>
                    </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-10">
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No activity logs yet</p>
                    <p className="text-slate-600 text-[10px] mt-2">System activities will appear here</p>
                </div>
            )}
            </div>
        </div>
        </div>
    </div>
    );

    const AdminMessages = () => {
    const { projects, sendMessage } = useAppState();
    const { user } = useAuth();
    const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '');
    const [inputText, setInputText] = useState('');
    const [isSystemMsg, setIsSystemMsg] = useState(false);
    const [projectMessages, setProjectMessages] = useState<Message[]>([]);
    const [showProjectDropdown, setShowProjectDropdown] = useState(false);

    useEffect(() => {
        if (!selectedProjectId) {
        setProjectMessages([]);
        return;
        }
        
        const fetchMessages = async () => {
        const token = localStorage.getItem('osf_token');
        if (!token) return;
        
        try {
            const res = await fetch(`/api/messages/${selectedProjectId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            });
            if (res.ok) {
            const data = await res.json();
            setProjectMessages(data);
            }
        } catch (err) {
            console.error('Failed to fetch messages:', err);
        }
        };
        
        fetchMessages();
    }, [selectedProjectId]);

    const handleSend = async () => {
        if (!inputText.trim() || !selectedProjectId) return;
        await sendMessage(selectedProjectId, inputText, isSystemMsg);
        setInputText('');
        // Refresh messages
        const token = localStorage.getItem('osf_token');
        if (token) {
        const res = await fetch(`/api/messages/${selectedProjectId}`, {
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            const data = await res.json();
            setProjectMessages(data);
        }
        }
    };

    const currentProject = projects.find(p => p.id === selectedProjectId);

    return (
        <div className="h-[calc(100vh-14rem)] flex flex-col lg:flex-row bg-slate-900/50 border border-white/10 rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
        {/* Sidebar - desktop */}
        <div className="hidden lg:flex w-96 border-r border-white/5 flex-col bg-slate-950/20">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Active Threads</h3>
            </div>
            <div className="flex-grow overflow-y-auto">
            {projects.map((p: Project) => {
                const lastMsg = projectMessages
                .filter(m => m.projectId === p.id)
                .slice(-1)[0];
                return (
                <button 
                    key={p.id}
                    onClick={() => setSelectedProjectId(p.id)}
                    className={`w-full text-left p-6 border-b border-white/5 transition-all relative group ${selectedProjectId === p.id ? 'bg-indigo-600/10' : 'hover:bg-white/2'}`}
                >
                    {selectedProjectId === p.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600"></div>}
                    <div className="flex justify-between mb-2">
                    <h5 className="font-black text-white text-sm truncate pr-2 tracking-tight group-hover:text-indigo-400 transition-colors">{p.title}</h5>
                    <span className="text-[9px] text-slate-600 font-black uppercase">{p.stage}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate font-medium">{lastMsg?.text || 'Waiting for first interaction'}</p>
                </button>
                );
            })}
            </div>
        </div>
        
        {/* Main chat area */}
        <div className="flex-grow flex flex-col bg-slate-950/10">
            {/* Project selector (dropdown) - visible on all breakpoints */}
            <div className="p-4 lg:p-6 border-b border-white/5 bg-slate-900/40 backdrop-blur-md flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
                {currentProject ? (
                <div className="flex items-center gap-3 lg:gap-5">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black">
                    {currentProject.title.charAt(0)}
                    </div>
                    <div className="min-w-0">
                    <h4 className="font-black text-sm lg:text-xl text-white tracking-tight truncate">{currentProject.title}</h4>
                    <p className="hidden lg:block text-[9px] text-indigo-400 font-black uppercase tracking-[0.2em]">DIRECT SECURE CHANNEL</p>
                    </div>
                </div>
                ) : (
                <div className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Select a project thread</div>
                )}
            </div>

            <div className="w-full lg:w-72">
                <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">
                Project
                </label>
                <div className="relative">
                <select
                    value={selectedProjectId}
                    onChange={e => setSelectedProjectId(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 pr-8 text-xs lg:text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/60 appearance-none"
                >
                    {projects.map((p: Project) => (
                    <option key={p.id} value={p.id}>
                        {p.title}
                    </option>
                    ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
            </div>
            </div>
            
            <div className="flex-grow p-4 lg:p-10 overflow-y-auto space-y-6 lg:space-y-8">
            {projectMessages.length > 0 ? projectMessages.map((m: Message) => (
                <div key={m.id} className={`flex ${m.isSystem ? 'justify-center' : m.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] p-6 rounded-[2rem] text-sm leading-relaxed ${
                    m.isSystem 
                    ? 'bg-indigo-500/10 text-indigo-400 font-black border border-indigo-500/20 px-10 py-2.5 rounded-full text-[10px] tracking-widest uppercase' 
                    : m.senderId === user?.id 
                        ? 'bg-indigo-600 text-white rounded-tr-none shadow-2xl' 
                        : 'bg-slate-800 border border-white/10 text-slate-300 rounded-tl-none shadow-xl'
                }`}>
                    {!m.isSystem && (
                    <div className="flex items-center justify-between gap-10 mb-2 border-b border-white/5 pb-2">
                        <p className="text-[8px] font-black opacity-60 uppercase tracking-widest">{m.senderName}</p>
                        <p className="text-[8px] font-black opacity-30 uppercase">{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    )}
                    <p className="font-medium">{m.text}</p>
                </div>
                </div>
            )) : (
                <div className="h-full flex flex-col items-center justify-center opacity-10">
                <MessageSquare size={80} className="mb-6" />
                <p className="font-black uppercase tracking-[0.4em] text-xl">Ready for Sync</p>
                </div>
            )}
            </div>
            
            <div className="p-4 lg:p-8 bg-slate-900/60 border-t border-white/10">
            <div className="flex items-center gap-6 mb-5">
                <button 
                onClick={() => setIsSystemMsg(!isSystemMsg)} 
                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all border ${
                    isSystemMsg ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/5 text-slate-500 hover:text-white'
                }`}
                >
                SYSTEM PROTOCOL
                </button>
            </div>
            <div className="flex gap-4">
                <input 
                disabled={!selectedProjectId}
                value={inputText} 
                onChange={e => setInputText(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleSend()} 
                placeholder={isSystemMsg ? "Post automated system update..." : "Direct reply to client..."} 
                className="flex-grow bg-slate-950 border border-white/10 rounded-[1.5rem] px-8 py-5 text-sm text-white focus:outline-none focus:border-indigo-600 transition-all font-medium disabled:opacity-50" 
                />
                <button 
                disabled={!selectedProjectId}
                onClick={handleSend} 
                className="bg-indigo-600 w-16 h-16 rounded-[1.5rem] text-white hover:bg-indigo-500 shadow-2xl shadow-indigo-600/40 flex items-center justify-center transition-all active:scale-95 disabled:opacity-50"
                >
                <Send size={24} />
                </button>
            </div>
            </div>
        </div>
        </div>
    );
    };

    const AdminClients = ({ projects }: { projects: Project[] }) => {
    const [clients, setClients] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState<string | null>(null);
    const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('osf_token');
            if (!token) return;
            
            const res = await fetch('http://localhost:5000/api/auth/clients', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (res.ok) {
                const data = await res.json();
                setClients(data);
            }
        } catch (err) {
            console.error('Failed to fetch clients:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const getClientProjects = (clientId: string) => {
        return projects.filter(p => {
            const pid = typeof p.clientId === 'string' ? p.clientId : (p.clientId as Partial<User>)?.id;
            return pid === clientId;
        });
    };

    const handleViewProjects = (clientId: string) => {
        setSelectedClient(clientId);
        setActionMenuOpen(null);
    };

    const handleDeactivateClient = async (clientId: string) => {
        if (!confirm('Are you sure you want to deactivate this client?')) return;
        
        try {
            const token = localStorage.getItem('osf_token');
            if (!token) return;
            
            // Note: You'll need to add this endpoint to the backend
            const res = await fetch(`http://localhost:5000/api/auth/clients/${clientId}/deactivate`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (res.ok) {
                fetchClients();
                setActionMenuOpen(null);
            }
        } catch (err) {
            console.error('Failed to deactivate client:', err);
            alert('Failed to deactivate client');
        }
    };

    return (
        <div className="space-y-6">
        <div className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-950/50">
            <h3 className="font-black text-white uppercase text-[10px] tracking-[0.4em]">Client Infrastructure</h3>
            <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">{clients.length} Active Partners</span>
            </div>
            {isLoading ? (
            <div className="p-16 text-center">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-4" />
                <p className="text-slate-500 text-sm">Loading clients...</p>
            </div>
            ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                <thead className="text-[9px] uppercase font-black text-slate-500 border-b border-white/5 bg-slate-950/20">
                    <tr>
                    <th className="px-8 py-6">Partner Identity</th>
                    <th className="px-8 py-6">Contact</th>
                    <th className="px-8 py-6">Projects</th>
                    <th className="px-8 py-6">Lifecycle Status</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {clients.map(client => {
                    const clientProjects = getClientProjects(client.id);
                    return (
                    <tr key={client.id} className="hover:bg-white/2 transition-all">
                        <td className="px-8 py-8">
                        <div className="flex items-center gap-5">
                            <img src={client.avatar} alt={client.name} className="w-12 h-12 rounded-2xl bg-indigo-600 border border-indigo-500 object-cover shadow-lg" />
                            <div>
                            <p className="font-black text-white text-base tracking-tight">{client.name}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{client.company || 'No company'}</p>
                            </div>
                        </div>
                        </td>
                        <td className="px-8 py-8">
                        <p className="text-slate-400 text-sm font-medium">{client.email}</p>
                        {client.lastLogin && (
                            <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mt-1">
                            Last active: {new Date(client.lastLogin).toLocaleDateString()}
                            </p>
                        )}
                        </td>
                        <td className="px-8 py-8">
                        <div className="flex items-center gap-3">
                            <span className="text-indigo-400 font-black text-lg">{clientProjects.length}</span>
                            <span className="text-[9px] text-slate-500 uppercase tracking-widest">Active Projects</span>
                        </div>
                        </td>
                        <td className="px-8 py-8">
                        <span className={`px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[9px] border ${
                            client.isActive 
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                            : 'bg-slate-700/10 text-slate-500 border-slate-700/20'
                        }`}>
                            {client.isActive ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                        </td>
                        <td className="px-8 py-8 text-right">
                        <div className="relative inline-block">
                            <button 
                            onClick={() => setActionMenuOpen(actionMenuOpen === client.id ? null : client.id)}
                            className="p-3 text-slate-600 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                            >
                            <MoreVertical size={18} />
                            </button>
                            {actionMenuOpen === client.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                                <button
                                onClick={() => handleViewProjects(client.id)}
                                className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/5 transition-colors flex items-center gap-3"
                                >
                                <Rocket size={16} className="text-indigo-400" />
                                View Projects ({clientProjects.length})
                                </button>
                                <button
                                onClick={() => {
                                    navigator.clipboard.writeText(client.email);
                                    setActionMenuOpen(null);
                                    alert('Email copied to clipboard');
                                }}
                                className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/5 transition-colors flex items-center gap-3"
                                >
                                <FileText size={16} className="text-slate-400" />
                                Copy Email
                                </button>
                                {client.isActive && (
                                <button
                                    onClick={() => handleDeactivateClient(client.id)}
                                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-3"
                                >
                                    <X size={16} />
                                    Deactivate
                                </button>
                                )}
                            </div>
                            )}
                        </div>
                        </td>
                    </tr>
                    );
                    })}
                </tbody>
                </table>
            </div>
            )}
        </div>
        
        {selectedClient && (
            <div className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-950/50">
                <h3 className="font-black text-white uppercase text-[10px] tracking-[0.4em]">
                Projects for {clients.find(c => c.id === selectedClient)?.name}
                </h3>
                <button 
                onClick={() => setSelectedClient(null)}
                className="text-slate-500 hover:text-white transition-colors"
                >
                <X size={20} />
                </button>
            </div>
            <div className="p-8">
                {getClientProjects(selectedClient).length > 0 ? (
                <div className="space-y-4">
                    {getClientProjects(selectedClient).map(project => (
                    <div key={project.id} className="p-6 bg-slate-950/50 border border-white/5 rounded-2xl hover:border-indigo-500/30 transition-all">
                        <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-black text-white text-lg mb-2">{project.title}</h4>
                            <p className="text-slate-400 text-sm mb-3">{project.description}</p>
                            <div className="flex items-center gap-4">
                            <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Stage: {project.stage}</span>
                            <span className="text-[9px] font-black uppercase text-indigo-400 tracking-widest">Progress: {project.progressPercent}%</span>
                            </div>
                        </div>
                        <Link 
                            to="/dashboard/admin/projects"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-500 transition-colors"
                        >
                            View Details
                        </Link>
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                <div className="py-16 text-center text-slate-500">
                    <Rocket size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm font-black uppercase tracking-widest">No projects assigned</p>
                </div>
                )}
            </div>
            </div>
        )}
        </div>
    );
    }

    const AdminCompletedProjects = () => {
    const { projects } = useAppState();
    const completedProjects = projects.filter((p: Project) => p.status === 'completed');

    return (
        <div className="space-y-6">
        <div className="flex items-center justify-between mb-8">
            <div>
            <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Completed Projects</h2>
            <p className="text-slate-500 text-lg font-medium">Archive of successfully delivered operations</p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-6 py-4">
            <div className="text-emerald-400 font-black text-3xl tracking-tighter">{completedProjects.length}</div>
            <div className="text-[9px] font-black uppercase text-emerald-500 tracking-widest mt-1">COMPLETED</div>
            </div>
        </div>

        {completedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {completedProjects.map((p: Project) => {
                const clientName = typeof p.clientId === 'string' 
                    ? 'Client' 
                    : (p.clientId as Partial<User>)?.name || 'Client';
                const clientEmail = typeof p.clientId === 'string' 
                    ? '' 
                    : (p.clientId as Partial<User>)?.email || '';
                
                return (
                <div key={p.id} className="bg-slate-900/50 border border-emerald-500/20 rounded-[2.5rem] p-10 hover:border-emerald-500/40 transition-all duration-500 flex flex-col justify-between shadow-2xl group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                    <CheckCircle2 size={120} className="text-emerald-500" />
                    </div>
                    
                    <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all shadow-xl">
                        <CheckCircle2 size={28} />
                        </div>
                        <div className="text-[9px] font-black uppercase tracking-[0.3em] px-4 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">COMPLETED</div>
                    </div>
                    
                    <h4 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-emerald-400 transition-colors">{p.title}</h4>
                    <p className="text-sm text-slate-400 mb-6 leading-relaxed font-medium line-clamp-3">{p.description}</p>
                    
                    <div className="space-y-4 pt-6 border-t border-white/5">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-500">Client</span>
                        <span className="text-white">{clientName}</span>
                        </div>
                        {clientEmail && (
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="text-slate-500">Email</span>
                            <span className="text-slate-400 text-[9px]">{clientEmail}</span>
                        </div>
                        )}
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-500">Final Stage</span>
                        <span className="text-emerald-400">{p.stage}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-500">Progress</span>
                        <span className="text-white">{p.progressPercent}%</span>
                        </div>
                        <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5 mt-4">
                        <div className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)] transition-all duration-1000" style={{ width: `${p.progressPercent}%` }}></div>
                        </div>
                        <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest mt-4 pt-4 border-t border-white/5">
                        <span className="text-slate-600">Completed</span>
                        <span className="text-slate-400">{new Date(p.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </div>
                    </div>
                </div>
                );
            })}
            </div>
        ) : (
            <div className="py-32 text-center glass-card rounded-[3rem] border border-white/10">
            <CheckCircle2 size={80} className="mx-auto text-slate-700 mb-6 opacity-20" />
            <h3 className="text-3xl font-black text-white mb-4">No Completed Projects Yet</h3>
            <p className="text-slate-500 max-w-md mx-auto">Projects marked as completed will appear here. Keep building! 🚀</p>
            </div>
        )}
        </div>
    );
    };

    const AdminProjects = () => {
    const { projects, updateProjectStage, addFile, addProject, refreshData, sendMessage } = useAppState();
    // Filter out completed projects - they should only appear in Completed section
    const activeProjects = projects.filter((p: Project) => p.status !== 'completed');
    const [showModal, setShowModal] = useState(false);
    const [newProject, setNewProject] = useState({ title: '', description: '', clientId: '' });
    const [clients, setClients] = useState<User[]>([]);
    const [clientSearch, setClientSearch] = useState('');
    const [showClientDropdown, setShowClientDropdown] = useState(false);
    const [isLoadingClients, setIsLoadingClients] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadProjectId, setUploadProjectId] = useState<string>('');
    const [dragActive, setDragActive] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch clients when modal opens
    useEffect(() => {
        if (showModal) {
            fetchClients();
        }
    }, [showModal]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowClientDropdown(false);
            }
        };

        if (showClientDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showClientDropdown]);

    const fetchClients = async () => {
        setIsLoadingClients(true);
        try {
            const token = localStorage.getItem('osf_token');
            if (!token) return;
            
            const res = await fetch('http://localhost:5000/api/auth/clients', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (res.ok) {
                const data = await res.json();
                setClients(data);
            }
        } catch (err) {
            console.error('Failed to fetch clients:', err);
        } finally {
            setIsLoadingClients(false);
        }
    };

    const filteredClients = clients.filter(client => 
        client.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
        client.email.toLowerCase().includes(clientSearch.toLowerCase()) ||
        (client.company && client.company.toLowerCase().includes(clientSearch.toLowerCase()))
    );

    const selectedClient = clients.find(c => c.id === newProject.clientId);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProject.title || !newProject.description || !newProject.clientId) {
            alert('Please fill all fields including selecting a client');
            return;
        }
        
        addProject({
          title: newProject.title,
          description: newProject.description,
          clientId: newProject.clientId
        });
        
        setShowModal(false);
        setNewProject({ title: '', description: '', clientId: '' });
        setClientSearch('');
        setShowClientDropdown(false);
        refreshData();
      };

    const handleUploadClick = (projectId: string) => {
        setUploadProjectId(projectId);
        setShowUploadModal(true);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            await uploadFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            await uploadFile(e.target.files[0]);
        }
    };

    const uploadFile = async (file: File) => {
        if (!uploadProjectId) return;
        
        setUploading(true);
        try {
            const token = localStorage.getItem('osf_token');
            if (!token) {
                alert('Please login again');
                return;
            }

            // For now, we'll create a file metadata entry
            // In production, you'd upload to S3/Cloudinary first, then save metadata
            const fileSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
            const fileName = file.name;

            // Create a temporary URL (in production, this would be the actual uploaded file URL)
            const fileUrl = URL.createObjectURL(file);

            const res = await fetch('http://localhost:5000/api/files', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    projectId: uploadProjectId,
                    name: fileName,
                    url: fileUrl,
                    size: fileSize
                })
            });

            if (res.ok) {
                const fileData = await res.json();
                
                // Send notification message to client
                const project = projects.find((p: Project) => p.id === uploadProjectId);
                if (project) {
                    await sendMessage(uploadProjectId, `📎 New asset uploaded: ${fileName}`, true);
                }

                // Refresh data
                refreshData();
                
                setShowUploadModal(false);
                setUploadProjectId('');
                alert(`File "${fileName}" uploaded successfully!`);
            } else {
                const error = await res.json();
                alert(`Upload failed: ${error.message || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Upload error:', err);
            alert('Failed to upload file. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {activeProjects.map((p: Project) => (
            <div key={p.id} className="bg-slate-900/50 border border-white/10 rounded-[2.5rem] p-10 hover:border-indigo-500/30 transition-all duration-500 flex flex-col justify-between shadow-2xl group">
            <div>
                <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xl"><Rocket size={28} /></div>
                <div className="flex flex-col items-end gap-2">
                    <div className="text-[9px] font-black uppercase tracking-[0.3em] px-4 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">OPERATIONAL</div>
                    <button onClick={() => handleUploadClick(p.id)} className="text-[8px] font-black uppercase tracking-widest text-slate-500 hover:text-white flex items-center gap-1 transition-colors"><Plus size={10} /> Upload Asset</button>
                </div>
                </div>
                <h4 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-indigo-400 transition-colors">{p.title}</h4>
                <p className="text-sm text-slate-500 mb-10 leading-relaxed font-medium line-clamp-2">{p.description}</p>
            </div>
            
            <div className="space-y-6 pt-10 border-t border-white/5">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest items-center">
                  <span className="text-slate-500 uppercase tracking-widest">
                    {p.status === 'completed' ? 'Completed' : 'Update State'}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-white">{p.progressPercent}%</span>
                    <button
                      type="button"
                      onClick={() => updateProjectStage(p.id, 'Launch', 'completed')}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] ${
                        p.status === 'completed'
                          ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                          : 'bg-slate-900 border-slate-600 text-emerald-400 hover:bg-emerald-500 hover:border-emerald-500 hover:text-slate-950 transition-colors'
                      }`}
                      title="Mark project as completed"
                    >
                      ✓
                    </button>
                  </div>
                </div>
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.6)] transition-all duration-1000" style={{ width: `${p.progressPercent}%` }}></div>
                </div>
                <div className="flex flex-wrap gap-2 pt-4">
                {STAGES.map(s => (
                    <button 
                    key={s} 
                    onClick={() => updateProjectStage(p.id, s)} 
                    className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border transition-all ${
                        p.stage === s ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-slate-950 border-white/5 text-slate-600 hover:text-white'
                    }`}
                    >
                    {s}
                    </button>
                ))}
                </div>
            </div>
            </div>
        ))}
        <button 
            onClick={() => setShowModal(true)} 
            className="border-2 border-dashed border-white/10 rounded-[2.5rem] p-16 flex flex-col items-center justify-center text-slate-700 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-600/5 transition-all duration-500 active:scale-95 group"
        >
            <Plus size={48} className="mb-6 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-black uppercase tracking-[0.4em]">INITIATE NEW SPRINT</span>
        </button>

        {/* NEW PROJECT MODAL */}
        <AnimatePresence>
            {showModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
                <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card w-full max-w-lg rounded-[3rem] p-10 relative"
                >
                <button 
                    onClick={() => {
                        setShowModal(false);
                        setNewProject({ title: '', description: '', clientId: '' });
                        setClientSearch('');
                        setShowClientDropdown(false);
                    }} 
                    className="absolute top-8 right-8 text-slate-500 hover:text-white"
                >
                    <X size={24} />
                </button>
                <h3 className="text-2xl font-black text-white mb-8">Deploy New Sprint</h3>
                <form onSubmit={handleCreate} className="space-y-6">
                    <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-2">Project Title</label>
                    <input required value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500" placeholder="E.g. Nexus CRM" />
                    </div>
                    <div className="relative">
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-2">Assign Client</label>
                    <div className="relative" ref={dropdownRef}>
                        <div 
                            onClick={() => setShowClientDropdown(!showClientDropdown)}
                            className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 cursor-pointer flex items-center justify-between hover:border-indigo-500/50 transition-colors"
                        >
                            <span className={selectedClient ? 'text-white' : 'text-slate-500'}>
                                {selectedClient ? `${selectedClient.name}${selectedClient.company ? ` • ${selectedClient.company}` : ''}` : 'Search and select a client...'}
                            </span>
                            <ChevronRight size={18} className={`text-slate-500 transition-transform ${showClientDropdown ? 'rotate-90' : ''}`} />
                        </div>
                        {showClientDropdown && (
                            <div className="absolute z-50 w-full mt-2 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl max-h-64 overflow-hidden">
                                <div className="p-3 border-b border-white/5">
                                    <div className="relative">
                                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
                                        <input
                                            type="text"
                                            value={clientSearch}
                                            onChange={e => setClientSearch(e.target.value)}
                                            placeholder="Search by name, email, or company..."
                                            className="w-full bg-slate-950 border border-white/10 rounded-xl px-10 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                <div className="overflow-y-auto max-h-48">
                                    {isLoadingClients ? (
                                        <div className="p-8 text-center text-slate-500 text-sm">Loading clients...</div>
                                    ) : filteredClients.length > 0 ? (
                                        filteredClients.map(client => (
                                            <button
                                                key={client.id}
                                                type="button"
                                                onClick={() => {
                                                    setNewProject({...newProject, clientId: client.id});
                                                    setShowClientDropdown(false);
                                                    setClientSearch('');
                                                }}
                                                className="w-full text-left p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <img src={client.avatar} alt={client.name} className="w-10 h-10 rounded-xl bg-indigo-600 border border-indigo-500 object-cover" />
                                                    <div className="flex-grow">
                                                        <p className="text-white font-bold text-sm">{client.name}</p>
                                                        <p className="text-slate-500 text-xs">{client.email}</p>
                                                        {client.company && <p className="text-slate-600 text-[10px] uppercase tracking-widest mt-1">{client.company}</p>}
                                                    </div>
                                                    {newProject.clientId === client.id && (
                                                        <CheckCircle2 size={18} className="text-indigo-500" />
                                                    )}
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-slate-500 text-sm">No clients found</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    </div>
                    <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-2">Description</label>
                    <textarea rows={3} required value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500" placeholder="Short scope summary..." />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all">Launch Operation</button>
                </form>
                </motion.div>
            </div>
            )}
        </AnimatePresence>

        {/* FILE UPLOAD MODAL */}
        <AnimatePresence>
            {showUploadModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
                <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card w-full max-w-2xl rounded-[3rem] p-10 relative"
                >
                <button 
                    onClick={() => {
                        setShowUploadModal(false);
                        setUploadProjectId('');
                        setDragActive(false);
                    }} 
                    className="absolute top-8 right-8 text-slate-500 hover:text-white"
                >
                    <X size={24} />
                </button>
                <h3 className="text-2xl font-black text-white mb-8">Upload Project Asset</h3>
                
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all ${
                        dragActive 
                            ? 'border-indigo-500 bg-indigo-500/10' 
                            : 'border-white/10 hover:border-indigo-500/50 hover:bg-white/5'
                    } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileInput}
                        className="hidden"
                        disabled={uploading}
                    />
                    {uploading ? (
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
                            <p className="text-white font-bold text-lg">Uploading...</p>
                        </div>
                    ) : (
                        <>
                            <CloudUpload size={64} className="mx-auto mb-6 text-indigo-400" />
                            <p className="text-white font-black text-xl mb-2">Drag & Drop your file here</p>
                            <p className="text-slate-500 text-sm mb-4">or click to browse</p>
                            <p className="text-slate-600 text-xs uppercase tracking-widest">Supports all file types</p>
                        </>
                    )}
                </div>
                
                <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
                    <span>File will be available to the client immediately</span>
                    <span>Max size: 100MB</span>
                </div>
                </motion.div>
            </div>
            )}
        </AnimatePresence>
        </div>
    );
    };

    // Helpers
    const AdminStat = ({ label, value, color, trend }: any) => {
    const colors: any = {
        indigo: 'text-indigo-500', emerald: 'text-emerald-500', amber: 'text-amber-500', slate: 'text-slate-400'
    };
    return (
        <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl shadow-xl">
        <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.3em] mb-4">{label}</p>
        <p className={`text-4xl font-black ${colors[color]} tracking-tighter mb-2`}>{value}</p>
        <p className="text-[9px] font-black uppercase text-slate-700 tracking-widest">{trend}</p>
        </div>
    );
    };

    const Metric = ({ label, value }: { label: string, value: string }) => (
    <div>
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3">{label}</p>
        <p className="text-white font-black text-lg tracking-tight">{value}</p>
    </div>
    );

    export default Dashboard;
