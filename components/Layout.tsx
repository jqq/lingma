
import React from 'react';
import { Icons } from '../constants';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  setView: (view: View) => void;
  reviewCount: number;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setView, reviewCount }) => {
  const menuItems = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: <Icons.Dashboard /> },
    { id: 'articles' as View, label: 'Articles', icon: <Icons.Book /> },
    { id: 'wordbank' as View, label: 'Word Bank', icon: <Icons.Layers /> },
    { id: 'review' as View, label: 'Flashcards', icon: <Icons.CheckCircle />, badge: reviewCount > 0 ? reviewCount : undefined },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">LinguaFlow</h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeView === item.id 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <span className={`${activeView === item.id ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                {item.icon}
              </span>
              <span className="font-medium text-sm">{item.label}</span>
              {item.badge && (
                <span className="ml-auto px-2 py-0.5 text-xs font-bold bg-rose-500 text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-slate-900 rounded-2xl p-5 text-white relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-slate-400 text-xs font-medium mb-1 uppercase tracking-wider">Today's Progress</p>
              <p className="text-lg font-bold mb-3">12 / 20 Words</p>
              <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[60%] rounded-full"></div>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-20">
          <h2 className="text-slate-800 font-semibold capitalize">{activeView}</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Icons.Search />
               </span>
               <input 
                  type="text" 
                  placeholder="Search articles or words..." 
                  className="bg-slate-100 border-none rounded-full pl-10 pr-4 py-1.5 text-sm w-64 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
               />
            </div>
            <div className="w-9 h-9 bg-slate-200 rounded-full border-2 border-white shadow-sm overflow-hidden cursor-pointer hover:border-blue-500 transition-all">
                <img src="https://picsum.photos/100" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Scrollable area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
