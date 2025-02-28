import React, { createContext, useState, useEffect } from 'react';
import { fetchArticles } from '../services/articleService';

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      const data = await fetchArticles();
      const presetArticles = data.filter(article => article.displayType);
      const recentArticles = data.filter(article => !article.displayType);

      setArticles(presetArticles);
      setRecentArticles(recentArticles);
    };

    loadArticles();
  }, []);

  return (
    <ArticleContext.Provider value={{ articles, recentArticles }}>
      {children}
    </ArticleContext.Provider>
  );
};