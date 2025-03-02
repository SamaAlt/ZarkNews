import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SubscriptionsAnalytics = () => {
    const [stats, setStats] = useState({ sections: {}, tags: {} });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch subscription stats from the backend
        axios.get('/api/subscriptions/stats')
            .then(response => {
                setStats(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the subscription stats!", error);
                setError("Failed to load subscription statistics. Please try again later.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading subscription statistics...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ marginBottom: '20px' }}>Subscriptions Analytics</h2>
            
            <div style={{ marginBottom: '30px' }}>
                <h3 style={{ marginBottom: '10px' }}>Sections</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {Object.entries(stats.sections).map(([section, count]) => (
                        <li key={section} style={{ marginBottom: '5px' }}>
                            <strong>{section}</strong>: {count} subscriber{count !== 1 ? 's' : ''}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 style={{ marginBottom: '10px' }}>Tags</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {Object.entries(stats.tags).map(([tag, count]) => (
                        <li key={tag} style={{ marginBottom: '5px' }}>
                            <strong>{tag}</strong>: {count} subscriber{count !== 1 ? 's' : ''}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SubscriptionsAnalytics;