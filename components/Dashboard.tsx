
import React from 'react';
import { Icons } from '../constants';
import { UserStats } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface DashboardProps {
  stats: UserStats;
  onNavigate: (view: 'articles' | 'review' | 'wordbank') => void;
}

const data = [
  { name: 'Mon', words: 12 },
  { name: 'Tue', words: 18 },
  { name: 'Wed', words: 15 },
  { name: 'Thu', words: 25 },
  { name: 'Fri', words: 20 },
  { name: 'Sat', words: 35 },
  { name: 'Sun', words: 30 },
];

const Dashboard: React.FC<DashboardProps> = ({ stats, onNavigate }) => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Explorer! 👋</h1>
            <p className="text-blue-100 max-w-md opacity-90">
              You're on a <span className="font-bold">{stats.studyStreak} day streak</span>. Keep it up to build a lasting habit!
            </p>
          </div>
          <button 
            onClick={() => onNavigate('articles')}
            className="bg-white text-blue-600 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2 w-fit"
          >
            <Icons.Plus />
            Start Reading
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-[0.05] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Icons.Book />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Articles Read</p>
            <p className="text-2xl font-bold text-slate-800">{stats.articlesRead}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Icons.Layers />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Words Learned</p>
            <p className="text-2xl font-bold text-slate-800">{stats.wordsLearned}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <Icons.TrendingUp />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Daily Goal</p>
            <p className="text-2xl font-bold text-slate-800">{stats.dailyGoal}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Learning Activity Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800 text-lg">Activity History</h3>
            <select className="text-sm bg-slate-50 border-none rounded-lg px-3 py-1.5 font-medium text-slate-600 outline-none">
              <option>Last 7 Days</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="words" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorWords)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions / Up Next */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Daily Targets</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 font-medium">Read 2 Articles</span>
                  <span className="text-blue-600 font-bold">50%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-[50%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 font-medium">Learn 15 Words</span>
                  <span className="text-emerald-600 font-bold">80%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[80%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('review')}
            className="group cursor-pointer bg-slate-900 rounded-3xl p-6 text-white hover:bg-slate-800 transition-all shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Icons.CheckCircle />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Up Next</span>
            </div>
            <h4 className="text-lg font-bold mb-1">Review Session</h4>
            <p className="text-slate-400 text-sm mb-6">You have 8 words ready for review.</p>
            <div className="flex items-center text-blue-400 font-bold text-sm gap-1 group-hover:translate-x-1 transition-transform">
              Start Now <Icons.Plus />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
