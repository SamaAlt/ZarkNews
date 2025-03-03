import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useArticleContext } from '../../context/ArticleContext';
import './AllArticles.css';

const AllArticles = () => {
    const { articles, loading, currentPage, setCurrentPage } = useArticleContext();
    const [displayedArticles, setDisplayedArticles] = useState([]);

    useEffect(() => {
        const uniqueArticles = articles.reduce((acc, article) => {
            if (!acc.some(a => a.id === article.id)) {
                acc.push(article);
            }
            return acc;
        }, []);
        setDisplayedArticles(uniqueArticles);
    }, [articles]);

    const handleLoadMore = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div className="all-articles-container">
            <h1>All Articles</h1>
            {loading && <p className="loading">Loading...</p>}
            {!loading && displayedArticles.length === 0 && <p className="no-articles">No articles found.</p>}
            <ul className="articles-list">
                {displayedArticles.map((article) => {
                    return (
                        <li key={`${article.id}-${article.created_at}`} className="article-item">
                            <h2>{article.title}</h2>
                            <p>{article.content.substring(0, 100)}...</p>
                            <Link to={`/articles/${article.id}`} className="read-more-link">Read More</Link>
                        </li>
                    );
                })}
            </ul>
            {displayedArticles.length >= 5 && !loading && (
                <button className="load-more-button" onClick={handleLoadMore}>Load More</button>
            )}
        </div>
    );
};

export default AllArticles;