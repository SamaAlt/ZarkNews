import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Archive = () => {
    const [archivedArticles, setArchivedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Archived News</h1>
            {archivedArticles.length > 0 ? (
                <ul>
                    {archivedArticles.map((article) => (
                        <li key={article.id}>
                            <h2>{article.title}</h2>
                            <p>{article.content}</p>
                            <p><strong>Location:</strong> {article.location}</p>
                            <p><strong>Section:</strong> {article.section}</p>
                            <p><strong>Created At:</strong> {new Date(article.created_at).toLocaleDateString()}</p>
                            <p><strong>Tags:</strong> {article.tags.join(', ')}</p>
                            {article.image_filename && (
                                <img 
                                    src={`/media/uploads/${article.image_filename}`} 
                                    alt={article.title} 
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No archived articles found.</p>
            )}
        </div>
    );
};

export default Archive;