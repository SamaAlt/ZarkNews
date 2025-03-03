import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Archive.css'; // Import the CSS file for styling

const Archive = () => {
    const [archivedArticles, setArchivedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleArticles, setVisibleArticles] = useState(5); // Number of articles to show initially

    useEffect(() => {
        const fetchArchivedArticles = async () => {
            try {
                const response = await axios.get('/api/articles/archive');
                setArchivedArticles(response.data.archived_articles);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchArchivedArticles();
    }, []);

    const loadMoreArticles = () => {
        setVisibleArticles((prev) => prev + 5); // Increase the number of visible articles by 5
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="archive-container">
            <h1>Archived News</h1>
            {archivedArticles.length > 0 ? (
                <>
                    <ul className="articles-list">
                        {archivedArticles.slice(0, visibleArticles).map((article) => (
                            <li key={article.id} className="article-item">
                                <h2>{article.title}</h2>
                                {article.image_filename && (
                                    <img 
                                        src={`/media/uploads/${article.image_filename}`} 
                                        alt={article.title} 
                                        className="article-image"
                                    />
                                )}
                                <p>{article.content}</p>
                                <p><strong>Location:</strong> {article.location}</p>
                                <p><strong>Section:</strong> {article.section}</p>
                                <p><strong>Created At:</strong> {new Date(article.created_at).toLocaleDateString()}</p>
                                <p><strong>Tags:</strong> {article.tags.join(', ')}</p>
                            </li>
                        ))}
                    </ul>
                    {visibleArticles < archivedArticles.length && (
                        <button className="load-more-button" onClick={loadMoreArticles}>
                            Load More
                        </button>
                    )}
                </>
            ) : (
                <p className="no-articles">No archived articles found.</p>
            )}
        </div>
    );
};

export default Archive;