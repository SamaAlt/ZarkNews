import React, { useContext, useEffect, useCallback } from 'react';
import { FilterContext } from '../../context/FilterContext';
import { Link } from 'react-router-dom';

const Headline = () => {
  const { articles, fetchFilteredArticles, setDisplayType } = useContext(FilterContext);

  const fetchHeadlineArticles = useCallback(() => {
     fetchFilteredArticles({ display_type: 'headline' });
  }, [fetchFilteredArticles]);

  useEffect(() => {
     setDisplayType('headline');
    fetchHeadlineArticles();
  }, [setDisplayType, fetchHeadlineArticles]);

  const headlineArticles = articles.filter(article => article.display_type === 'headline');

  return (
    <div>
      <h1>Headline</h1>
      <ul>
        {headlineArticles.length > 0 && (
          <li key={headlineArticles[0].id}>
            <h2>{headlineArticles[0].title}</h2>
            <p>{headlineArticles[0].content.substring(0, 150)}...</p>
            <Link to={`/articles/${headlineArticles[0].id}`}>Read More</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Headline;