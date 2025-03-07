import { useContext, useEffect, useCallback } from 'react';
import { FilterContext } from '../../context/FilterContext';
import { Link } from 'react-router-dom';
import './Headline.css';

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
      <ul>
        {headlineArticles.length > 0 && (
          <li key={headlineArticles[0].id} className="headline-card">
            <Link to={`/articles/${headlineArticles[0].id}`} className="headline-link">
              {headlineArticles[0].image_url && (
                <img
                  src={headlineArticles[0].image_url}
                  alt={headlineArticles[0].title}
                />
              )}
              <div className="headline-content">
                <h2>{headlineArticles[0].title}</h2>
                <p>{headlineArticles[0].content.substring(0, 500)}...</p>
              </div>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Headline;
