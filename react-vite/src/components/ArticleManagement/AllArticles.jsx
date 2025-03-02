import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useArticleContext } from '../../context/ArticleContext';

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
        <div>
            <h1>All Articles</h1>
            {loading && <p>Loading...</p>}
            {!loading && displayedArticles.length === 0 && <p>No articles found.</p>}
            <ul style={{ border: '1px solid red' }}>
                {displayedArticles.map((article) => {
                    return (
                        <li key={`${article.id}-${article.created_at}`} style={{ border: '1px solid blue', margin: '10px', padding: '10px' }}>
                            <h2>{article.title}</h2>
                            <p>{article.content.substring(0, 100)}...</p>
                            <Link to={`/articles/${article.id}`}>Read More</Link>
                        </li>
                    );
                })}
            </ul>
            {displayedArticles.length >= 5 && !loading && (
                <button onClick={handleLoadMore}>Load More</button>
            )}
        </div>
    );
};

export default AllArticles;