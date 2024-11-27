'use client';

import { useState, useEffect } from 'react';

const engineeringQuotes = [
  {
    text: "Every expert was once a beginner. Your code today is better than yesterday's.",
    theme: "growth"
  },
  {
    text: "Debugging is like being a detective in a crime movie where you're also the murderer.",
    theme: "humor"
  },
  {
    text: "You've solved complex problems before. This one is just next in line.",
    theme: "confidence"
  },
  {
    text: "Code reviews make you stronger. Each feedback is a step toward mastery.",
    theme: "learning"
  },
  {
    text: "Your previous projects prove you can do this. Keep building.",
    theme: "evidence"
  },
  {
    text: "Remember: even senior developers Google basic syntax. It's about problem-solving, not memorization.",
    theme: "perspective"
  },
  {
    text: "You're not an impostor. You're a developer who's constantly learning and growing.",
    theme: "identity"
  },
  {
    text: "Each commit is progress. Each PR is achievement. You're building your legacy.",
    theme: "progress"
  },
  {
    text: "The difference between a junior and senior developer is just a collection of solved problems.",
    theme: "experience"
  },
  {
    text: "Your curiosity to learn new technologies is your superpower.",
    theme: "strength"
  }
];

export const MotivationBanner = () => {
    const [quote, setQuote] = useState(engineeringQuotes[0]);
    const [isVisible, setIsVisible] = useState(true);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setIsVisible(false);
        setTimeout(() => {
          setQuote(engineeringQuotes[Math.floor(Math.random() * engineeringQuotes.length)]);
          setIsVisible(true);
        }, 500);
      }, 30000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div 
        className={`
          transform transition-all duration-500 ease-in-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
        `}
      >
        <div className="text-center py-3 px-4 text-sm text-gray-400 border-t border-gray-800">
          <p>{quote.text}</p>
        </div>
      </div>
    );
  };