import React, { useEffect, useContext } from 'react';
import { FilterContext } from '../context/FilterContext';

const SportsNewsPage = () => {
  const { articles, fetchFilteredArticles, setSection } = useContext(FilterContext);

    // Set the section to 'sports' only once when the component mounts
    useEffect(() => {
        console.log('Setting section to sports');
        setSection('sports');
    }, [setSection]); // Only run this effect once when the component mounts

    // Fetch articles for the 'sports' section only when the section changes
    useEffect(() => {
        console.log('Fetching sports articles');
        fetchFilteredArticles({ section: 'sports' });
    }, [fetchFilteredArticles]); // Only run this effect when `fetchFilteredArticles` changes

    // Log when articles are updated
    useEffect(() => {
        console.log('sports Articles updated:', articles);
    }, [articles]); // Only run this effect when `articles` changes

    return (
        <div>
            <h1>Sports News</h1>
            <ul>
                {articles.map(article => (
                    <li key={article.id}>{article.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default SportsNewsPage;
