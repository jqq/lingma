
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ArticleList from './components/ArticleList';
import Reader from './components/Reader';
import WordBank from './components/WordBank';
import SRSReview from './components/SRSReview';
import { AppState, View, Article, Word } from './types';
import { MOCK_ARTICLES, MOCK_WORDS } from './constants';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    view: 'dashboard',
    selectedArticleId: null,
    articles: MOCK_ARTICLES as Article[],
    words: MOCK_WORDS as Word[],
    stats: {
      articlesRead: 14,
      wordsLearned: 243,
      studyStreak: 7,
      dailyGoal: 85,
      weeklyGoal: 92
    }
  });

  // Persist state to local storage (Simulating Supabase)
  useEffect(() => {
    const saved = localStorage.getItem('lingua_flow_state');
    if (saved) {
      try {
        setState(prev => ({ ...prev, ...JSON.parse(saved), view: 'dashboard' }));
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lingua_flow_state', JSON.stringify({
      articles: state.articles,
      words: state.words,
      stats: state.stats
    }));
  }, [state.articles, state.words, state.stats]);

  const setView = (view: View) => setState(prev => ({ ...prev, view }));

  const selectArticle = (id: string) => {
    setState(prev => ({
      ...prev,
      selectedArticleId: id,
      view: 'reader'
    }));
  };

  const addWord = (word: Word) => {
    setState(prev => {
      // Avoid duplicates
      if (prev.words.find(w => w.text.toLowerCase() === word.text.toLowerCase())) {
        return prev;
      }
      return {
        ...prev,
        words: [word, ...prev.words],
        stats: {
          ...prev.stats,
          wordsLearned: prev.stats.wordsLearned + 1
        }
      };
    });
  };

  const handleReviewComplete = (updatedWords: Word[]) => {
    setState(prev => {
      const newWords = [...prev.words];
      updatedWords.forEach(updated => {
        const idx = newWords.findIndex(w => w.id === updated.id);
        if (idx > -1) newWords[idx] = updated;
      });
      return { ...prev, words: newWords };
    });
  };

  const currentArticle = state.articles.find(a => a.id === state.selectedArticleId);
  const wordsToReview = state.words.filter(w => w.nextReviewAt <= Date.now());

  const renderView = () => {
    switch (state.view) {
      case 'dashboard':
        return <Dashboard stats={state.stats} onNavigate={setView} />;
      case 'articles':
        return <ArticleList articles={state.articles} onSelect={selectArticle} />;
      case 'reader':
        return currentArticle ? (
          <Reader 
            article={currentArticle} 
            onClose={() => setView('articles')} 
            onAddWord={addWord}
            words={state.words}
          />
        ) : null;
      case 'wordbank':
        return <WordBank words={state.words} />;
      case 'review':
        return (
          <SRSReview 
            words={wordsToReview} 
            onReviewComplete={handleReviewComplete}
            onFinish={() => setView('dashboard')}
          />
        );
      default:
        return <Dashboard stats={state.stats} onNavigate={setView} />;
    }
  };

  return (
    <Layout 
      activeView={state.view} 
      setView={setView} 
      reviewCount={wordsToReview.length}
    >
      {renderView()}
    </Layout>
  );
};

export default App;
