import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FilterContext } from '../../context/FilterContext';
import './Sections.css';

const EntertainmentNewsPage = () => {
  const { articles, fetchFilteredArticles, setSection } = useContext(FilterContext);

  useEffect(() => {
    setSection('entertainment');
  }, [setSection]);

  useEffect(() => {
    fetchFilteredArticles({ section: 'entertainment' });
  }, [fetchFilteredArticles]);

  const mostRecentArticle = articles.length > 0 
    ? articles.reduce((latest, article) => 
        new Date(article.date) > new Date(latest.date) ? article : latest
      )
    : null;

  const filteredArticles = mostRecentArticle 
    ? articles.filter(article => article.id !== mostRecentArticle.id) 
    : articles;
    return (
        <div className='section-container'>

            {mostRecentArticle && (
                <div className="hero">
                    <Link to={`/articles/${mostRecentArticle.id}`} className="hero-link">
                        {mostRecentArticle.image_url && (
                            <img
                                src={mostRecentArticle.image_url}
                                alt={mostRecentArticle.title}
                                className="hero-image"
                            />
                        )}
                        <div className="hero-content">
                            <h2>{mostRecentArticle.title}</h2>
                            <p>{mostRecentArticle.content.substring(0, 150)}...</p>
                        </div>
                    </Link>
                </div>
            )}

            <div className="list-container">
            <ul className='list-card'>
                {filteredArticles.map(article => (
                    <li key={article.id} className="article-card">
                        <Link to={`/articles/${article.id}`} className="article-link">
                            {article.image_url && (
                                <img
                                    src={article.image_url}
                                    alt={article.title}
                                    className="list-image"
                                />
                            )}
                            <div className="list-content">
                                <h3>{article.title}</h3>
                                <p>{article.content.substring(0, 150)}...</p>
                                </div>
                        </Link>
                    </li>                
                ))}
            </ul>
            </div>
        </div>
    );
};
export default EntertainmentNewsPage;