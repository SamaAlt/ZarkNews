import React, { useEffect, useContext } from 'react';
import { FilterContext } from '../context/FilterContext';

const WorldNewsPage = () => {
  const { articles, fetchFilteredArticles, setSection } = useContext(FilterContext);

    // Set the section to 'world' only once when the component mounts
    useEffect(() => {
        console.log('Setting section to world');
        setSection('world');
    }, [setSection]); // Only run this effect once when the component mounts

    // Fetch articles for the 'world' section only when the section changes
    useEffect(() => {
        console.log('Fetching world articles');
        fetchFilteredArticles({ section: 'world' });
    }, [fetchFilteredArticles]); // Only run this effect when `fetchFilteredArticles` changes

    // Log when articles are updated
    useEffect(() => {
        console.log('world Articles updated:', articles);
    }, [articles]); // Only run this effect when `articles` changes

    return (
        <div>
            <h1>World News</h1>
            <ul>
                {articles.map(article => (
                    <li key={article.id}>{article.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default WorldNewsPage;
