
import React, { useState } from 'react';
import { Word, LearningStatus } from '../types';
import { Icons } from '../constants';

interface WordBankProps {
  words: Word[];
}

const WordBank: React.FC<WordBankProps> = ({ words }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWords = words.filter(w => 
    w.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.translation.includes(searchTerm)
  );

  const getStatusColor = (status: LearningStatus) => {
    switch (status) {
      case LearningStatus.NEW: return 'bg-blue-100 text-blue-600';
      case LearningStatus.LEARNING: return 'bg-amber-100 text-amber-600';
      case LearningStatus.REVIEWING: return 'bg-purple-100 text-purple-600';
      case LearningStatus.MASTERED: return 'bg-emerald-100 text-emerald-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1">Word Bank</h2>
          <p className="text-slate-500 text-sm">Mastering {words.length} vocabulary items.</p>
        </div>
        <div className="relative">
          <Icons.Search />
          <input 
            type="text" 
            placeholder="Search words..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Word</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Translation</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Added</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredWords.map((word) => (
                <tr key={word.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">{word.text}</p>
                    <p className="text-xs text-slate-400 italic line-clamp-1">{word.definition}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-600">{word.translation}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(word.status)}`}>
                      {word.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-400">{new Date(word.addedAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-300 hover:text-rose-500 p-2 rounded-lg hover:bg-rose-50 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredWords.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center opacity-40">
                      <Icons.Search />
                      <p className="mt-4 font-bold text-slate-500">No words found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WordBank;
