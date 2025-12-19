
import React from 'react';
import { Article } from '../types';
import { Icons } from '../constants';

interface ArticleListProps {
  articles: Article[];
  onSelect: (id: string) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, onSelect }) => {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1">My Library</h2>
          <p className="text-slate-500 text-sm">You have {articles.length} articles saved for later.</p>
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">All</button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">Unread</button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">Finished</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div 
            key={article.id}
            onClick={() => onSelect(article.id)}
            className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={article.screenshot || `https://picsum.photos/seed/${article.id}/800/400`} 
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-sm">
                  {article.sourceName}
                </span>
              </div>
              {article.readProgress === 100 && (
                <div className="absolute top-4 right-4">
                  <span className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    <Icons.CheckCircle />
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-slate-800 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h3>
              
              <div className="mt-auto space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Icons.Clock />
                    {new Date(article.savedAt).toLocaleDateString()}
                  </span>
                  <span className="font-bold text-slate-600">
                    {article.readProgress}% Read
                  </span>
                </div>
                
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${article.readProgress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`}
                    style={{ width: `${article.readProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Upload Simulation Card */}
        <div className="border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 bg-slate-50 hover:bg-white hover:border-blue-400 transition-all group cursor-pointer h-[380px]">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:scale-110 transition-all mb-4">
            <Icons.Plus />
          </div>
          <p className="font-bold text-slate-600 mb-1">Add New Article</p>
          <p className="text-slate-400 text-sm text-center">Use browser extension or paste URL</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
