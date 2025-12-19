
import React, { useState, useEffect, useRef } from 'react';
import { Article, Word, LearningStatus } from '../types';
import { Icons } from '../constants';
import { lookupWord, generateSummary } from '../services/geminiService';

interface ReaderProps {
  article: Article;
  onClose: () => void;
  onAddWord: (word: Word) => void;
  words: Word[];
}

const Reader: React.FC<ReaderProps> = ({ article, onClose, onAddWord, words }) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const summarize = async () => {
      setIsSummarizing(true);
      const res = await generateSummary(article.content);
      setSummary(res || null);
      setIsSummarizing(false);
    };
    summarize();
  }, [article.id]);

  const handleSelection = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    
    if (text && text.length > 0 && text.length < 50) {
      const range = selection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();
      
      if (rect) {
        setPopoverPos({
          top: rect.top + window.scrollY - 10,
          left: rect.left + rect.width / 2
        });
        setSelectedWord(text);
        handleLookup(text);
      }
    } else {
      setSelectedWord(null);
      setLookupResult(null);
    }
  };

  const handleLookup = async (word: string) => {
    setIsLookingUp(true);
    const result = await lookupWord(word);
    setLookupResult(result);
    setIsLookingUp(false);
  };

  const saveWord = () => {
    if (lookupResult) {
      const newWord: Word = {
        id: Math.random().toString(36).substr(2, 9),
        text: lookupResult.word,
        definition: lookupResult.definition,
        translation: lookupResult.translation,
        example: lookupResult.example,
        status: LearningStatus.NEW,
        nextReviewAt: Date.now() + 86400000,
        easinessFactor: 2.5,
        interval: 1,
        repetition: 0,
        addedAt: Date.now()
      };
      onAddWord(newWord);
      setSelectedWord(null);
    }
  };

  return (
    <div className="bg-white min-h-full">
      {/* Reader Controls */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md z-30 border-b border-slate-100 h-14 flex items-center px-6 justify-between">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase tracking-widest">
                Reading Mode
            </span>
        </div>
        <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-slate-600"><Icons.TrendingUp /></button>
            <button className="text-slate-400 hover:text-slate-600"><Icons.Calendar /></button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Article Metadata */}
        <div className="mb-10 text-center">
            <div className="inline-block px-4 py-1.5 bg-slate-100 rounded-full text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">
                {article.sourceName}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 serif leading-tight mb-6">
                {article.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-slate-400 text-sm">
                <span className="flex items-center gap-1.5"><Icons.Clock /> {new Date(article.savedAt).toDateString()}</span>
                <span className="flex items-center gap-1.5 underline decoration-slate-200"><Icons.ExternalLink /> Original Source</span>
            </div>
        </div>

        {/* AI Summary Card */}
        <div className="mb-12 bg-blue-50/50 border border-blue-100 rounded-3xl p-6 md:p-8 relative">
           <div className="flex items-center gap-2 mb-4 text-blue-600">
               <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
               <span className="text-xs font-bold uppercase tracking-widest">AI Summary</span>
           </div>
           {isSummarizing ? (
               <div className="space-y-2 animate-pulse">
                   <div className="h-4 bg-blue-100 rounded w-full"></div>
                   <div className="h-4 bg-blue-100 rounded w-[80%]"></div>
               </div>
           ) : (
               <p className="text-slate-700 leading-relaxed font-medium italic">"{summary}"</p>
           )}
        </div>

        {/* Article Image */}
        <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200">
            <img 
                src={article.screenshot || `https://picsum.photos/seed/${article.id}/1200/600`} 
                alt="Article Header" 
                className="w-full h-auto object-cover"
            />
        </div>

        {/* Content Body */}
        <div 
          ref={contentRef}
          onMouseUp={handleSelection}
          className="serif text-xl leading-relaxed text-slate-800 space-y-6"
        >
          {article.content.split('\n\n').map((para, idx) => (
            <p key={idx} className="first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-blue-600">
              {para}
            </p>
          ))}
        </div>

        {/* Lookup Popover */}
        {selectedWord && (
          <div 
            className="fixed z-50 -translate-x-1/2 -translate-y-[110%] w-[320px]"
            style={{ top: popoverPos.top, left: popoverPos.left }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden ring-4 ring-black/5 animate-in fade-in zoom-in duration-200">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <h4 className="font-bold text-slate-900">{selectedWord}</h4>
                <button onClick={() => setSelectedWord(null)} className="text-slate-400 hover:text-slate-600">
                  <Icons.Search />
                </button>
              </div>
              <div className="p-4 space-y-3">
                {isLookingUp ? (
                  <div className="flex flex-col items-center py-4 space-y-2">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs text-slate-400 font-medium">Looking up definition...</p>
                  </div>
                ) : lookupResult ? (
                  <>
                    <div>
                        <p className="text-xs font-bold text-blue-600 uppercase mb-1">Definition</p>
                        <p className="text-sm text-slate-700">{lookupResult.definition}</p>
                    </div>
                    <div className="bg-emerald-50 p-2 rounded-lg">
                        <p className="text-xs font-bold text-emerald-600 uppercase mb-0.5">Translation</p>
                        <p className="text-sm font-semibold text-emerald-900">{lookupResult.translation}</p>
                    </div>
                    <button 
                      onClick={saveWord}
                      className="w-full bg-slate-900 text-white py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                    >
                      <Icons.Plus /> Save to Word Bank
                    </button>
                  </>
                ) : (
                  <p className="text-sm text-rose-500 text-center py-2">Couldn't find word definition.</p>
                )}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-slate-100"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reader;
