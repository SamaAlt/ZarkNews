import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MyArticles = () => {
    const [userArticles, setUserArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserArticles = async () => {
            try {
                const response = await fetch('/api/articles/my-articles', {
                    credentials: 'include', // Include cookies for authentication
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserArticles(data.articles);
                } else {
                    console.error('Failed to fetch articles:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserArticles();
    }, []);

    return (
        <div className="my-articles-container">
            <h1>My Articles</h1>
            {loading && <p className="loading">Loading...</p>}
            {!loading && userArticles.length === 0 && <p className="no-articles">No articles found.</p>}
            <ul className="articles-list">
                {userArticles.map((article) => {
                    return (
                        <li key={article.id} className="article-item">
                            <h2>{article.title}</h2>
                            <p>{article.content.substring(0, 100)}...</p>
                            <div className="article-actions">
                                <Link to={`/articles/${article.id}`} className="read-more-link">Read More</Link>
                                <Link to={`/articles/edit/${article.id}`} className="edit-link">Edit</Link>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MyArticles;