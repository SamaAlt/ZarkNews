import React, { useEffect, useContext } from 'react';
import { FilterContext } from '../../context/FilterContext';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const SportsNewsPage = () => {
  const { articles, fetchFilteredArticles, setSection } = useContext(FilterContext);

     useEffect(() => {
        setSection('sports');
    }, [setSection]); // Only run this effect once when the component mounts

     useEffect(() => {
        fetchFilteredArticles({ section: 'sports' });
    }, [fetchFilteredArticles]); // Only run this effect when `fetchFilteredArticles` changes

     useEffect(() => {
    }, [articles]); // Only run this effect when `articles` changes

   const mostRecentArticle = articles.length > 0 
    ? articles.reduce((latest, article) => 
        new Date(article.date) > new Date(latest.date) ? article : latest
      )
    : null;

   const filteredArticles = mostRecentArticle 
    ? articles.filter(article => article.id !== mostRecentArticle.id) 
    : articles;

  return (
    <div>
      <h1>Sports News</h1>

      {mostRecentArticle && (
        <div className="hero">
          <h2>{mostRecentArticle.title}</h2>
          <p>{mostRecentArticle.summary}</p>
          <Link to={`/articles/${mostRecentArticle.id}`}>Read More</Link>
        </div>
      )}

      <ul>
        {filteredArticles.map(article => (
          <li key={article.id}>
            {article.title}
            <Link to={`/articles/${article.id}`}>Read More</Link>
          </li>                
        ))}
      </ul>
    </div>
  );
};

export default SportsNewsPage;
