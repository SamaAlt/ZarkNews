import React, { useEffect, useContext } from 'react';
import { FilterContext } from '../context/FilterContext';

const TechnologyNewsPage = () => {
  const { articles, fetchFilteredArticles, setSection } = useContext(FilterContext);

    // Set the section to 'technology' only once when the component mounts
    useEffect(() => {
        console.log('Setting section to technology');
        setSection('technology');
    }, [setSection]); // Only run this effect once when the component mounts

    // Fetch articles for the 'technology' section only when the section changes
    useEffect(() => {
        console.log('Fetching technology articles');
        fetchFilteredArticles({ section: 'technology' });
    }, [fetchFilteredArticles]); // Only run this effect when `fetchFilteredArticles` changes

    // Log when articles are updated
    useEffect(() => {
        console.log('technology Articles updated:', articles);
    }, [articles]); // Only run this effect when `articles` changes

    return (
        <div>
            <h1>Technology News</h1>
            <ul>
                {articles.map(article => (
                    <li key={article.id}>{article.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default TechnologyNewsPage;
