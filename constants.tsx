
import React from 'react';

export const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
  ),
  Book: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
  ),
  Layers: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>
  ),
  CheckCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  ),
  Calendar: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
  ),
  TrendingUp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Clock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  ExternalLink: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
  )
};

export const MOCK_ARTICLES = [
  {
    id: '1',
    title: 'The Future of Web Development in 2025',
    content: "The landscape of web development is shifting faster than ever. From the rise of AI-integrated frameworks to the stabilization of edge computing, developers are facing a new paradigm. Understanding these changes is crucial for staying relevant in the tech industry. In this article, we explore the primary drivers of this transformation and what you can do to prepare for the upcoming technological shifts...",
    sourceName: 'TechCrunch',
    url: 'https://techcrunch.com/future-web-2025',
    savedAt: Date.now() - 86400000,
    readProgress: 45,
    screenshot: 'https://picsum.photos/seed/article1/800/400'
  },
  {
    id: '2',
    title: 'Why Deep Work is the Superpower of the 21st Century',
    content: "In an age of constant distraction, the ability to focus without interruption on a cognitively demanding task is increasingly rare. Cal Newport argues that 'Deep Work' is not just a productivity hack, but a fundamental skill that allows individuals to master complicated information and produce better results in less time...",
    sourceName: 'Medium',
    url: 'https://medium.com/productivity/deep-work',
    savedAt: Date.now() - 172800000,
    readProgress: 100,
    screenshot: 'https://picsum.photos/seed/article2/800/400'
  }
];

export const MOCK_WORDS = [
  {
    id: 'w1',
    text: 'Paradigm',
    definition: 'A typical example or pattern of something; a model.',
    translation: '范式',
    example: 'The shift in the social paradigm has changed our worldview.',
    status: 'LEARNING',
    nextReviewAt: Date.now(),
    easinessFactor: 2.5,
    interval: 0,
    repetition: 0,
    addedAt: Date.now() - 400000
  },
  {
    id: 'w2',
    text: 'Paradox',
    definition: 'A seemingly absurd or self-contradictory statement or proposition.',
    translation: '悖论',
    example: 'It is a curious paradox that professional comedians are often unhappy people.',
    status: 'REVIEWING',
    nextReviewAt: Date.now() + 86400000,
    easinessFactor: 2.4,
    interval: 1,
    repetition: 1,
    addedAt: Date.now() - 800000
  }
];
