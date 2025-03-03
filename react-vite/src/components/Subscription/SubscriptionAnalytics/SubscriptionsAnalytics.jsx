import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SubscriptionsAnalytics.css';


const SubscriptionsAnalytics = () => {
    const [stats, setStats] = useState({ sections: {}, tags: {} });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
        return <div className="loading">Loading subscription statistics...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="analytics-container">
            <h2>Reader Analytics</h2>
            
            <div className="section sections">
                <h3>Sections</h3>
                <ul>
                    {Object.entries(stats.sections).map(([section, count]) => (
                        <li key={section}>
                            <strong>{section}</strong>: {count} subscriber{count !== 1 ? 's' : ''}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="section tags">
                <h3>Tags</h3>
                <ul>
                    {Object.entries(stats.tags).map(([tag, count]) => (
                        <li key={tag}>
                            <strong>{tag}</strong>: {count} subscriber{count !== 1 ? 's' : ''}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SubscriptionsAnalytics;