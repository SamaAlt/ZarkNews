
import React, { useEffect, useContext } from 'react';
import { FilterContext } from '../context/FilterContext';

const EntertainmentNewsPage = () => {
  const { articles, fetchFilteredArticles, setSection } = useContext(FilterContext);

    // Set the section to 'entertainment' only once when the component mounts
    useEffect(() => {
        console.log('Setting section to entertainment');
        setSection('entertainment');
    }, [setSection]); // Only run this effect once when the component mounts

    // Fetch articles for the 'entertainment' section only when the section changes
    useEffect(() => {
        console.log('Fetching entertainment articles');
        fetchFilteredArticles({ section: 'entertainment' });
    }, [fetchFilteredArticles]); // Only run this effect when `fetchFilteredArticles` changes

    // Log when articles are updated
    useEffect(() => {
        console.log('entertainment Articles updated:', articles);
    }, [articles]); // Only run this effect when `articles` changes

    return (
        <div>
            <h1>Entertainment News</h1>
            <ul>
                {articles.map(article => (
                    <li key={article.id}>{article.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default EntertainmentNewsPage;
