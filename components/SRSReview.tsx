
import React, { useState } from 'react';
import { Word, LearningStatus } from '../types';
import { Icons } from '../constants';

interface SRSReviewProps {
  words: Word[];
  onReviewComplete: (updatedWords: Word[]) => void;
  onFinish: () => void;
}

const SRSReview: React.FC<SRSReviewProps> = ({ words, onReviewComplete, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedWords, setReviewedWords] = useState<Word[]>([]);

  const currentWord = words[currentIndex];

  const handleRating = (difficulty: 'hard' | 'good' | 'easy') => {
    const updatedWord = { ...currentWord };
    
    // Simple Leitner simulation
    if (difficulty === 'easy') {
      updatedWord.status = LearningStatus.MASTERED;
    } else if (difficulty === 'good') {
      updatedWord.status = LearningStatus.REVIEWING;
    } else {
      updatedWord.status = LearningStatus.LEARNING;
    }

    const newReviewed = [...reviewedWords, updatedWord];
    setReviewedWords(newReviewed);

    if (currentIndex < words.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex + 1);
    } else {
      onReviewComplete(newReviewed);
      onFinish();
    }
  };

  if (!currentWord) return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-50">
        <div className="bg-white p-12 rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col items-center max-w-md text-center">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mb-6">
                <Icons.CheckCircle />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Session Complete!</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">You've cleared all your pending reviews for today. Great job!</p>
            <button 
                onClick={onFinish}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl"
            >
                Back to Dashboard
            </button>
        </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-50">
      <div className="w-full max-w-xl">
        {/* Progress Bar */}
        <div className="mb-8 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>Progress: {currentIndex + 1} / {words.length}</span>
            <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-blue-600 transition-all duration-300" 
                    style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
                ></div>
            </div>
        </div>

        {/* Flashcard */}
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className={`relative w-full h-[400px] cursor-pointer preserve-3d transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
          style={{ perspective: '1000px' }}
        >
          {/* Front */}
          <div className={`absolute inset-0 w-full h-full backface-hidden bg-white rounded-[40px] shadow-2xl shadow-slate-200 border-2 border-slate-50 flex flex-col items-center justify-center p-12 text-center transition-opacity duration-300 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
            <p className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Vocabulary</p>
            <h3 className="text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">{currentWord.text}</h3>
            <p className="text-slate-400 italic font-medium">Click card to reveal definition</p>
          </div>

          {/* Back */}
          <div className={`absolute inset-0 w-full h-full backface-hidden bg-white rounded-[40px] shadow-2xl shadow-slate-200 border-2 border-slate-50 flex flex-col items-center justify-center p-12 text-center rotate-y-180 transition-opacity duration-300 ${!isFlipped ? 'opacity-0' : 'opacity-100'}`}>
            <p className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">Translation</p>
            <h3 className="text-4xl font-extrabold text-emerald-900 mb-6 tracking-tight">{currentWord.translation}</h3>
            <div className="space-y-4 max-w-sm">
                <p className="text-slate-600 font-medium leading-relaxed">{currentWord.definition}</p>
                <p className="text-slate-400 text-sm italic">"{currentWord.example}"</p>
            </div>
          </div>
        </div>

        {/* Rating Controls */}
        <div className={`mt-12 grid grid-cols-3 gap-4 transition-all duration-300 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <button 
            onClick={() => handleRating('hard')}
            className="flex flex-col items-center gap-2 p-4 rounded-3xl bg-white border border-rose-100 hover:bg-rose-50 transition-all text-rose-600 group shadow-sm"
          >
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center group-hover:scale-110 transition-transform">1</div>
            <span className="font-bold text-sm uppercase">Hard</span>
          </button>
          <button 
            onClick={() => handleRating('good')}
            className="flex flex-col items-center gap-2 p-4 rounded-3xl bg-white border border-blue-100 hover:bg-blue-50 transition-all text-blue-600 group shadow-sm"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">2</div>
            <span className="font-bold text-sm uppercase">Good</span>
          </button>
          <button 
            onClick={() => handleRating('easy')}
            className="flex flex-col items-center gap-2 p-4 rounded-3xl bg-white border border-emerald-100 hover:bg-emerald-50 transition-all text-emerald-600 group shadow-sm"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">3</div>
            <span className="font-bold text-sm uppercase">Easy</span>
          </button>
        </div>
      </div>

      <style>{`
        .rotate-y-180 { transform: rotateY(180deg); }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  );
};

export default SRSReview;
