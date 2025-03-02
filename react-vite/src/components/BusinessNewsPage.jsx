import React, { useEffect, useContext } from 'react';
import { FilterContext } from '../context/FilterContext';

const BusinessNewsPage = () => {
    const { articles, fetchFilteredArticles, setSection } = useContext(FilterContext);

    // Set the section to 'business' only once when the component mounts
    useEffect(() => {
        console.log('Setting section to business');
        setSection('business');
    }, [setSection]); // Only run this effect once when the component mounts

    // Fetch articles for the 'business' section only when the section changes
    useEffect(() => {
        console.log('Fetching business articles');
        fetchFilteredArticles({ section: 'business' });
    }, [fetchFilteredArticles]); // Only run this effect when `fetchFilteredArticles` changes

    // Log when articles are updated
    useEffect(() => {
        console.log('Business Articles updated:', articles);
    }, [articles]); // Only run this effect when `articles` changes

    return (
        <div>
            <h1>Business News</h1>
            <ul>
                {articles.map(article => (
                    <li key={article.id}>{article.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default BusinessNewsPage;